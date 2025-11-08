'use client';

import { useEffect, useState } from 'react';
import { createSupbaseBrowserClient } from '../utils/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * Custom hook to get the authenticated user.
 * Use this hook inside components wrapped with AuthComponent.
 * AuthComponent handles redirects, so this hook just fetches the user.
 * 
 * @returns {User | null} The authenticated user or null if not authenticated
 * 
 * @example
 * ```tsx
 * <AuthComponent>
 *   <YourComponent />
 * </AuthComponent>
 * 
 * // Inside YourComponent:
 * const user = useAuth();
 * ```
 */
export function useAuth(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createSupbaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return user;
}

