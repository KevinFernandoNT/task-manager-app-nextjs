'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ConfirmModal from '../components/ConfirmModal';
import { Task, TaskFormData } from '@/app/v1/types/home';

export default function Home() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Create an interactive prototype of the add-user script',
      completed: false,
    },
    {
      id: 2,
      title: 'Implement the "Home Page" in the project',
      completed: false,
    },
    {
      id: 3,
      title: 'Write a text for the Landing Page',
      completed: true,
    },
    {
      id: 4,
      title: 'Wednesday meeting',
      completed: false,
    },
    {
      id: 5,
      title: 'Identify the competitive advantages',
      completed: false,
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setShowAddTaskForm(false);
    reset();
  };

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear session, redirect to login)
    console.log('Logging out...');
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Profile */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <div className="relative flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-600">john.doe@example.com</p>
            </div>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            ></button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                {/* Invisible overlay to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                ></div>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-600">john.doe@example.com</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Add Task Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            + Add New Task
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTaskForm && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Task</h3>
            <form onSubmit={handleSubmit(onAddTask)} className="space-y-4">
              <div>
                <input
                  {...register('title', { required: 'Task title is required' })}
                  type="text"
                  placeholder="Enter task title"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddTaskForm(false);
                    reset();
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
            >
              {/* Complete Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5 cursor-pointer rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0"
              />

              {/* Task Title */}
              <div className="flex-1">
                <h3
                  className={`text-sm font-medium ${
                    task.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteClick(task.id)}
                className="text-gray-400 transition hover:text-red-500"
                title="Delete task"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-600">No tasks yet. Add your first task to get started!</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

