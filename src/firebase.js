// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
}
    from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth from here, pass 'app' to getAuth

export const SignUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user.email);
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error("Error signing up:", error.message);
        throw error; // Re-throw the error for component-level handling
    }
}

export const LoginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user.email);
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error; // Re-throw the error for component-level handling
    }
}

// You can also add a logout function here for consistency
export const Logout = async () => {
    try {
        await auth.signOut();
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out:", error.message);
        throw error;
    }
}

// If you need updateProfile to be callable from outside, you can expose it.
// However, it's often used directly where the user object is available (e.g., in CompleteProfile)
// export const UpdateUserProfile = async (user, displayName, photoURL) => {
//     try {
//         await updateProfile(user, { displayName, photoURL });
//         console.log("Profile updated successfully!");
//     } catch (error) {
//         console.error("Error updating profile:", error.message);
//         throw error;
//     }
// };