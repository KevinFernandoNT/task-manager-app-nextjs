'use server'

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../utils/supabase"
import { success, failure, type ActionResult } from "../utils/result"

export async function signup(formData: FormData): Promise<ActionResult<void>> {
  try {
    const supabase = await createSupabaseServerClient()

    // Extract and validate form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    // Validate inputs
    if (!email || !email.trim()) {
      return failure('Email is required.')
    }

    if (!password || password.length < 6) {
      return failure('Password must be at least 6 characters long.')
    }

    if (!name || name.trim().length < 2) {
      return failure('Name must be at least 2 characters long.')
    }

    const data = {
      email: email.trim(),
      password,
      options: {
        data: {
          name: name.trim(),
        }
      }
    }

    const { error, data: authData } = await supabase.auth.signUp(data)

    if (error) {
      console.error('Error signing up:', error)
      
      // Handle specific error cases
      if (error.message.includes('already registered')) {
        return failure('An account with this email already exists. Please sign in instead.')
      }
      
      if (error.message.includes('password')) {
        return failure('Password does not meet requirements. Please use a stronger password.')
      }
      
      return failure(error.message || 'Failed to create account. Please try again.')
    }

    revalidatePath('v1/home', 'layout')
    return success(undefined)
  } catch (error: any) {
    console.error('Unexpected error in signup:', error)
    return failure(error?.message || 'An unexpected error occurred while creating your account.')
  }
}