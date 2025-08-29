import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getIdTokenResult,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const emailSignUp = async (email, password, username) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (username) {
    await updateProfile(cred.user, { displayName: username });
  }
  return cred;
};

export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const subscribeToAuth = (cb) => onAuthStateChanged(auth, cb);

// Get ID token string
export const getAuthToken = async (force = false) =>
  auth.currentUser ? await auth.currentUser.getIdToken(force) : null;

// Get custom claims (roles) from ID token result
export const getClaims = async () =>
  auth.currentUser ? (await getIdTokenResult(auth.currentUser)).claims : null;
