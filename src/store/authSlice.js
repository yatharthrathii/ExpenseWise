import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  isLoggedIn: false,
  isPremium: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    },
    unlockPremium: (state) => {
      state.isPremium = true;
    }
  },
});

export const { login, logout, unlockPremium } = authSlice.actions;
export default authSlice.reducer;
