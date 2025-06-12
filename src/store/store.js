import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});
