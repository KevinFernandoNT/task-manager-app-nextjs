'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import AuthBranding from '../components/AppBranding';
import { SignUpFormData } from '@/app/v1/types/signup';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Handle sign up logic here
  };

  return (
    <div className="flex min-h-screen">
      <AuthBranding />

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Sign up</h1>
            <p className="text-sm leading-relaxed text-gray-600">
              Welcome! Create your account and start managing your tasks efficiently. Let&apos;s get you set up!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                type="text"
                id="name"
                className="w-full rounded-xl bg-gray-100 px-5 py-3.5 text-gray-900 placeholder-gray-500 transition focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

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
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                id="password"
                className="w-full rounded-xl bg-gray-100 px-5 py-3.5 text-gray-900 placeholder-gray-500 transition focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                type="password"
                id="confirmPassword"
                className="w-full rounded-xl bg-gray-100 px-5 py-3.5 text-gray-900 placeholder-gray-500 transition focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Let's Get Started!
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="v1/signin" className="font-semibold text-orange-500 hover:text-orange-600">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

