'use client';

import { LoginButton } from '@/components/login-button'; // Import the updated LoginButton
import * as React from 'react';

export function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>
      {/* Use the updated Google Login Button */}
      <LoginButton text="Login with Google" />
    </div>
  );
}
