"use client";
import Image from "next/image";
import { Box, Badge, IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { motion } from "framer-motion"; // For animation (optional)

interface ChatIconProps {
  onClick: () => void;
  messageCount?: number;
}

export const ChatIcon: React.FC<ChatIconProps> = ({
  onClick,
  messageCount = 0,
}) => {
  return (
    <Badge badgeContent={messageCount} color="warning" overlap="circular">
      <motion.div
        whileHover={{ scale: 1.1 }} // Framer Motion hover animation
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <IconButton
          onClick={onClick}
          sx={{
            bgcolor: "warning.main", // Using MUI theme color
            borderRadius: "50%",
            p: 2, // Padding
            boxShadow: 3, // Shadow
          }}
          aria-label="Open Chat" // Add accessibility label
        >
          <Image
            src="/assets/icons/astronaut.svg"
            alt="Stella"
            width={24}
            height={24}
          />
        </IconButton>
      </motion.div>
    </Badge>
  );
};
