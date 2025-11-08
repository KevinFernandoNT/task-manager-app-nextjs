'use client';

import { useForm } from 'react-hook-form';
import { TaskFormData } from '@/app/v1/types/home';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function TaskForm({ onSubmit, onCancel, isPending }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Task</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <input
            {...register('title', { required: 'Task title is required' })}
            type="text"
            placeholder="What needs to be done?"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Adding...' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

