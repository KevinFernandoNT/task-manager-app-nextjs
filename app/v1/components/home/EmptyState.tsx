'use client';

interface EmptyStateProps {
  onAddTask: () => void;
}

export default function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 p-16 text-center">
      {/* Illustration */}
      <div className="mb-6 flex justify-center">
        <svg
          className="h-48 w-48 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No tasks yet</h3>
      <p className="mb-6 text-sm text-gray-400">
        Get started by adding your first task. Stay organized and productive!
      </p>
    </div>
  );
}

