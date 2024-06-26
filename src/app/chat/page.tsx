"use client";
import { useState, useRef } from "react";
import {
  Box,
  Slide,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import ChatHelp from "./help/page";
import ChatHome from "./home/page";
import ChatHistory from "./chat-history/page";
import ChatMessagePage from "./message/page";

interface ChatProps {
  isChatOpen: boolean;
}

const Chat: React.FunctionComponent<ChatProps> = ({ isChatOpen = false }) => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [currentTab, setCurrentTab] = useState("home");

  const [showChatPage, setShowChatPage] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    setShowChatPage(false); // Hide ChatMessagePage if another tab is selected
  };
  return (
    <Box className="fixed bottom-4 right-4 z-50">
      {isChatOpen && (
        <Slide direction="up" in={isChatOpen} mountOnEnter unmountOnExit>
          <Box sx={{ width: "20vw", minWidth: 320 }}>
            <Paper
              elevation={4}
              className="w-96 rounded-lg shadow-lg"
              sx={{
                bgcolor: "background.paper",
                // backgroundImage: "linear-gradient(180deg, #047857, #064e3b)",
              }}
            >
              {/* Header */}
              <Box
                className="pt-5 pb-3 pl-4 pr-16 bg-gray-100 "
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              ></Box>

              <Box
                p={2}
                sx={{ height: "60vh", overflowY: "auto" }}
                ref={chatRef}
              >
                {showChatPage ? ( // Conditionally render ChatMessagePage
                  <ChatMessagePage isChatOpen={isChatOpen} setShowChatPage={setShowChatPage} />
                ) : (
                  <>
                    {currentTab === "help" && (
                      <ChatHelp isChatOpen={isChatOpen} />
                    )}
                    {currentTab === "home" && (
                      <ChatHome isChatOpen={isChatOpen} />
                    )}
                    {currentTab === "message" && (
                      <ChatHistory
                        isChatOpen={isChatOpen}
                        onSendMessage={() => setShowChatPage(true)}
                      /> // Pass onSendMessage prop
                    )}
                  </>
                )}
              </Box>

              {/* Footer */}
              {showChatPage ? null : (
                <BottomNavigation
                  showLabels={false}
                  value={currentTab}
                  onChange={handleTabChange}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "black", // Match Vercel green
                    "& .MuiBottomNavigationAction-root": {
                      color: "#f0fff4", // Consistent icon color
                      "&.Mui-selected": {
                        color: "white", // Active icon color (white)
                      },
                      minWidth: 80, // Set a minimum width for each icon button
                      "& .MuiBottomNavigationAction-icon": {
                        // Target the icon container
                        minWidth: "auto",
                        "& > .MuiSvgIcon-root": {
                          fontSize: 32, // Increase icon size
                        },
                      },
                    },
                    height: 60, // Increased height
                  }}
                >
                  <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                  />
                  <BottomNavigationAction
                    label="Chat"
                    value="message"
                    icon={<MessageIcon />}
                  />
                  <BottomNavigationAction
                    label="Help"
                    value="help"
                    icon={<HelpOutlineIcon />}
                  />
                </BottomNavigation>
              )}
            </Paper>
          </Box>
        </Slide>
      )}
    </Box>
  );
};

export default Chat;
