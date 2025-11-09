'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '../utils/supabase'
import { success, failure, type ActionResult } from '../utils/result'
import type { User } from '@supabase/supabase-js'

export async function login(formData: FormData): Promise<ActionResult<User>> {
  try {
    const supabase = await createSupabaseServerClient()

    // Extract and validate form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate inputs
    if (!email || !email.trim()) {
      return failure('Email is required.')
    }

    if (!password) {
      return failure('Password is required.')
    }

    const data = {
      email: email.trim(),
      password,
    }

    const { error, data: authData } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.error('Error signing in:', error)
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid')) {
        return failure('Incorrect email or password. Please check your credentials and try again.')
      }
      
      if (error.message.includes('Email not confirmed')) {
        return failure('Please verify your email address before signing in.')
      }
      
      return failure(error.message || 'Failed to sign in. Please try again.')
    }

    if (!authData?.user) {
      return failure('Sign in successful but user data could not be retrieved.')
    }

    revalidatePath('v1/home', 'layout')
    return success(authData.user)
  } catch (error: any) {
    console.error('Unexpected error in login:', error)
    return failure(error?.message || 'An unexpected error occurred while signing in.')
  }
}