'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupbaseBrowserClient } from '../utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface AuthComponentProps {
  children: React.ReactNode;
}

/**
 * AuthComponent - Protects routes by checking for authenticated Supabase user.
 * Redirects to signin page if user is not authenticated.
 * Listens to auth state changes for real-time protection.
 * 
 * @param children - The protected content to render when user is authenticated
 * 
 * @example
 * ```tsx
 * <AuthComponent>
 *   <YourProtectedPage />
 * </AuthComponent>
 * ```
 */
export default function AuthComponent({ children }: AuthComponentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createSupbaseBrowserClient();

    // Initial auth check
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (!user) {
          router.push('/v1/signin');
          return;
        }

        setUser(user);
      } catch (error:any) {
        toast.error(error?.message ?? "Something went wrong")
        router.push('/v1/signin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/v1/signin');
        setUser(null);
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect, so return nothing
  }

  return <>{children}</>;
}

