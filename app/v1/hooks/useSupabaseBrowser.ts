import { useMemo } from 'react';
import { createClient } from '../utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Custom hook to get a Supabase client instance.
 * The client is memoized to prevent unnecessary re-creation on re-renders.
 * 
 * @returns {SupabaseClient} A Supabase client instance
 * 
 * @example
 * ```tsx
 * const supabase = useSupabase();
 * 
 * // Use in async functions
 * const { data, error } = await supabase
 *   .from('tasks')
 *   .select('*');
 * ```
 */
export function useSupabaseBrowserClient(): SupabaseClient {
  const supabase = useMemo(() => createClient(), []);

  return supabase;
}

