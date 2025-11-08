export type Task = {
  id: string;
  title: string;
  is_completed: boolean;
};

export type TaskFormData = {
  title: string;
};

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

