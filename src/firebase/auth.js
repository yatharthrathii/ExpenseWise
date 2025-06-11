import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";

export const SignUpWithEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
};

export const LoginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const Logout = () => signOut(auth);

export const UpdateUserProfile = (user, displayName, photoURL) =>
    updateProfile(user, { displayName, photoURL });

export const sendVerificationEmailToUser = (user) =>
    sendEmailVerification(user);

export const sendPasswordReset = (email) =>
    sendPasswordResetEmail(auth, email);
