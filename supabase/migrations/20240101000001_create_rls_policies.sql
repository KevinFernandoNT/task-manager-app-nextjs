-- Create Row-Level Security (RLS) policies for todos table
-- These policies ensure users can only access their own todos

-- Policy: Users can view their own todos
CREATE POLICY "Users can view own todos"
  ON todos
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own todos
CREATE POLICY "Users can insert own todos"
  ON todos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own todos
CREATE POLICY "Users can update own todos"
  ON todos
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own todos
CREATE POLICY "Users can delete own todos"
  ON todos
  FOR DELETE
  USING (auth.uid() = user_id);

