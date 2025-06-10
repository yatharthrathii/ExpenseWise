import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const [inputVal, setInputVal] = useState("");
    const [amountVal, setAmountVal] = useState("");
    const [category, setCategory] = useState("transport");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!inputVal.trim() || !amountVal.trim()) {
            toast.error("Please fill all fields!");
            return;
        }

        const expenseData = {
            title: inputVal,
            amount: Number(amountVal),
            category,
            timestamp: new Date()
        };

        try {
            await addDoc(collection(db, "expenses"), expenseData);
            toast.success("Expense added successfully 🎉");

            setInputVal("");
            setAmountVal("");
            setCategory("transport");
        } catch (error) {
            toast.error("Error adding expense. Try again.");
            console.error(error);
        }
    };

    return (
        <div className="pt-40 min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 flex items-center h-full">
                    <div className="p-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-tight">
                            Welcome to <span className="text-violet-600">expenseWish</span> 🎯
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl mt-4">
                            Track your daily expenses and take control of your finances. <br />
                            Stay consistent, stay smart.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 sticky top-32 h-fit">
                    <h2 className="text-xl font-bold text-indigo-700 text-center mb-4">➕ Add New Expense</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-indigo-800 mb-1">Title</label>
                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder="e.g. Uber ride"
                                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-indigo-800 mb-1">Amount</label>
                            <input
                                type="number"
                                value={amountVal}
                                onChange={(e) => setAmountVal(e.target.value)}
                                placeholder="e.g. 250"
                                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-indigo-800 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-indigo-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option value="transport">Transport</option>
                                <option value="shopping">Shopping</option>
                                <option value="bills">Bills</option>
                                <option value="food">Food</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Add Expense
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
