import { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import the auth object from your firebase config file
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

const Main = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        // This listener will be called whenever the user's sign-in state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Authentication state has been determined
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        // You can render a loading indicator while Firebase checks auth state
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-700">Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Main Page!</h1>

                {currentUser ? (
                    <>
                        <p className="text-lg text-gray-600 mb-4">
                            Hello, {currentUser.displayName || currentUser.email}!
                        </p>
                        {/* Check if displayName or photoURL is missing for the current user */}
                        {(!currentUser.displayName || !currentUser.photoURL) && (
                            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md text-center mt-4">
                                Your profile is incomplete. Please add your full name and profile photo.
                                <button
                                    onClick={() => navigate("/complete-profile")}
                                    className="ml-2 text-blue-600 font-semibold underline hover:text-blue-800"
                                >
                                    Complete now
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => {
                                // You might want to import a Logout function from firebase.js
                                // For now, let's just show an alert
                                auth.signOut().then(() => {
                                    navigate('/login'); // Redirect to login after logout
                                }).catch((error) => {
                                    console.error("Logout error:", error);
                                    alert("Failed to logout.");
                                });
                            }}
                            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md text-center mt-4">
                        <p>You are not logged in.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-2 text-blue-600 font-semibold underline hover:text-blue-800"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;