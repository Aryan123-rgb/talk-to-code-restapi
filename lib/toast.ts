import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToast = (
  message: string,
  type: ToastType = 'info',
  options = {}
) => {
  const toastOptions = {
    position: 'top-right' as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    ...options,
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};