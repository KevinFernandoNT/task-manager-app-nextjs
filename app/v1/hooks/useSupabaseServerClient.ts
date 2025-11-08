import { createClient } from '../utils/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side utility function to get a Supabase client instance.
 * This function must be used in Server Components, Server Actions, or Route Handlers.
 * 
 * @returns {Promise<SupabaseClient>} A Supabase client instance configured for server-side usage
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function ServerComponent() {
 *   const supabase = await getServerClient();
 *   
 *   const { data, error } = await supabase
 *     .from('tasks')
 *     .select('*');
 *   
 *   return <div>...</div>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // In a Server Action
 * 'use server';
 * 
 * export async function myServerAction() {
 *   const supabase = await getServerClient();
 *   const { data } = await supabase.from('tasks').select('*');
 *   return data;
 * }
 * ```
 */
export async function useSupabaseServerClient(): Promise<SupabaseClient> {
  return await createClient();
}

