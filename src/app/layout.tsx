"use client";
import { useState } from "react";
import { Box } from "@mui/material"; // Add Stack for vertical layout
import Chat from "./chat/page";
import { ChatIcon } from "@/client/components/chatIcon";
import Navbar from "@/client/components/Navbar";
import StoreProvider from "./StoreProvider";
import { ChatProvider } from "@/client/components/chatProvider";

import "./base.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatOpen = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          {" "}
          {/* Use your custom StoreProvider */}
          <Navbar />
          <ChatProvider api="/api/gemini">{children}</ChatProvider>
          {/* Chat Component - Now with position: fixed */}
          <Box
            sx={{
              position: "fixed",
              bottom: isChatOpen ? 90 : -500,
              right: 16,
              zIndex: 10,
              transition: "bottom 0.3s ease-in-out",
            }}
          >
            {isChatOpen && <Chat isChatOpen={isChatOpen} />}
          </Box>
          {/* Position Chat Icon - Remains fixed */}
          <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 100 }}>
            <ChatIcon onClick={() => toggleChatOpen()} />
          </Box>
        </StoreProvider>
      </body>
    </html>
  );
}
