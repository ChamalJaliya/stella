// useChatManager.ts
import { useState } from "react";
import { useChat, Message } from "ai/react"; // Adjust import if needed
import { ChatRequestOptions } from "ai";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // Update with your actual path
import {
  SET_FASHION_INSIGHTS,
  SET_LOADING_STATUS,
  SET_ERROR,
} from "@/lib/features/fashion-insights/fashionInsightsSlice";

export function useChatManager(api: string) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);

  const isLoading = useSelector(
    (state: RootState) => state.fashionInsights.isLoading
  );
  const error = useSelector((state: RootState) => state.fashionInsights.error);

  const {
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    setInput,
  } = useChat({
    api,
    onFinish: (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      dispatch(
        SET_FASHION_INSIGHTS({
          data: message.content,
        })
      );
    },
    onError: (error) => {
      dispatch(SET_ERROR({ error: error.message }));
    },
  });
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    options?: ChatRequestOptions
  ) => {
    try {
      dispatch(SET_LOADING_STATUS()); // Start loading
      await originalHandleSubmit(e, options); // Call originalHandleSubmit with options
      console.log("handleSubmit successfully called");
    } catch (err: any) {
      dispatch(SET_ERROR({ error: err.message || "Something went wrong" })); // Dispatch error action
      console.error("Error in handleSubmit:", err);
    } finally {
      SET_LOADING_STATUS();
    }
  };

  return {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
    error,
  };
}
