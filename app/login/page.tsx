import React from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../../firebase'; // Adjust the path to your firebase.ts

const provider = new GoogleAuthProvider();

const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed in:', user);
        // Handle successful authentication, e.g., redirect to dashboard
        window.location.href = '/dashboard'; // Redirect to dashboard after sign-in
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">SpeakSense</h1>
        <p className="text-gray-600 mb-8">Unlock the Future of YouTube Success</p>
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
