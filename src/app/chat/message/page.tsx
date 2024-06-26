// chat/message/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
  Slide,
  Typography,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Message, useChat } from "ai/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  updateInput,
  clearError,
  addMessage,
  setIsLoading,
  setError,
} from "@/lib/features/chat/chatSlice";

import ChatMessage from "@/client/components/chatMessage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AccessoryItem, ClothingItem } from "@/app/api/pinecone/types";

interface ChatMessageProps {
  isChatOpen: boolean;
  setShowChatPage: (value: boolean) => void;
}

const ChatMessagePage: React.FC<ChatMessageProps> = ({
  isChatOpen,
  setShowChatPage,
}) => {
  const dispatch = useDispatch();

  // Get state from chat slice
  const { input } = useSelector((state: RootState) => state.chat);
  const sessionId = useSelector(
    (state: RootState) => state.userProfile.sessionId
  );

  const { messages, append, isLoading, error, setInput } = useChat({
    api: "/api/openai",
    // initialMessages: reduxMessages,
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleGoBack = () => {
    setShowChatPage(false); // Call the function to update the state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInput(e.target.value));
  };


  function createWardrobeContextMessage(
    wardrobeEmbeddings: (ClothingItem | AccessoryItem)[]
  ) {
    let messageContent = "User's existing wardrobe items:\n";
    wardrobeEmbeddings.forEach((item) => {
      messageContent += `- ${item.additionalNotes}: ${item.subCategory}, ${item.color}, ${item.style}\n`; 
    });
  
    return {
      id: crypto.randomUUID(),
      role: "system", 
      content: messageContent, // Pass the formatted context as string
    };
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
  
    dispatch(setIsLoading(true));
  
    // 1. Prepare User's Message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
  
    // 2. (Optional) Fetch and Append Wardrobe Embeddings (only if input is not empty)
    let contextualMessage = null;
    if (messages.filter((m) => m.role === "user").length === 0) { // Only for the first user message
      const response = await fetch("api/pinecone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "fetchWardrobeEmbeddings",
          data: { query: input },
          sessionId: sessionId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch wardrobe embeddings");
      }
  
      const wardrobeEmbeddings = await response.json();
      contextualMessage = createWardrobeContextMessage(wardrobeEmbeddings);
    }
  
    try {
      // If there's a contextual message, append that first
      if (contextualMessage) {
        await append(contextualMessage);
      }
  
      // Now append the user's message and get the AI's response
      const aiMessage = await append(userMessage);
    } catch (error) {
      dispatch(
        setError((error as Error).message || "Failed to fetch message")
      );
      console.error("Error while fetching message:", error);
    }
  
    // 4. Update UI and State
    dispatch(updateInput(""));
    dispatch(setIsLoading(false));
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="pt-5 pb-3 pl-4 pr-16 bg-gray-100"
        sx={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center", // Align items vertically to center
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleGoBack} color="inherit">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" className="text-left text-white">
            <span>Chat 🧑‍🚀</span>
          </Typography>
        </Stack>
      </Box>
      <Box
        ref={messagesEndRef}
        sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}
      >
          {messages
          .filter((m) => m.role !== "system") // Filter out system messages
          .map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
      </Box>

      {/* Input Area (Styled like the reference image) */}
      <Box
        p={2}
        sx={{
          display: "flex",
          alignItems: "center",
          mt: "auto", // Push to bottom with flexbox
          bgcolor: "grey.100",
          p: 2,
          borderRadius: 1,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Type your message here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          sx={{
            borderRadius: "24px", // Rounded corners for the input field
            "& fieldset": {
              border: "none", // Remove the default border
            },
            "& .MuiInputBase-root": {
              paddingRight: "48px", // Add padding to accommodate the Send button
              fontSize: "1rem",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSend}
                  sx={{
                    bgcolor: "transparent", // No background color
                    color: "warning.light", // Lighter warning color in normal state
                    borderRadius: "50%",
                    p: 1,
                    transition: "color 0.2s ease", // Smooth color transition

                    // Hover effect
                    "&:hover": {
                      color: "warning.main", // Full warning color on hover
                    },

                    // Disabled state (optional)
                    "&:disabled": {
                      color: "grey.700",
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatMessagePage;
