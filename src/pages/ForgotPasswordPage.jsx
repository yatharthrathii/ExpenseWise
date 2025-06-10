import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordReset } from "../firebase";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setLoading(true);
        try {
            await sendPasswordReset(email);
            setMessage("A password reset link has been sent to your email address. Please check your inbox and spam folder.");
            setEmail("");
        } catch (err) {
            let errorMessage = "Failed to send password reset email. Please try again.";
            switch (err.code) {
                case 'auth/invalid-email':
                    errorMessage = "The email address is not valid.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No user found with this email. Please check the email address.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many requests. Please try again after some time.";
                    break;
                default:
                    errorMessage = err.message || errorMessage;
            }
            setError(errorMessage);
            console.error("Password reset error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
                <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
                    Forgot Password?
                </h1>
                <p className="text-center text-slate-600 mb-6 text-sm">
                    Enter your email address below and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {loading && (
                        <div className="text-center text-violet-600 font-medium text-sm">
                            Sending link... Please wait.
                        </div>
                    )}
                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}
                    {message && (
                        <p className="text-green-600 text-sm text-center">{message}</p>
                    )}

                    <button
                        type="submit"
                        className={`w-full bg-violet-600 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm
                                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700'}`}
                        disabled={loading}
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-slate-600 hover:underline"
                    >
                        Remembered your password? <span className="text-violet-600 font-medium">Back to Login</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;