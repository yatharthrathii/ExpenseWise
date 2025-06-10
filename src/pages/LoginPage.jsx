import { useState } from "react";
import { LoginWithEmail, auth } from "../firebase"; // Import auth for potential onAuthStateChanged if needed
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

const LoginPage = () => {
    const [email, setEmail] = useState("yatharthmaheshwari01@gmail.com");
    const [password, setPassword] = useState("123456789");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Optional: You might want to check if a user is already logged in
    // and redirect them if they try to access the login page again.
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigate('/main'); // Redirect to main if already logged in
    //         }
    //     });
    //     return () => unsubscribe();
    // }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        try {
            await LoginWithEmail(email, password);
            // After successful login, navigate to the main page
            navigate('/main');
        } catch (error) {
            // Firebase errors have a 'code' and 'message' property
            setErrorMessage(error.message || "Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }

        // It's generally better to clear these only after successful login
        // or if you want to force re-entry after a failed attempt.
        // setEmail("");
        // setPassword("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
                <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
                    Welcome Back 👋
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-xs text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm"
                    >
                        Login
                    </button>

                    {/* 👉 Forgot Password Button */}
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-sm text-violet-600 hover:underline hover:text-violet-700 transition"
                            onClick={() => alert("Redirect to forgot password page")}
                        >
                            Forgot your password?
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-center text-sm">
                    {/* Assuming you have a route for signup, e.g., /signup */}
                    <button
                        className="text-slate-600 hover:underline"
                        onClick={() => navigate('/signup')} // Add navigation to signup page
                    >
                        Don’t have an account?{" "}
                        <span className="text-violet-600 font-medium">Sign up</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;