'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '../utils/supabase'
import { success, failure, type ActionResult } from '../utils/result'
import type { User } from '@supabase/supabase-js'

export async function login(formData: FormData): Promise<ActionResult<User>> {
  try {
    // Extract and validate form data first
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate inputs
    if (!email || !email.trim()) {
      return failure('Email is required.')
    }

    if (!password) {
      return failure('Password is required.')
    }

    // Create Supabase client with error handling
    let supabase
    try {
      supabase = await createSupabaseServerClient()
    } catch (clientError: any) {
      console.error('Error creating Supabase client:', clientError)
      return failure('Failed to initialize authentication service. Please try again.')
    }

    const data = {
      email: email.trim(),
      password,
    }

    // Attempt sign in with comprehensive error handling
    let authResult
    try {
      authResult = await supabase.auth.signInWithPassword(data)
    } catch (signInError: any) {
      console.error('Error during sign in:', signInError)
      return failure('Incorrect email or password. Please check your credentials and try again.')
    }

    const { error, data: authData } = authResult

    if (error) {
      console.error('Supabase auth error:', error)
      
      // Handle specific error cases with user-friendly messages
      const errorMessage = error.message || ''
      
      if (
        errorMessage.includes('Invalid login credentials') || 
        errorMessage.includes('Invalid') ||
        errorMessage.includes('Email not confirmed') ||
        errorMessage.includes('User not found') ||
        errorMessage.includes('Wrong password') ||
        error.code === 'invalid_credentials'
      ) {
        return failure('Incorrect email or password. Please check your credentials and try again.')
      }
      
      if (errorMessage.includes('Email rate limit')) {
        return failure('Too many login attempts. Please try again later.')
      }
      
      // Return a generic but helpful error message for production
      return failure('Failed to sign in. Please check your credentials and try again.')
    }

    if (!authData?.user) {
      return failure('Failed to sign in. Please try again.')
    }

    try {
      revalidatePath('v1/home', 'layout')
    } catch (revalidateError) {
      // Non-critical error, log but don't fail the login
      console.error('Error revalidating path:', revalidateError)
    }

    return success(authData.user)
    
  } catch (error: any) {
    // Catch-all for any unexpected errors
    console.error('Unexpected error in login:', error)
    
    // Return a user-friendly error message without exposing internal details
    return failure('An error occurred while signing in. Please try again.')
  }
}