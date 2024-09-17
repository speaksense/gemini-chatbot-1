'use server'

import { signIn } from 'next-auth/react';
import { User } from '@/lib/types';
import { kv } from '@vercel/kv';
import { ResultCode } from '@/lib/utils';
import { getSession } from 'next-auth/react';

// Get user from Vercel KV based on email
export async function getUser(email: string) {
  const user = await kv.hgetall<User>(`user:${email}`);
  return user;
}

interface Result {
  type: string;
  resultCode: ResultCode;
}

// Authenticate user using Google OAuth
export async function authenticate(): Promise<Result | undefined> {
  try {
    // Sign in with Google OAuth
    const signInResult = await signIn('google', { redirect: false });

    if (signInResult?.error) {
      return {
        type: 'error',
        resultCode: ResultCode.UnknownError
      };
    }

    // Get session data after successful sign-in
    const session = await getSession();

    if (session) {
      const email = session?.user?.email;
      const accessToken = "AIzaSyC0LABQRUrfqg3khv-2IWUXYT5hX_Fygzo";
      
      // Here, you can fetch YouTube data using the accessToken and Google API
      const youtubeUserId = await fetchYouTubeUserId(accessToken);

      // Example: Store the YouTube user ID in your database or Vercel KV
      await kv.hset(`user:${email}`, { youtubeUserId });

      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn
      };
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.UnknownError
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      type: 'error',
      resultCode: ResultCode.UnknownError
    };
  }
}

// Function to fetch YouTube User ID using Google API and access token
async function fetchYouTubeUserId(accessToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id; // YouTube User ID
    } else {
      throw new Error('YouTube user ID not found');
    }
  } catch (error) {
    console.error('Error fetching YouTube User ID:', error);
    return null;
  }
}
