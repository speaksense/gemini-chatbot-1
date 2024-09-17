import { useEffect, useState } from 'react';
import { signInWithGoogle, signOutUser, onAuthStateChange } from '../lib/auth'; // Import auth functions
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
}

export function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth changes (login/logout)
    const unsubscribe = onAuthStateChange((authUser) => {
      if (authUser) {
        setUser({
          id: authUser.uid,
          name: authUser.displayName || 'Anonymous',
          email: authUser.email || 'No email',
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>
        <h1>Welcome to SpeakSense</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <p>{user.name}</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={handleSignIn}>Sign In with Google</Button>
        )}
      </div>
    </header>
  );
}