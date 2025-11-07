export type Task = {
  id: number;
  title: string;
  completed: boolean;
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

