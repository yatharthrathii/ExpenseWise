const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const addExpense = async (expense, idToken, userId) => {
  const res = await fetch(`${DB_URL}/expenses/${userId}.json?auth=${idToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...expense, createdAt: new Date().toISOString() }),
  });

  return res.json(); 
};


export const getAllExpenses = async (idToken, userId) => {
  const res = await fetch(`${DB_URL}/expenses/${userId}.json?auth=${idToken}`);
  const data = await res.json();

  if (!data || data.error) return [];

  return Object.entries(data).map(([id, value]) => ({ id, ...value }));
};


export const updateExpense = async (expenseId, updatedData, idToken, userId) => {
  await fetch(`${DB_URL}/expenses/${userId}/${expenseId}.json?auth=${idToken}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};


export const deleteExpense = async (expenseId, idToken, userId) => {
  await fetch(`${DB_URL}/expenses/${userId}/${expenseId}.json?auth=${idToken}`, {
    method: "DELETE"
  });
};
