import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail
}
    from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line
export const auth = getAuth(app);

export const SignUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        console.log("User signed up and verification email sent:", user.email);
        return user;
    } catch (error) {
        console.error("Error signing up:", error.message);
        throw error;
    }
}

export const LoginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in:", user.email);
        return user;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}

export const Logout = async () => {
    try {
        await auth.signOut();
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out:", error.message);
        throw error;
    }
}

export const UpdateUserProfile = async (user, displayName, photoURL) => {
    try {
        await updateProfile(user, { displayName, photoURL });
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error.message);
        throw error;
    }
};

export const sendVerificationEmailToUser = async (user) => {
    try {
        if (!user) {
            throw new Error("No authenticated user to send verification email.");
        }
        await sendEmailVerification(user);
        console.log("Verification email sent to:", user.email);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        throw error;
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent to:", email);
    } catch (error) {
        console.error("Error sending password reset email:", error.message);
        throw error;
    }
};