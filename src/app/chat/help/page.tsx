"use client";

import { Box, Slide, Typography } from "@mui/material";

interface ChatHelpProps {
  isChatOpen: boolean;
}

const ChatHelp: React.FC<ChatHelpProps> = ({isChatOpen}) => {
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
            <span>Help 💁</span> <br />
            <span className="font-bold">Frequently Asked Questions</span>
          </Typography>

        </Box>
 
    </Box>
  );
};

export default ChatHelp;
