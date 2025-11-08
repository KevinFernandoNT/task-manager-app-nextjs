'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import AuthBranding from '../components/AppBranding';
import GuestOnlyComponent from '../components/GuestOnlyComponent';
import { SignInFormData } from '@/app/v1/types/signin';
import { login } from './actions';

function SignInContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        const user = await login(formData);
        toast.success(`Signed in successfully!, Welcome ${user.user_metadata?.name || data.email} `);
        router.push('/v1/home');
      } catch (error: any) {
        let errorMessage = error?.message || 'An error occurred during sign in';

        //mutate to a better UX friendly error message 
        if(errorMessage.includes('Invalid login credentials')) {
          errorMessage = "Incorrect email or password, Please check your credentials and try again";
        }
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <AuthBranding />

      {/* Log in Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Log in</h1>
            <p className="text-md leading-relaxed text-gray-600">
              log into your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                id="email"
                className="w-full rounded-xl bg-gray-100 px-5 py-3.5 text-gray-900 placeholder-gray-500 transition focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full rounded-xl bg-gray-100 px-5 py-3.5 pr-12 text-gray-900 placeholder-gray-500 transition focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.966 9.966 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <p className="text-sm text-red-600">{errors.root.message}</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/v1/signup" className="font-semibold text-orange-500 hover:text-orange-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <GuestOnlyComponent>
      <SignInContent />
    </GuestOnlyComponent>
  );
}

