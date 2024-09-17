import React from 'react';
import { handleGoogleSignUp } from './actions';

export default function SignUpPage() {
  const handleSignUp = async () => {
    try {
      const user = await handleGoogleSignUp();
      console.log('Signed up user:', user);
      // Redirect to dashboard or handle post-signup logic
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Sign Up for SpeakSense</h1>
        <p className="text-gray-600 mb-8">Join now and unlock YouTube's potential with AI</p>
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          onClick={handleSignUp}
        >
          Sign up with Google
        </button>
      </div>
    </div>
  );
}