import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesList } from "../store/expensesSlice";
import { unlockPremium } from "../store/authSlice";

const Expenses = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);
    const isPremium = useSelector((state) => state.auth.isPremium);
    const db = getDatabase();

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editCategory, setEditCategory] = useState("transport");

    useEffect(() => {
        const expensesRef = ref(db, "expenses");
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val() || {};
            const expenseArray = Object.entries(data).map(([id, exp]) => ({
                id,
                ...exp,
            }));
            dispatch(setExpensesList(expenseArray));
        });
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await remove(ref(db, `expenses/${id}`));
            toast.success("Expense deleted!");
            if (editId === id) resetEdit();
        } catch (err) {
            toast.error("Error deleting!");
            console.log(err);
        }
    };

    const handleEdit = (exp) => {
        setEditId(exp.id);
        setEditTitle(exp.title);
        setEditAmount(exp.amount);
        setEditCategory(exp.category);
    };

    const resetEdit = () => {
        setEditId(null);
        setEditTitle("");
        setEditAmount("");
        setEditCategory("transport");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!editTitle.trim() || !editAmount) {
            toast.error("Please fill all fields!");
            return;
        }
        const updatedExpense = {
            title: editTitle,
            amount: Number(editAmount),
            category: editCategory,
            timestamp: new Date().toISOString(),
        };
        try {
            await update(ref(db, `expenses/${editId}`), updatedExpense);
            toast.success("Expense updated!");
            resetEdit();
        } catch (err) {
            toast.error("Failed to update!");
            console.log(err);
        }
    };

    const totalAmount = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    return (
        <div className="pt-40 min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-indigo-700">📋 Expense List</h2>
                    <p className="mt-4 text-xl font-medium text-gray-700">
                        Total Spent: ₹{totalAmount}
                    </p>
                    {!isPremium && totalAmount > 10000 && (
                        <button
                            onClick={() => dispatch(unlockPremium())}
                            className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-800 transition"
                        >
                            Unlock Premium
                        </button>
                    )}
                </div>

                {expenses.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No expenses added yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {expenses.map((exp) => (
                            <div key={exp.id} className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-xl">
                                {editId === exp.id ? (
                                    <form onSubmit={handleSave} className="space-y-3">
                                        <input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded"
                                            placeholder="Title"
                                        />
                                        <input
                                            type="number"
                                            value={editAmount}
                                            onChange={(e) => setEditAmount(e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded"
                                            placeholder="Amount"
                                        />
                                        <select
                                            value={editCategory}
                                            onChange={(e) => setEditCategory(e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        >
                                            <option value="transport">Transport</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="bills">Bills</option>
                                            <option value="food">Food</option>
                                            <option value="miscellaneous">Miscellaneous</option>
                                        </select>
                                        <div className="flex gap-2 justify-end">
                                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={resetEdit}
                                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-bold text-indigo-800">{exp.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            ₹{exp.amount} • {exp.category}
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(exp)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expenses;
