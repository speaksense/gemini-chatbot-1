import { auth } from '@/auth'
// import LoginForm from '@/components/login-form'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/components/login-button'; // Adjust the import path based on your project structure

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Sign in to Your Account</h1>
      <LoginButton text="Sign in with Google" className="my-custom-class" /> {/* Add custom classes if needed */}
    </div>
  );
}