import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
    premiumActivated: false,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    activatePremium(state) {
      state.premiumActivated = true;
    },
  },
});

export const { toggleTheme, activatePremium } = themeSlice.actions;
export default themeSlice.reducer;

