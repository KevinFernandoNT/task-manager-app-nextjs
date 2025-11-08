import { createSupabaseServerClient } from './server'
import type { User } from '@supabase/supabase-js'

/**
 * Gets the current authenticated user from Supabase.
 * Throws an error if the user is not authenticated.
 * 
 * @returns {Promise<User>} The authenticated user
 * @throws {Error} If user is not authenticated
 * 
 * @example
 * ```ts
 * const user = await getAuthenticatedUser()
 * // Use user.id, user.email, etc.
 * ```
 */
export async function getAuthenticatedUser(): Promise<User> {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('User not authenticated')
  }

  return user
}

