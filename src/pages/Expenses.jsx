import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Expenses = () => {
    const [expenses, setExpenses] = useState({});
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("transport");
    const [editId, setEditId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const db = getDatabase();

    useEffect(() => {
        const expensesRef = ref(db, "expenses");
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setExpenses(data);

            let total = 0;
            Object.values(data).forEach((expense) => {
                total += Number(expense.amount);
            });
            setTotalAmount(total);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !String(amount).trim()) {
            toast.error("Please fill all fields!");
            return;
        }

        const expense = {
            title,
            amount: Number(amount),
            category,
            timestamp: new Date().toISOString(),
        };

        try {
            if (editId) {
                await update(ref(db, `expenses/${editId}`), expense);
                toast.success("Expense updated!");
                setEditId(null);
            } else {
                await push(ref(db, "expenses"), expense);
                toast.success("Expense added!");
            }

            setTitle("");
            setAmount("");
            setCategory("transport");
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        }
    };

    const handleEdit = (id, data) => {
        setTitle(data.title || "");
        setAmount(data.amount || "");
        setCategory(data.category || "transport");
        setEditId(id);
    };

    const handleDelete = async (id) => {
        try {
            await remove(ref(db, `expenses/${id}`));
            toast.success("Expense deleted!");
        } catch (err) {
            toast.error("Error deleting!");
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <div className="bg-white mt-35 rounded-xl p-6 shadow-md border border-indigo-100 max-w-4xl mx-auto my-10">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📋 Expense List</h2>

                {Object.keys(expenses).length === 0 ? (
                    <p className="text-gray-500 text-center">No expenses yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {Object.entries(expenses).map(([id, expense]) => (
                            <li
                                key={id}
                                className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                            >
                                {editId === id ? (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col sm:flex-row sm:items-center gap-3 w-full"
                                    >
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Title"
                                            className="px-3 py-2 rounded border border-indigo-300 w-full sm:w-1/4"
                                        />
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Amount"
                                            className="px-3 py-2 rounded border border-indigo-300 w-full sm:w-1/4"
                                        />
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="px-3 py-2 rounded border border-indigo-300 w-full sm:w-1/4"
                                        >
                                            <option value="transport">Transport</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="bills">Bills</option>
                                            <option value="food">Food</option>
                                            <option value="miscellaneous">Miscellaneous</option>
                                        </select>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditId(null);
                                                    setTitle("");
                                                    setAmount("");
                                                    setCategory("transport");
                                                }}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold text-indigo-900">{expense.title}</p>
                                            <p className="text-sm text-gray-600">
                                                ₹{expense.amount} • {expense.category}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(id, expense)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 text-center">
                    <p className="text-xl font-medium text-indigo-800">Total: ₹{totalAmount}</p>

                    {totalAmount > 10000 && (
                        <button className="mt-4 bg-yellow-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-yellow-600 transition">
                            Activate Premium 🌟
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expenses;
