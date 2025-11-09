# Supabase Migrations

This directory contains SQL migration files for setting up the database schema and security policies.

## Migration Files

### 1. `20240101000000_create_todos_table.sql`
Creates the `todos` table with the following structure:
- `id` (UUID): Primary key, auto-generated
- `user_id` (UUID): Foreign key to `auth.users`, with CASCADE delete
- `title` (TEXT): Task title (required)
- `is_completed` (BOOLEAN): Completion status (default: false)
- `created_at` (TIMESTAMPTZ): Creation timestamp

Also includes:
- Indexes on `user_id` and `created_at` for performance
- Enables Row-Level Security (RLS)

### 2. `20240101000001_create_rls_policies.sql`
Creates Row-Level Security policies to ensure:
- Users can only SELECT their own todos
- Users can only INSERT todos with their own user_id
- Users can only UPDATE their own todos
- Users can only DELETE their own todos

## Running Migrations

### Using Supabase CLI

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Run migrations:
```bash
supabase db push
```

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste each migration file content
4. Run them in order (first the table creation, then the policies)

### Manual Execution

You can also run these migrations manually in the Supabase SQL Editor:
1. Execute `20240101000000_create_todos_table.sql` first
2. Then execute `20240101000001_create_rls_policies.sql`

## Verification

After running migrations, verify the setup:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables 
WHERE table_name = 'todos';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'todos';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'todos';
```

## Notes

- Migrations are idempotent (safe to run multiple times)
- The `IF NOT EXISTS` and `IF NOT EXISTS` clauses prevent errors on re-runs
- All policies use `auth.uid()` to ensure users can only access their own data
- The `updated_at` column is automatically maintained by a trigger

