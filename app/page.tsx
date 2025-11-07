import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">EFFECTIVE</h1>
        <p className="mb-8 text-lg text-gray-600">Task Management Application</p>
        
        <div className="space-y-4">
          <Link
            href="/signin"
            className="block w-full rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="block w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Sign Up
          </Link>
          <Link
            href="/home"
            className="block w-full rounded-lg border border-orange-500 px-6 py-3 font-medium text-orange-500 transition hover:bg-orange-50"
          >
            View Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
