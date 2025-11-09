# Task Manager App

A modern task management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Authentication Pages**: Sign In and Sign Up forms with validation using React Hook Form
- **Task Management**: Home page with full CRUD operations for tasks
- **Modern UI**: Clean, responsive design matching professional task management interfaces

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **React Hook Form** for form validation
- **ESLint** for code quality

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
task-manager-app/
├── app/
│   ├── components/
│   │   ├── AppBranding.tsx    # Reusable auth branding component
│   │   └── ConfirmModal.tsx   # Reusable confirmation modal
│   ├── page.tsx               # Landing page
│   ├── signin/
│   │   └── page.tsx           # Sign In page
│   ├── signup/
│   │   └── page.tsx           # Sign Up page
│   ├── home/
│   │   └── page.tsx           # Task management home
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── types/
│   ├── signin/
│   │   └── index.ts           # Sign in types
│   ├── signup/
│   │   └── index.ts           # Sign up types
│   ├── home/
│   │   └── index.ts           # Home page types
│   └── components/
│       └── index.ts           # Component types
├── public/                    # Static assets
└── package.json               # Dependencies
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
- Column: Required
- Time: Required


## License

MIT
