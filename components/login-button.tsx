'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component in your UI library
import { IconSpinner } from '@/components/ui/icons'; // Assuming you have a Spinner icon component

interface LoginButtonProps {
  text?: string;        // Customizable button text
  className?: string;   // Customizable className for styling
}

export function LoginButton({ text = 'Login with Google', className }: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: '/' }); // Redirect to home page after login
    setIsLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" /> // Loading spinner when login is in progress
      ) : (
        <svg // Google Icon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
          className="mr-2"
        >
          <path
            fill="#4285F4"
            d="M47.5 24.5c0-1.4-.1-2.7-.3-4H24v8.1h13.4c-.6 3-2.4 5.4-4.9 7v5.7h7.9c4.6-4.3 7.1-10.6 7.1-16.8z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.5 0 12-2.1 16-5.8l-7.9-5.7c-2.2 1.5-5.1 2.5-8.2 2.5-6.3 0-11.7-4.3-13.6-10.1H2.1v6.3C6.1 43.4 14.5 48 24 48z"
          />
          <path
            fill="#FBBC05"
            d="M10.4 29.9c-1.5-1.5-2.7-3.4-3.3-5.5H2.1v6.4c2.9 5.7 8.7 9.7 15.6 9.7 3.1 0 6-1 8.2-2.6l-7.9-5.6z"
          />
          <path
            fill="#EA4335"
            d="M24 9.5c3.4 0 6.4 1.2 8.7 3.6l6.4-6.4C34.5 2.5 29.8 0 24 0 14.5 0 6.1 4.6 2.1 11l7.9 5.7c1.9-5.7 7.3-10.1 13.6-10.1z"
          />
        </svg>
      )}
      {text} {/* Display customizable button text */}
    </Button>
  );
}
