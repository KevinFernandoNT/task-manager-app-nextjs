'use client';

import { useState, useEffect } from 'react';
import { useTransition } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import AuthComponent from '../components/AuthComponent';
import {
  Header,
  TaskForm,
  TaskList,
  EmptyState,
  LoadingSpinner,
} from '../components/home';
import { Task, TaskFormData } from '@/app/v1/types/home';
import { useAuth } from '../hooks/useAuth';
import { getTodos, addTodo, updateTodo, deleteTodo } from './actions';
import toast from 'react-hot-toast';

function HomeContent() {
  const user = useAuth();
  const [isPending, startTransition] = useTransition();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const result = await getTodos();
      
      if (result.success && result.data) {
        setTasks(result.data);
      } else {
        toast.error(result.error || 'Failed to load tasks');
      }
      
      setLoading(false);
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const onAddTask = (data: TaskFormData) => {
    startTransition(async () => {
      const result = await addTodo(data.title);
      
      if (result.success && result.data) {
        setTasks([result.data, ...tasks]);
        setShowAddTaskForm(false);
        toast.success('Task added successfully!');
      } else {
        toast.error(result.error || 'Failed to add task');
      }
    });
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      startTransition(async () => {
        const result = await deleteTodo(taskToDelete);
        
        if (result.success) {
          setTasks(tasks.filter((task) => task.id !== taskToDelete));
          setTaskToDelete(null);
          toast.success('Task deleted successfully!');
        } else {
          toast.error(result.error || 'Failed to delete task');
        }
      });
    }
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newCompleted = !task.is_completed;
    
    // Optimistic update
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, is_completed: newCompleted } : t
      )
    );

    startTransition(async () => {
      const result = await updateTodo(id, newCompleted);
      
      if (result.success) {
        if (newCompleted) {
          toast.success('Marked as complete!');
        }
      } else {
        // Revert on error
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, is_completed: !newCompleted } : t
          )
        );
        toast.error(result.error || 'Failed to update task');
      }
    });
  };


  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

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
          <TaskForm
            onSubmit={onAddTask}
            onCancel={() => setShowAddTaskForm(false)}
            isPending={isPending}
          />
        )}

        {/* Tasks List */}
        {loading ? (
          <LoadingSpinner message="Loading tasks..." />
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleComplete}
              onDelete={handleDeleteClick}
            />
            {tasks.length === 0 && (
              <EmptyState onAddTask={() => setShowAddTaskForm(true)} />
            )}
          </>
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

export default function Home() {
  return (
    <AuthComponent>
      <HomeContent />
    </AuthComponent>
  );
}

