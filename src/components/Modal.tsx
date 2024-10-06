import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full">
        <button onClick={onClose} className="text-red-500 float-right">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
