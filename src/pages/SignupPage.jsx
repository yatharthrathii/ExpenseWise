import { useState } from "react";
import { SignUpWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [inputVal, setInputVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleFormSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!inputVal || !passwordVal || !confirmPassword) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        if (passwordVal !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        await SignUpWithEmail(inputVal, passwordVal);
        navigate("/complete-profile")

        setInputVal("");
        setPasswordVal("");
        setConfirmPassword("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
                <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
                    Create Your Account
                </h1>

                <form onSubmit={handleFormSignUp} className="space-y-4">
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Email address"
                        type="email"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Password"
                        type="password"
                        value={passwordVal}
                        onChange={(e) => setPasswordVal(e.target.value)}
                    />
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-xs text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-600 hover:underline">
                        Already have an account? <span className="text-violet-600 font-medium">Login</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
