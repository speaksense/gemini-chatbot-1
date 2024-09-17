// auth.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsFO00rWLIgvrVMZpNmIKVNyBouBIP57o",
  authDomain: "speaksense-fd479.firebaseapp.com",
  projectId: "speaksense-fd479",
  storageBucket: "speaksense-fd479.appspot.com",
  messagingSenderId: "793484104355",
  appId: "1:793484104355:web:f941129dad3085f0012516",
  measurementId: "G-8DTMY4M72D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set up the Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

// Function to sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

// Listener for auth state changes (useful for managing user session)
export const onAuthStateChange = (callback: (user: any) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Export the Firebase auth instance for direct access if needed
export { auth };