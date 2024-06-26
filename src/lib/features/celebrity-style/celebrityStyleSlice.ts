// celebrity-style/celebrityStyleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CelebrityStyleState {
  celebrityName: string;
  isLoading: boolean;
  error: string | null;
  analysisResults: string;
}

const initialState: CelebrityStyleState = {
  celebrityName: "",
  isLoading: false,
  error: null,
  analysisResults: "",
};

export const celebrityStyleSlice = createSlice({
  name: "celebrityStyle",
  initialState,
  reducers: {
    setCelebrityName: (state, action: PayloadAction<string>) => {
      state.celebrityName = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAnalysisResults: (state, action: PayloadAction<string>) => {
        state.analysisResults = action.payload.replace(/0:"|\s+/g, " ");
    },
  },
});

export const { setCelebrityName, setLoading, setError, setAnalysisResults } =
  celebrityStyleSlice.actions;
export default celebrityStyleSlice.reducer;
