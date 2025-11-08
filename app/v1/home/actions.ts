'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '../utils/supabase/server'
import { getAuthenticatedUser } from '../utils/supabase/auth'

export async function getTodos() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function addTodo(title: string) {
  const supabase = await createSupabaseServerClient()
  const user = await getAuthenticatedUser()

  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        title,
        is_completed: false,
        user_id: user.id,
      },
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  revalidatePath('/v1/home')
  return data
}

export async function updateTodo(id: string, is_completed: boolean) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('todos')
    .update({ is_completed })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  revalidatePath('/v1/home')
  return data
}

export async function deleteTodo(id: string) {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }

  revalidatePath('/v1/home')
}

