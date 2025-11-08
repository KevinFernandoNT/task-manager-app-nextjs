'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupbaseBrowserClient } from '../utils/supabase/client';
import type { User } from '@supabase/supabase-js';

interface GuestOnlyComponentProps {
  children: React.ReactNode;
}

/**
 * GuestOnlyComponent - Redirects authenticated users to home page.
 * Only shows content to unauthenticated users (guests).
 * 
 * @param children - The content to render when user is not authenticated
 * 
 * @example
 * ```tsx
 * <GuestOnlyComponent>
 *   <SignInPage />
 * </GuestOnlyComponent>
 * ```
 */
export default function GuestOnlyComponent({ children }: GuestOnlyComponentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createSupbaseBrowserClient();

    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // User is authenticated, redirect to home
          router.push('/v1/home');
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.push('/v1/home');
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
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

  // If authenticated, don't render children (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // User is not authenticated, show the auth pages
  return <>{children}</>;
}

