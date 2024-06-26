// components/chatMessage
"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Message } from "ai";
import Image from "next/image";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (!message) return null; // Ensure message exists

  const isUser = message.role === "user";
  const avatar = isUser ? "/assets/icons/stella_default_user.svg" : "/assets/icons/astronaut.svg"; // Assuming "S" for system/bot

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end", // Align to bottom
        gap: 1, // Add gap for spacing
        mb: 1, 
        maxWidth: "100%",
        alignSelf: isUser ? "flex-end" : "flex-start", // Alignment based on user/bot
        flexDirection: isUser ? "row-reverse" : "row",
        overflow: "hidden" // Ensure text doesn't overlap avatar
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 32, 
          height: 32, 
          borderRadius: "50%",
          bgcolor: isUser ? "warning.main" : "grey.500", 
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          mr: isUser ? 0 : 2, 
          ml: isUser ? 2 : 0,
          flexShrink: 0 // Prevent avatar from shrinking
        }}
      >
        <Image
            src={avatar}
            alt="Stella"
            width={12}
            height={12}
          />

      </Box>

      {/* Message Bubble */}
      <Box
        sx={{
          backgroundColor: isUser ? "warning.main" : "grey.100",
          p: 1.5, 
          borderRadius: "20px", 
          maxWidth: "100%",
          wordBreak: "break-word",
          color: isUser ? "common.white" : "text.primary",
          fontSize: "0.9rem",
          ml: 1, 
          position: "relative", 
          
          "&:before": {  // Message tail
            content: '""',
            position: "absolute",
            [isUser ? "right" : "left"]: "-8px", 
            bottom: "2px", 
            borderWidth: "8px 8px 0 0", 
            borderStyle: "solid",
            borderColor: "transparent",
            borderTopColor: isUser ? "warning.light" : "grey.100",
          },
        }}
      >
        <Typography variant="body2" className="whitespace-pre-wrap">
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
