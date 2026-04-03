import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function NoteEdit({ isOpen, onClose, onSave, note }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const { t } = useTranslation();
  const modalRef = useRef(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...note, title, content });
    onClose();
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4"
      onClick={handleClickOutside}
      data-testid="note-edit-modal"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">
          {note ? t("edit_note") : t("create_note")}
        </h2>

        <input
          type="text"
          placeholder={t("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          data-testid="note-title-input"
        />

        <textarea
          placeholder={t("content")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[300px] text-lg"
          data-testid="note-content-textarea"
        />

        <div className="flex justify-end space-x-3">
          <button
            disabled={!title.trim() && !content.trim()}
            onClick={handleSave}
            className="px-6 py-3 rounded bg-gray-700 text-white text-lg transition-transform transform hover:scale-105"
            data-testid="save-note-button"
          >
            {t("save")}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded bg-gray-300 hover:bg-gray-400 text-lg transition-transform transform hover:scale-105"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
