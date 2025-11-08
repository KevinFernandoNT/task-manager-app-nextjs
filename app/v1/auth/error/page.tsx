'use client'

import Link from 'next/link'
import GuestOnlyComponent from '../../components/GuestOnlyComponent'

function ErrorPageContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            className="h-48 w-48 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Error Content */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/v1/signin"
            className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Go to Sign In
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <GuestOnlyComponent>
      <ErrorPageContent />
    </GuestOnlyComponent>
  )
}

