'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '../utils/supabase/server'
import { getAuthenticatedUser } from '../utils/supabase/auth'
import { success, failure, type ActionResult } from '../utils/result'
import type { Task } from '../types/home'

export async function getTodos(): Promise<ActionResult<Task[]>> {
  try {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching todos:', error)
      return failure(error.message || 'Failed to fetch tasks. Please try again.')
    }

    return success(data || [])
  } catch (error: any) {
    console.error('Unexpected error in getTodos:', error)
    return failure(error?.message || 'An unexpected error occurred while fetching tasks.')
  }
}

export async function addTodo(title: string): Promise<ActionResult<Task>> {
  try {
    const supabase = await createSupabaseServerClient()
    const userResult = await getAuthenticatedUser()

    if (!userResult.success) {
      return failure(userResult.error || 'Authentication required. Please sign in again.')
    }

    const user = userResult.data!

    // Validate input
    if (!title || title.trim().length === 0) {
      return failure('Task title cannot be empty.')
    }

    if (title.trim().length > 500) {
      return failure('Task title is too long. Maximum 500 characters allowed.')
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          title: title.trim(),
          is_completed: false,
          user_id: user.id,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error adding todo:', error)
      
      // Handle specific error cases
      if (error.code === '23505') {
        return failure('A task with this title already exists.')
      }
      
      return failure(error.message || 'Failed to add task. Please try again.')
    }

    if (!data) {
      return failure('Task was created but could not be retrieved.')
    }

    revalidatePath('/v1/home')
    return success(data)
  } catch (error: any) {
    console.error('Unexpected error in addTodo:', error)
    return failure(error?.message || 'An unexpected error occurred while adding the task.')
  }
}

export async function updateTodo(id: string, is_completed: boolean): Promise<ActionResult<Task>> {
  try {
    const supabase = await createSupabaseServerClient()

    // Validate input
    if (!id || id.trim().length === 0) {
      return failure('Invalid task ID.')
    }

    const { data, error } = await supabase
      .from('todos')
      .update({ is_completed })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating todo:', error)
      
      // Handle specific error cases
      if (error.code === 'PGRST116') {
        return failure('Task not found. It may have been deleted.')
      }
      
      return failure(error.message || 'Failed to update task. Please try again.')
    }

    if (!data) {
      return failure('Task was updated but could not be retrieved.')
    }

    revalidatePath('/v1/home')
    return success(data)
  } catch (error: any) {
    console.error('Unexpected error in updateTodo:', error)
    return failure(error?.message || 'An unexpected error occurred while updating the task.')
  }
}

export async function deleteTodo(id: string): Promise<ActionResult<void>> {
  try {
    const supabase = await createSupabaseServerClient()

    // Validate input
    if (!id || id.trim().length === 0) {
      return failure('Invalid task ID.')
    }

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting todo:', error)
      
      // Handle specific error cases
      if (error.code === 'PGRST116') {
        return failure('Task not found. It may have already been deleted.')
      }
      
      return failure(error.message || 'Failed to delete task. Please try again.')
    }

    revalidatePath('/v1/home')
    return success(undefined)
  } catch (error: any) {
    console.error('Unexpected error in deleteTodo:', error)
    return failure(error?.message || 'An unexpected error occurred while deleting the task.')
  }
}

