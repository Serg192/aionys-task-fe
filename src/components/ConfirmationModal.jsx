import { useTranslation } from "react-i18next";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-6 text-center text-lg">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-gray-700 text-white transition-transform transform hover:scale-105"
          >
            {t("confirm")}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-transform transform hover:scale-105"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
