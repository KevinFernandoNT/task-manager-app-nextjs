'use client';

import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import AuthBranding from '../components/AppBranding';
import GuestOnlyComponent from '../components/GuestOnlyComponent';
import { PasswordInput } from '../components/auth';
import { SignInFormData } from '@/app/v1/types/signin';
import { login } from './actions';

function SignInContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

            <PasswordInput
              register={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Password"
              error={errors.password?.message}
            />

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

