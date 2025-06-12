import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  totalAmount: 0,
  isPremium: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpensesList(state, action) {
      state.expenses = action.payload;
      const total = action.payload.reduce((sum, exp) => sum + exp.amount, 0);
      state.totalAmount = total;
      state.isPremium = total > 10000;
    },
    setIsPremium(state, action) {
      state.isPremium = action.payload;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalAmount += action.payload.amount;
      state.isPremium = state.totalAmount > 10000;
    },
    deleteExpense(state, action) {
      const id = action.payload;
      const item = state.expenses.find((exp) => exp.id === id);
      if (item) {
        state.expenses = state.expenses.filter((exp) => exp.id !== id);
        state.totalAmount -= item.amount;
        state.isPremium = state.totalAmount > 10000;
      }
    },
  },
});

export const {
  setExpensesList,
  setIsPremium,
  addExpense,
  deleteExpense
} = expensesSlice.actions;

export default expensesSlice.reducer;
