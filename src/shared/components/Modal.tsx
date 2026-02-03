interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with opacity */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content - full opacity */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`p-6 bg-white`}>
          <div className="flex items-center justify-center gap-3">
            {/* <span className="text-4xl">{iconEmojis[type]}</span> */}
            <h3 className="text-2xl font-bold">
              {title || type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="flex items-center justify-center text-center text-gray-700 text-lg whitespace-pre-line">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
