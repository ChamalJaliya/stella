import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "ai";

interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  input: "",
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<any>) => {
        state.messages = [...state.messages, action.payload];  
      },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
    updateInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addMessage, setMessages, updateInput, setIsLoading, setError, clearError } = chatSlice.actions;
export default chatSlice.reducer;
