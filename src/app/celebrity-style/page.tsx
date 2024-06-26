// celebrity-style/page.tsx
"use client";
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setCelebrityName } from "@/lib/features/celebrity-style/celebrityStyleSlice";
import { SET_CURRENT_DATA_TYPE } from "@/lib/features/fashion-insights/fashionInsightsSlice";
// models
import { Message } from "ai";
import { FashionInsightDataType } from "@/enums/fashion-insights-enum";
// hooks
import { useChatManager } from "@/client/hooks/useChatManager";
// utils
import { combineStylePrompt } from "@/client/prompts/combineStylePrompt.";
import { celebrityStyleAnalysisPrompt } from "@/client/prompts/celebrityStyleAnalyzerPrompt";
import {
  cleanupResponse,
  parseJsonResponse,
} from "@/client/utils/cleanerHelpers";
// ui
import CustomButton from "@/client/components/CustomButton";
import CustomTextField from "@/client/components/CustomTextField";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import CustomTextArea from "@/client/components/CustomTextArea";

const CelebrityStyle: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { celebrityName } = useSelector(
    (state: RootState) => state.celebrityStyle
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChatManager("/api/openai");
  const [showInput, setShowInput] = useState(true);
  const [LLMPipeLoading, setLLMPipeLoading] = useState(false);

  const handleSubmitWithLoading = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(setCelebrityName(input));
    setShowInput(false);

    try {
      setLLMPipeLoading(true);
      const apiEndpoints = [
        { name: "Gemini", endpoint: "/api/gemini" },
        { name: "Anthropic", endpoint: "/api/anthropic" },
        { name: "OpenAI", endpoint: "/api/openai" },
      ];

      const responses = await Promise.all(
        apiEndpoints.map(async ({ name, endpoint }) => {
          const modifiedPrompt = celebrityStyleAnalysisPrompt(input);
          const newMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: modifiedPrompt,
          };

          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [...messages, newMessage],
            }),
          });

          if (!response.ok) {
            throw new Error(
              `Request to ${endpoint} failed with status ${response.status}`
            );
          }

          const reader = response.body?.getReader();
          if (!reader) throw new Error(`No response body from ${endpoint}`);

          const decoder = new TextDecoder();
          let output = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            output += decoder.decode(value, { stream: true });
          }

          output = cleanupResponse(endpoint, output);
          let content = parseJsonResponse(output) || output;

          if (content.trim()) {
            console.log(`${name} Response:\n${content.trim()}`);
          }

          return content.trim() || "";
        })
      );
      console.log("Parsed responses:", responses);

      const combinedPrompt = combineStylePrompt(input, responses);
      const newCombinedMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: combinedPrompt,
      };
      dispatch(
        SET_CURRENT_DATA_TYPE(FashionInsightDataType.CELEBRITY_STYLE_DATA)
      );
      handleSubmit(e, {
        options: {
          body: {
            messages: [...messages, newCombinedMessage],
          },
        },
      });
    } catch (error: any) {
      console.error("Error in handleSubmitWithLoading:", error);
    } finally {
      setLLMPipeLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box className="container mx-auto p-4" p={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          Celebrity Style Analyser
        </Typography>

        <Box mt={4} display="flex" alignItems="center">
          <form onSubmit={handleSubmitWithLoading}>
            <Grid container spacing={2}>
              {showInput ? (
                <Grid item xs={12}>
                  <CustomTextField
                    label={"celebrity name"}
                    placeholder="enter celebrity name"
                    value={input}
                    onChange={handleInputChange}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <CustomTextField
                    label={"celebrity name"}
                    value={celebrityName}
                    readOnly
                    onClick={() => setShowInput(true)}
                    fullWidth={true}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <CustomButton
                  type="submit"
                  color="customBlack"
                  disabled={isLoading || LLMPipeLoading}
                >
                  {isLoading || LLMPipeLoading ? "Generating..." : "Generate"}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Box>
        {isLoading || LLMPipeLoading ? (
          <Box mt={2} display="flex" alignItems="center">
            <CircularProgress color="warning" />
            <Typography variant="body1" ml={2}>
              Building...
            </Typography>
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" mt={2}>
            {error}
          </Typography>
        ) : (
          messages &&
          messages.length > 0 && (
            <Box mt={2}>
              {messages
                .filter((m) => m.role === "assistant")
                .map((m) => (
                  <CustomTextArea
                    showLabel={false}
                    key={m.id}
                    label="AI Response"
                    value={m.content}
                    sx={{ mb: 2, width: "calc(100% - 16px)" }}
                  />
                ))}
            </Box>
          )
        )}

        {/* <Box
            display="flex"
            alignItems="center"
            mt={4}
            component="form"
            sx={{
              "& .MuiTextField-root": { mb: 2, width: "100%" },
              "& .MuiButton-root": { mb: 2, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitWithLoading}
          >
            
            {showInput ? (
              <CustomTextField
                label={"Celebrity Name"}
                placeholder="Enter celebrity name"
                value={input}
                onChange={handleInputChange}
              />
            ) : (
              <div>
                <CustomTextField
                  label={"Celebrity Name"}
                  value={celebrityName}
                  readOnly
                  onClick={() => setShowInput(true)}
                />
              </div>
            )}

            <CustomButton
              type="submit"
              color="customBlack"
              disabled={isLoading || LLMPipeLoading}
            >
              {isLoading || LLMPipeLoading ? "Generating..." : "Generate"}
            </CustomButton>

            {isLoading || LLMPipeLoading ? (
              <Box mt={2} display="flex" alignItems="center">
                <CircularProgress color="warning" />
                <Typography variant="body1" ml={2}>
                  Building...
                </Typography>
              </Box>
            ) : error ? (
              <Typography variant="body1" color="error" mt={2}>
                {error}
              </Typography>
            ) : (
              messages &&
              messages.length > 0 && (
                <Box>
                  {messages
                    .filter((m) => m.role === "assistant")
                    .map((m) => (
                      <CustomTextArea
                        showLabel={false}
                        key={m.id}
                        label="AI Response"
                        value={m.content}
                        sx={{ mb: 2, width: "calc(100% - 16px)" }}
                      />
                    ))}
                </Box>
              )
            )}
          </Box> */}
      </Box>
    </Container>
  );
};

export default CelebrityStyle;
