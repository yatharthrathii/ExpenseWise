import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addExpense } from "../firebase/firebaseRest";
import { addExpense as addExpenseToStore } from "../store/expensesSlice";

const AddExpenseForm = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || !userId) {
            toast.error("Please login to add expenses");
            return;
        }

        if (!title.trim() || !amount.trim() || !category.trim()) {
            toast.error("Please fill all fields!");
            return;
        }

        const expenseData = {
            title,
            amount: Number(amount),
            category,
        };

        try {
            const res = await addExpense(expenseData, token, userId);

            if (!res.name) throw new Error("Invalid Firebase response");

            dispatch(
                addExpenseToStore({
                    ...expenseData,
                    id: res.name,
                    createdAt: new Date().toISOString()
                })
            );

            toast.success("Expense added ✅");
            setTitle("");
            setAmount("");
            setCategory("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add expense");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 max-w-md mx-auto mt-12">
            <h2 className="text-xl font-bold text-indigo-700 text-center mb-4">➕ Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-indigo-800 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Uber ride"
                        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-indigo-800 mb-1">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 250"
                        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-indigo-800 mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Transport, Food, Bills..."
                        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpenseForm;