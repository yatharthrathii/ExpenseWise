import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userIdFromStorage = localStorage.getItem("userId");

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage,
  userId: userIdFromStorage,
  isLoggedIn: !!tokenFromStorage,
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
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    unlockPremium(state) {
      state.isPremium = true;
    },
  },
});

export const { login, logout, unlockPremium } = authSlice.actions;
export default authSlice.reducer;
