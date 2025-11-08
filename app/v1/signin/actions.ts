'use server'

import { revalidatePath } from 'next/cache'

import { createSupabaseServerClient } from '../utils/supabase'

export async function login(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  // type-casting
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data:user } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw error
  }
  revalidatePath('v1/home', 'layout')

  return user?.user;
}