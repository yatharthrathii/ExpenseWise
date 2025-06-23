import { useState, useEffect } from "react";
import { LoginWithEmail } from "../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const res = await LoginWithEmail(email, password);
            if (res.idToken) {
                dispatch(login({ token: res.idToken, userId: res.localId }));
                navigate("/dashboard");
            } else {
                throw new Error(res.error.message);
            }
        } catch (error) {
            let displayMessage = "Login failed. Please check your credentials.";
            if (error.message.includes("INVALID_PASSWORD") || error.message.includes("EMAIL_NOT_FOUND")) {
                displayMessage = "Invalid email or password.";
            } else if (error.message.includes("INVALID_EMAIL")) {
                displayMessage = "Invalid email address format.";
            }
            setErrorMessage(displayMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setErrorMessage("");
        setLoading(true);
        const guestEmail = "yatharthmaheshwari01@gmail.com";
        const guestPassword = "123456789";
        try {
            const res = await LoginWithEmail(guestEmail, guestPassword);
            if (res.idToken) {
                dispatch(login({ token: res.idToken, userId: res.localId }));
                navigate("/dashboard");
            } else {
                throw new Error(res.error.message);
            }
        } catch (error) {
            setErrorMessage("Guest login failed. Try again later.");
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-100 px-4">
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
                        required
                    />
                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-xs text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className={`w-full bg-violet-600 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm
                                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <button
                        type="button"
                        className="w-full bg-slate-200 text-slate-700 font-medium py-2 rounded-xl transition-all duration-200 hover:bg-slate-300"
                        onClick={handleGuestLogin}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Continue as Guest'}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            className="text-sm text-violet-600 hover:underline hover:text-violet-700 transition"
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot your password?
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-center text-sm">
                    <button
                        className="text-slate-600 hover:underline"
                        onClick={() => navigate('/signup')}
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
