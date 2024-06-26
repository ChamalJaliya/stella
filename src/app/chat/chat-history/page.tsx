"use client";
import CustomButton from "@/client/components/CustomButton";
import { Box, Typography, Paper, Stack, Divider, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChatHistoryProps {
  isChatOpen: boolean;
  onSendMessage: () => void;
}

const ChatHistory: React.FunctionComponent<ChatHistoryProps> = ({
  isChatOpen,
  onSendMessage,
}) => {
  const router = useRouter(); // Get the router object

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Top Box - Chat History Title */}
      <Box
        className="pt-5 pb-3 pl-4 pr-16 bg-gray-100"
        sx={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Typography variant="h6" className="text-left text-white">
          <span>Chat History 📜</span>
        </Typography>
      </Box>
      <Box p={2} overflow="auto">
        {/* Assistant Message */}
        <Stack direction="row" justifyContent="flex-start" spacing={1} mb={1}>
          <Avatar // Use Avatar for the circular image container
            sx={{
              bgcolor: "warning.main", // Set background color to warning
              width: 48, // Adjust the size as needed
              height: 48,
            }}
          >
            <Image
              src="/assets/icons/astronaut.svg"
              alt="Stella"
              width={24}
              height={24}
            />
          </Avatar>
          <Paper
            elevation={3}
            sx={{
              p: 1.5,
              borderRadius: "20px",
              bgcolor: "grey.100",
              maxWidth: "70%",
              overflowWrap: "break-word",
              ml: 2,
            }}
          >
            <Typography variant="body1">
              I am looking for a stylish outfit for a summer party. Can you
              suggest something?
            </Typography>
          </Paper>
        </Stack>
        <Divider sx={{ my: 1 }} />
      </Box>

      {/* Bottom Box - Send Message Button */}
      <Box p={2}>
        <CustomButton
          color="customBlack"
          onClick={onSendMessage}
          icon={<SendIcon sx={{ fontSize: 16 }} />} // Reduce icon size
        >
          Send Message
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ChatHistory;
