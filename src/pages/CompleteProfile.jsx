import { useState, useEffect } from "react";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import the auth object

const CompleteProfile = () => {
    const [fullName, setFullName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current logged-in user
    const [loading, setLoading] = useState(true); // State to manage loading status
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setCurrentUser(user);
                // Pre-fill form fields if display name or photo URL already exist
                setFullName(user.displayName || "");
                setPhotoURL(user.photoURL || "");
                setError(""); // Clear any previous error
            } else {
                // User is signed out
                setCurrentUser(null);
                setError("You must be logged in to complete your profile.");
                // Optionally redirect to login if no user is found
                // navigate('/login');
            }
            setLoading(false); // Authentication state has been determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // Run once on component mount

    const handleUpdate = async () => {
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success messages

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
                photoURL: photoURL, // photoURL can be an empty string if not provided
            });
            setSuccess("Profile updated successfully!");
            // The user object held by Firebase Auth is automatically updated.
            // onAuthStateChanged will likely fire again, updating the 'currentUser' state.
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError(`Failed to update profile: ${err.message}`);
            console.error("Profile update error:", err);
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
                <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
                    Complete Your Profile 📝
                </h1>

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
                        disabled={!currentUser} // Disable update button if no user is logged in
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