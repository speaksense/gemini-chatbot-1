// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAsFO00rWLIgvrVMZpNmIKVNyBouBIP57o",
  authDomain: "speaksense-fd479.firebaseapp.com",
  projectId: "speaksense-fd479",
  storageBucket: "speaksense-fd479.appspot.com",
  messagingSenderId: "793484104355",
  appId: "1:793484104355:web:f941129dad3085f0012516",
  measurementId: "G-8DTMY4M72D"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export necessary Firebase utilities
export { auth, GoogleAuthProvider, signInWithPopup };
