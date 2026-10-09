import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { login, signup, signInWithGoogle } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-md bg-[#111] p-8 rounded-[32px] shadow-2xl border border-gray-800 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <img src="/logo.jpg" alt="Collectly Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-tight">Welcome back</h1>
          <p className="text-sm font-medium text-gray-500 mt-2 text-center">Enter your details to access your dashboard and manage your receivables.</p>
        </div>

        {params?.error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-medium text-center">
            {params.error}
          </div>
        )}

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-400 mb-1.5 ml-1">Work Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="leonardo@agency.com" 
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-[13px] font-bold text-gray-400 mb-1.5 ml-1 flex justify-between">
              Password
              <Link href="/forgot-password" className="text-orange-500 hover:text-orange-400 font-semibold">Forgot?</Link>
            </label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-gray-700"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button formAction={login} className="w-full bg-white text-black font-bold rounded-2xl py-3.5 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Sign In
            </button>
            <button formAction={signup} className="w-full bg-transparent border border-gray-800 text-white font-bold rounded-2xl py-3.5 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <form>
            <button formAction={signInWithGoogle} className="w-full bg-[#0a0a0a] border border-gray-800 text-white font-bold rounded-2xl py-3.5 hover:bg-gray-900 hover:border-gray-700 transition-colors flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
