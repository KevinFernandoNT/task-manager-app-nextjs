import { createSupabaseServerClient } from './server'
import type { User } from '@supabase/supabase-js'
import { success, failure, type ActionResult } from '../result'

/**
 * Gets the current authenticated user from Supabase.
 * Returns a result object instead of throwing errors.
 * 
 * @returns {Promise<ActionResult<User>>} Result containing user or error
 * 
 * @example
 * ```ts
 * const result = await getAuthenticatedUser()
 * if (result.success) {
 *   const user = result.data
 *   // Use user.id, user.email, etc.
 * } else {
 *   // Handle error: result.error
 * }
 * ```
 */
export async function getAuthenticatedUser(): Promise<ActionResult<User>> {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Error getting authenticated user:', error)
      return failure(error.message || 'Failed to verify authentication. Please sign in again.')
    }

    if (!user) {
      return failure('User not authenticated. Please sign in to continue.')
    }

    return success(user)
  } catch (error: any) {
    console.error('Unexpected error in getAuthenticatedUser:', error)
    return failure(error?.message || 'An unexpected error occurred while verifying authentication.')
  }
}

