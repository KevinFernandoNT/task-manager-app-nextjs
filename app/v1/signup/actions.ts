'use server'

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../utils/supabase"
import { redirect } from 'next/navigation'


export async function signup(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  // type-casting
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options : { 
      data : {
        name : formData.get('name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    throw error
  }
  revalidatePath('v1/home', 'layout')
}