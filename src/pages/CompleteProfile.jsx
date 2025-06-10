import { useState, useEffect } from "react";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendVerificationEmailToUser } from "../firebase";

const CompleteProfile = () => {
    const [fullName, setFullName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [emailVerificationStatus, setEmailVerificationStatus] = useState({
        sent: false,
        error: null,
        message: null,
        resendDisabled: false,
        resendTimer: 30
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await user.reload();
                const reloadedUser = auth.currentUser;

                setCurrentUser(reloadedUser);
                setFullName(reloadedUser.displayName || "");
                setPhotoURL(reloadedUser.photoURL || "");
                setError("");
            } else {
                setCurrentUser(null);
                setError("You must be logged in to complete your profile.");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let timer;
        if (emailVerificationStatus.resendDisabled && emailVerificationStatus.resendTimer > 0) {
            timer = setTimeout(() => {
                setEmailVerificationStatus(prev => ({
                    ...prev,
                    resendTimer: prev.resendTimer - 1
                }));
            }, 1000);
        } else if (emailVerificationStatus.resendTimer === 0) {
            setEmailVerificationStatus(prev => ({
                ...prev,
                resendDisabled: false,
                resendTimer: 60
            }));
        }
        return () => clearTimeout(timer);
    }, [emailVerificationStatus.resendDisabled, emailVerificationStatus.resendTimer]);


    const handleUpdate = async () => {
        setError("");
        setSuccess("");
        setEmailVerificationStatus(prev => ({ ...prev, sent: false, error: null, message: null }));


        if (!currentUser) {
            setError("No active user found to update profile.");
            return;
        }

        if (!fullName.trim()) {
            setError("Full Name cannot be empty.");
            return;
        }

        try {
            await updateProfile(currentUser, {
                displayName: fullName,
                photoURL: photoURL,
            });
            setSuccess("Profile updated successfully!");
            await currentUser.reload();
            setCurrentUser(auth.currentUser);

            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError(`Failed to update profile: ${err.message}`);
            console.error("Profile update error:", err);
        }
    };

    const handleSendVerificationEmail = async () => {
        if (!currentUser) {
            setEmailVerificationStatus({
                sent: false,
                error: "No user logged in to send verification email.",
                message: null,
                resendDisabled: false
            });
            return;
        }

        setEmailVerificationStatus(prev => ({ ...prev, sent: false, error: null, message: null, resendDisabled: true }));
        setSuccess("");
        setError("");

        try {
            await sendVerificationEmailToUser(currentUser);
            setEmailVerificationStatus(prev => ({
                ...prev,
                sent: true,
                message: "Verification email sent! Please check your inbox and spam folder. If you don't receive it, you can resend after the timer.",
                resendDisabled: true,
                resendTimer: 30
            }));
        } catch (err) {
            let errorMessage = "Failed to send verification email. Please try again.";
            switch (err.code) {
                case 'auth/too-many-requests':
                    errorMessage = "Too many requests to send email. Please wait a moment before trying again.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Network error. Please check your internet connection.";
                    break;
                default:
                    errorMessage = err.message || errorMessage;
            }
            setEmailVerificationStatus(prev => ({
                ...prev,
                sent: false,
                error: errorMessage,
                resendDisabled: true,
                resendTimer: 30
            }));
            console.error("Error sending verification email:", err);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-700">Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-12 md:mt-4 flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
                <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
                    Complete Your Profile 📝
                </h1>

                {/* Email Verification Section */}
                {currentUser && !currentUser.emailVerified && (
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md text-center mb-4">
                        <p className="mb-2 font-semibold">Your email is not verified.</p>
                        <p className="mb-3 text-sm">Please verify your email to unlock all features.</p>
                        <button
                            onClick={handleSendVerificationEmail}
                            className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-all duration-300
                                        ${emailVerificationStatus.resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={emailVerificationStatus.resendDisabled}
                        >
                            {emailVerificationStatus.resendDisabled ?
                                `Resend Verification Email (${emailVerificationStatus.resendTimer}s)` :
                                "Send Verification Email"
                            }
                        </button>
                        {emailVerificationStatus.message && (
                            <p className="text-green-600 text-sm mt-2">{emailVerificationStatus.message}</p>
                        )}
                        {emailVerificationStatus.error && (
                            <p className="text-red-600 text-sm mt-2">{emailVerificationStatus.error}</p>
                        )}
                    </div>
                )}


                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-slate-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-slate-700 font-medium">Profile Photo URL</label>
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleUpdate}
                        className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!currentUser}
                    >
                        Update
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-slate-200 text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;