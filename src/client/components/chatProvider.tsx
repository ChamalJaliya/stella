// chatProvider.tsx
"use client";
import { createContext, useContext, useState, FormEvent } from "react";
import { useChat, Message } from "ai/react"; // Adjust import if needed
import { ChatRequestOptions } from "ai";

interface ChatContextValue {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    options?: ChatRequestOptions
  ) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Add setMessages to context
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

// ChatProvider Component
export function ChatProvider({
  children,
  api,
}: {
  children: React.ReactNode;
  api: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat({
    api,
    onFinish: (message) => {
      // Update the messages array in the context
      setMessages((prevMessages) => [...prevMessages, message]);
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const handleSubmit: ChatContextValue["handleSubmit"] = async (e, options) => {
    try {
      setIsLoading(true);
      await originalHandleSubmit(e, options);
      console.log("handleSubmit in ChatProvider successfully called");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
