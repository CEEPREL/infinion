import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeObj, ThemeState } from "../../types/theme-type";

// initial state is the initial state of the theme
const initialState: ThemeObj = { mode: "light" };

// themeSlice is the slice of the store that contains the theme state by using the RTK createSlice function
const themeSlice = createSlice({
  name: "theme",
  initialState,

  // reducers are the functions that change the state of the theme
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
