"use client";
import { Box, Typography, Paper, Slide, IconButton } from "@mui/material";

interface ChatHomeProps {
  isChatOpen: boolean;
}

const ChatHome: React.FunctionComponent<ChatHomeProps> = ({ isChatOpen }) => {
  return (
    <Box>

        {/* Header (Modified with Padding) */}
        <Box
          className="pt-5 pb-3 pl-4 pr-16 bg-gray-100 "
          sx={{
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" className="text-left text-white"> {/* White text */}
            <span>Hi There 👋</span> <br />
            {/* <span className="font-bold">I&apos;m Stella Your Smart Fashion Assist !</span> */}
          </Typography>

        </Box>
 
    </Box>
  );
};

export default ChatHome;
