# Supabase Configuration

This directory contains Supabase database migrations and configuration files.

## Directory Structure

```
supabase/
├── migrations/          # SQL migration files
│   ├── 20240101000000_create_todos_table.sql
│   ├── 20240101000001_create_rls_policies.sql
│   └── README.md
└── README.md           # This file
```

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run migrations** using one of the methods described in `migrations/README.md`

3. **Configure environment variables** in your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Migration Files

See `migrations/README.md` for detailed information about each migration file.

## Database Schema

The application uses a single `todos` table with Row-Level Security enabled.

### Todos Table
- Stores user tasks
- Protected by RLS policies
- Automatically tracks creation and update timestamps

For the complete schema, see the migration files in the `migrations/` directory.

