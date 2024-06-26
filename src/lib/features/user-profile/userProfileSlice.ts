// user-profile/userProfileSlice.ts
import { AccessoryItem, ClothingItem } from "@/app/api/pinecone/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  existingWardrobe: (ClothingItem | AccessoryItem)[];
  profession: string;
  occasion: string;
  vacation: string;
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
}

const initialState: UserProfileState = {
  existingWardrobe: [],
  profession: "",
  occasion: "",
  vacation: "",
  isLoading: false,
  error: null,
  sessionId: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setExistingWardrobe: (
      state,
      action: PayloadAction<(ClothingItem | AccessoryItem)[]>
    ) => {
      state.existingWardrobe = action.payload;
    },
    setProfession: (state, action: PayloadAction<string>) => {
      state.profession = action.payload;
    },
    setOccasion: (state, action: PayloadAction<string>) => {
      state.occasion = action.payload;
    },
    setVacation: (state, action: PayloadAction<string>) => {
      state.vacation = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
  },
});

export const {
  setExistingWardrobe,
  setProfession,
  setOccasion,
  setVacation,
  setLoading,
  setError,
  setSessionId,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
