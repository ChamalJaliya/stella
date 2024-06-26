// Home.tsx
"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material"; // Add Stack for vertical layout
import VideoOnboard from "./onboard/page";
import { useDispatch } from "react-redux";
import { setSessionId } from "@/lib/features/user-profile/userProfileSlice";

export default function Home() {
  const dispatch = useDispatch();

  const [isChatOpen, setIsChatOpen] = useState(false);



  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId) {
      dispatch(setSessionId(storedSessionId));
    } else {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", newSessionId);
      dispatch(setSessionId(newSessionId));
    }
  }, [dispatch]);

  const toggleChatOpen = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <Box>
      <VideoOnboard />
      {/* <Pinecone /> */}
    </Box>
  );
}
