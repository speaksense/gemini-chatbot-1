// signup/actions.ts
import { auth, GoogleAuthProvider, signInWithPopup } from '../../firebase';

const provider = new GoogleAuthProvider();

export const handleGoogleSignUp = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed up:', user);
        // Handle successful sign-up, such as storing user info or redirecting
        return user; // Return user object for any further processing
    } catch (error) {
        console.error('Error during Google sign-up:', error);
        throw error;
    }
};
