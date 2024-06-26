// fashion-insights/fashionInsightsSlice.ts
import { FashionInsightDataType } from "@/enums/fashion-insights-enum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FashionInsightsData {
  [FashionInsightDataType.CELEBRITY_STYLE_DATA]: string;
  [FashionInsightDataType.EXISTING_WARDROBE]: string;
  [FashionInsightDataType.WAYS_TO_DRESS_LIKE]: string;
  [FashionInsightDataType.CAPSULE_PROFESSION]: string;
  [FashionInsightDataType.COMPARISON_REPORT]: string;
  [FashionInsightDataType.ACCESSORY_RECOMMENDATION]: string;
  [FashionInsightDataType.ITEM_RECOMMENDATION]: string;
  [FashionInsightDataType.OUTFIT_RECOMMENDATION_VACATION]: string;
  [FashionInsightDataType.OUTFIT_RECOMMENDATION_OCCASION]: string;
}

const fashionInsightsSlice = createSlice({
  name: "fashionInsights",
  initialState: {
    data: {
      [FashionInsightDataType.CELEBRITY_STYLE_DATA]: "",
      [FashionInsightDataType.EXISTING_WARDROBE]: "",
      [FashionInsightDataType.WAYS_TO_DRESS_LIKE]: "",
      [FashionInsightDataType.CAPSULE_PROFESSION]: "",
      [FashionInsightDataType.COMPARISON_REPORT]: "",
      [FashionInsightDataType.ACCESSORY_RECOMMENDATION]: "",
      [FashionInsightDataType.ITEM_RECOMMENDATION]: "",
      [FashionInsightDataType.OUTFIT_RECOMMENDATION_VACATION]: "",
      [FashionInsightDataType.OUTFIT_RECOMMENDATION_OCCASION]: "",
    } as FashionInsightsData,
    isLoading: false,
    error: null,
    currentDataType: null,
  },
  reducers: {
    SET_FASHION_INSIGHTS(state, action: PayloadAction<{ data: string }>) {
      const { data } = action.payload;

      if (state.currentDataType !== null) {
        state.data[state.currentDataType] = data;
        state.isLoading = false;
        state.error = null;
      } else {
        console.error(
          "No currentDataType set when trying to SET_FASHION_INSIGHTS"
        );
      }
    },

    SET_CURRENT_DATA_TYPE(
      state,
      action: PayloadAction<FashionInsightDataType>
    ) {
      state.currentDataType = action.payload;
    },

    SET_LOADING_STATUS(state) {
      state.isLoading = true;
      state.error = null;
    },

    SET_ERROR(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  SET_FASHION_INSIGHTS,
  SET_LOADING_STATUS,
  SET_ERROR,
  SET_CURRENT_DATA_TYPE,
} = fashionInsightsSlice.actions;
export default fashionInsightsSlice.reducer;
