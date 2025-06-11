// dbFunctions.js
import { db } from "./firebase";
import { ref, push, set, get, update, remove } from "firebase/database";

// Add expense (POST)
export const addExpense = async (expense) => {
    const expensesRef = ref(db, "expenses");
    const newExpenseRef = push(expensesRef);
    await set(newExpenseRef, {
        ...expense,
        createdAt: new Date().toISOString(),
    });
};

// Get all expenses (GET)
export const getAllExpenses = async () => {
    const snapshot = await get(ref(db, "expenses"));
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.entries(data).map(([id, value]) => ({ id, ...value }));
    }
    return [];
};

// Update expense (PUT)
export const updateExpense = async (id, updatedData) => {
    const expenseRef = ref(db, `expenses/${id}`);
    await update(expenseRef, updatedData);
};

// Delete expense (DELETE)
export const deleteExpense = async (id) => {
    const expenseRef = ref(db, `expenses/${id}`);
    await remove(expenseRef);
};
