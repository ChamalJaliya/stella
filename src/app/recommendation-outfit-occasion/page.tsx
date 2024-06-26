// recommendation-outfit-occasion
"use client";
import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_DATA_TYPE } from "@/lib/features/fashion-insights/fashionInsightsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { setOccasion } from "@/lib/features/user-profile/userProfileSlice";
// hooks
import { useChatManager } from "@/client/hooks/useChatManager";
// model
import { FashionInsightDataType } from "@/enums/fashion-insights-enum";
// utils
import { recommendOutfitOccasionPrompt } from "@/client/prompts/recommendOutfitOccasionPrompt";
// ui
import CustomButton from "@/client/components/CustomButton";
import CustomTextArea from "@/client/components/CustomTextArea";
import CustomTextField from "@/client/components/CustomTextField";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface RecommendationOutfitOccasionProps {}

const RecommendationOutfitOccasion: React.FunctionComponent<
  RecommendationOutfitOccasionProps
> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { celebrityName } = useSelector(
    (state: RootState) => state.celebrityStyle
  );
  const { existingWardrobe, occasion } = useSelector(
    (state: RootState) => state.userProfile
  );

  const celebrityStyleData = useSelector(
    (state: RootState) =>
      state.fashionInsights.data[FashionInsightDataType.CELEBRITY_STYLE_DATA]
  );

  const { messages, setInput, handleSubmit, error, isLoading } =
    useChatManager("/api/openai");

  useEffect(() => {
    const modifiedInput = recommendOutfitOccasionPrompt(
      celebrityName,
      celebrityStyleData,
      existingWardrobe,
      occasion
    );
    setInput(modifiedInput);
  }, [celebrityStyleData, celebrityName, existingWardrobe, setInput, occasion]);

  const handleSubmitOccasion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      SET_CURRENT_DATA_TYPE(
        FashionInsightDataType.OUTFIT_RECOMMENDATION_OCCASION
      )
    );
    handleSubmit(e);
  };

  const handleOccasionInputBlur = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    dispatch(setOccasion(event.target.value));
  };

  return (
    <Container maxWidth="md">
      <Box className="container mx-auto p-4" p={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          Recommendation Outfit Occasion
        </Typography>

        <Box mt={4} display="flex" alignItems="center">
          <form onSubmit={handleSubmitOccasion}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  label={"occasion"}
                  placeholder="enter occasion name"
                  onBlur={handleOccasionInputBlur}
                  defaultValue={occasion}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label={"celebrity name"}
                  value={celebrityName}
                  readOnly={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextArea
                  label={"celebrity style data"}
                  placeholder="enter celebrity style data"
                  value={celebrityStyleData}
                  sx={{ mb: 2, width: "calc(100% - 16px)" }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextArea
                  label={"existing wardrobe"}
                  value={existingWardrobe}
                  placeholder="enter existing wardrobe"
                  sx={{ mb: 2, width: "calc(100% - 16px)" }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomButton
                  type="submit"
                  color="customBlack"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate"}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Box>
        {isLoading ? (
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
      </Box>
    </Container>
  );
};

export default RecommendationOutfitOccasion;
