import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice";
import themeReducer from "./features/theme/theme-slice";
import modalReducer from "./features/modal/modal-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
