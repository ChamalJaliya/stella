// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import celebrityStyleSlice from "./features/celebrity-style/celebrityStyleSlice";
import userProfileSlice from "./features/user-profile/userProfileSlice";
import fashionInsightsSlice from "./features/fashion-insights/fashionInsightsSlice";
import chatSlice from "./features/chat/chatSlice";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  celebrityStyle: celebrityStyleSlice,
  userProfile: userProfileSlice,
  fashionInsights: fashionInsightsSlice,
  chat:chatSlice
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_ALL") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['store']['getState']>;
export type AppDispatch = AppStore['store']['dispatch'];
