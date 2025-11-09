-- Create todos table
-- This migration creates the todos table with all necessary columns
-- and sets up the initial structure for the task management system

CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- Enable Row-Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

