# Task Manager App

A modern task management application built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Deployed on Vercel**: [https://task-manager-app-nextjs-pdagd7q2w-nuclei1.vercel.app](https://task-manager-app-nextjs-pdagd7q2w-nuclei1.vercel.app)

## Features

- **Authentication**: Secure sign in and sign up with Supabase Auth
- **Task Management**: Full CRUD operations for tasks with real-time database
- **Protected Routes**: Automatic redirects for authenticated/unauthenticated users
- **Row-Level Security**: Users can only access their own tasks
- **Modern UI**: Clean, responsive design matching professional task management interfaces
- **Form Validation**: Client-side validation using React Hook Form

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **React Hook Form** for form validation
- **ESLint** for code quality

### Backend
- **Supabase** - Backend as a Service
  - **Authentication**: User management and session handling
  - **PostgreSQL Database**: Relational database for tasks
  - **Row-Level Security (RLS)**: Database-level security policies
  - **Server Actions**: Secure server-side operations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project ([Sign up here](https://supabase.com))

### Setup Instructions

1. **Clone the repository**:
```bash
git clone <repository-url>
cd task-manager-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   - Get these values from your Supabase project dashboard: [Settings → API](https://supabase.com/dashboard/project/_/settings/api)

4. **Set up Supabase Database**:
   
   **Option A: Using Migration Files (Recommended)**
   
   The project includes migration files in the `supabase/migrations/` directory. Run them using:
   
   - **Supabase CLI**:
     ```bash
     supabase db push
     ```
   
   - **Supabase Dashboard**: 
     - Go to SQL Editor in your Supabase dashboard
     - Run the files in order:
       1. `supabase/migrations/20240101000000_create_todos_table.sql`
       2. `supabase/migrations/20240101000001_create_rls_policies.sql`
   
   **Option B: Manual Setup**
   
   If you prefer to set up manually, see the migration files for the complete SQL schema and RLS policies.

5. **Run the development server**:
```bash
npm run dev
```

6. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Pages

### Landing Page (`/`)
- Welcome page with links to Sign In, Sign Up, and Demo

### Sign In (`/signin`)
- Email and password login form
- Form validation with error messages
- Link to Sign Up page

### Sign Up (`/signup`)
- Registration form with name, email, password, and confirm password
- Comprehensive form validation
- Link to Sign In page

### Home (`/home`)
- Full task management interface
- Add, update, and delete tasks

## User Flow & Getting Started Guide

### For New Users

Welcome! This guide will walk you through using the Task Manager App for the first time.

#### Step 1: Access the Application

1. **Visit the application**: Navigate to the [Live Demo](https://task-manager-app-nextjs-pdagd7q2w-nuclei1.vercel.app) or your local development server
2. **Landing Page**: You'll see the landing page with options to Sign In or Sign Up

#### Step 2: Create an Account

1. **Click "Sign Up"** or navigate to `/v1/signup`
2. **Fill in the registration form**:
   - **Full Name**: Enter your name (minimum 2 characters)
   - **Email**: Enter a valid email address
   - **Password**: Create a password (minimum 6 characters)
   - **Confirm Password**: Re-enter your password to confirm
3. **Password Visibility**: Click the eye icon to toggle password visibility
4. **Submit**: Click "Let's Get Started!" to create your account
5. **Success**: You'll see a success message and be automatically redirected to the home page

> **Note**: If you're already logged in and try to access the signup page, you'll be automatically redirected to the home page.

#### Step 3: Sign In (For Returning Users)

1. **Click "Sign In"** or navigate to `/v1/signin`
2. **Enter your credentials**:
   - **Email**: Enter your registered email
   - **Password**: Enter your password
   - Use the eye icon to toggle password visibility if needed
3. **Submit**: Click "Sign In"
4. **Success**: You'll be redirected to your home page with your tasks

> **Note**: If you're already logged in, accessing the signin page will redirect you to the home page.

#### Step 4: Manage Your Tasks

Once logged in, you'll land on the **Home Page** (`/v1/home`):

1. **View Your Tasks**:
   - All your tasks are displayed in a list
   - Completed tasks are shown with a strikethrough
   - Empty state appears if you have no tasks yet

2. **Add a New Task**:
   - Click the **"+ Add New Task"** button
   - Enter the task title in the input field (placeholder: "What needs to be done?")
   - Click **"Add Task"** to save
   - The task appears at the top of your list

3. **Mark Task as Complete**:
   - Click the checkbox next to any task
   - The task will be marked as complete (strikethrough style)
   - You'll see a toast notification: "Marked as complete!"
   - Click again to unmark as incomplete

4. **Delete a Task**:
   - Click the delete icon (trash) on any task
   - A confirmation modal will appear
   - Click **"Delete"** to confirm or **"Cancel"** to abort
   - The task will be permanently removed

5. **Profile Menu**:
   - Click your profile avatar (gradient circle) in the top right
   - View your name and email
   - Click **"Logout"** to sign out

### Application Flow Diagram

```
┌─────────────────┐
│  Landing Page   │
│      (/)        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│ Sign Up│ │Sign In │
│  Page  │ │  Page  │
└───┬────┘ └───┬────┘
    │          │
    │          │ (if authenticated)
    │          │ redirects to Home
    │          │
    └────┬─────┘
         │
         ▼
    ┌─────────┐
    │  Home   │
    │  Page   │◄──┐
    │ (/home) │   │
    └────┬────┘   │
         │        │
    ┌────┴────┐   │
    │         │   │
    ▼         ▼   │
┌────────┐ ┌────────┐
│  Add   │ │ Delete │
│  Task  │ │  Task  │
└────────┘ └────────┘
```

### Key Features & Behaviors

#### Route Protection

- **Protected Routes** (`/v1/home`):
  - Requires authentication
  - Unauthenticated users are automatically redirected to `/v1/signin`
  - Shows a loading spinner while checking authentication

- **Guest-Only Routes** (`/v1/signin`, `/v1/signup`, `/v1/auth/error`):
  - Only accessible when not logged in
  - Authenticated users are automatically redirected to `/v1/home`

#### Real-Time Updates

- Tasks are fetched from Supabase on page load
- All operations (add, update, delete) are immediately reflected in the UI
- Optimistic updates provide instant feedback before server confirmation

#### Error Handling

- Form validation errors appear below input fields
- Network errors show toast notifications
- Failed operations can be retried

### Tips for Best Experience

1. **Keep Tasks Organized**: Use clear, descriptive task titles
2. **Mark Complete**: Check off tasks as you complete them
3. **Regular Cleanup**: Delete tasks you no longer need
4. **Stay Logged In**: Your session persists until you log out
5. **Secure Access**: Always log out when using shared devices

### Troubleshooting

- **Can't sign in?**: Verify your email and password are correct
- **Tasks not loading?**: Check your internet connection and refresh the page
- **Redirected unexpectedly?**: This is normal - the app protects routes based on your authentication status
- **Form errors?**: Check that all required fields are filled correctly

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
task-manager-app/
├── app/
│   ├── v1/
│   │   ├── components/
│   │   │   ├── auth/           # Auth-related components
│   │   │   │   └── PasswordInput.tsx
│   │   │   ├── home/           # Home page components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   └── ...
│   │   │   ├── AuthComponent.tsx      # Route protection
│   │   │   ├── GuestOnlyComponent.tsx # Guest route protection
│   │   │   └── ConfirmModal.tsx
│   │   ├── home/
│   │   │   ├── page.tsx        # Home page
│   │   │   └── actions.ts      # Server actions for todos
│   │   ├── signin/
│   │   │   ├── page.tsx        # Sign in page
│   │   │   └── actions.ts      # Sign in server action
│   │   ├── signup/
│   │   │   ├── page.tsx        # Sign up page
│   │   │   └── actions.ts      # Sign up server action
│   │   ├── hooks/
│   │   │   └── useAuth.ts      # Auth hook
│   │   ├── utils/
│   │   │   └── supabase/
│   │   │       ├── client.ts   # Browser client
│   │   │       ├── server.ts   # Server client
│   │   │       └── auth.ts     # Auth utilities
│   │   └── types/              # TypeScript types
│   ├── layout.tsx
│   └── globals.css
├── public/                     # Static assets
└── package.json
```

## Design Features

- **Orange/Coral Accent Color** (#F97316) for primary actions
- **Clean Typography** with proper hierarchy
- **Responsive Layout** that works on all screen sizes
- **Smooth Transitions** and hover effects
- **Card-Based UI** for task items
- **Avatar Placeholders** with gradient backgrounds
- **Icons** using Heroicons (SVG)

## Form Validation

All forms use React Hook Form with the following validations:

### Sign In
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Sign Up
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

### Add Task
- Title: Required

## Backend Architecture

### Supabase Integration

This application uses **Supabase** as the backend, providing:

- **Authentication**: Secure user authentication with email/password
- **Database**: PostgreSQL database hosted on Supabase
- **Row-Level Security**: Database-level security ensuring users can only access their own data
- **Server Actions**: Next.js server actions for secure database operations

### Database Schema

The `todos` table structure:
- `id` (UUID): Primary key
- `user_id` (UUID): Foreign key to `auth.users`
- `title` (TEXT): Task title
- `is_completed` (BOOLEAN): Completion status
- `created_at` (TIMESTAMPTZ): Creation timestamp

### Security Features

- **Row-Level Security (RLS)**: All database operations are protected by RLS policies
- **Server-Side Authentication**: User authentication is verified on the server
- **Protected Routes**: Client-side route protection with automatic redirects
- **Secure API Calls**: All database operations go through server actions


## License

MIT
