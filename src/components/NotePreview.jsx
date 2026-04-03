import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export default function NotePreview({ note, onEdit, onDelete }) {
  const createdAt = new Date(note.createdAt);
  const updatedAt = new Date(note.updatedAt);
  const isEdited = createdAt.getTime() !== updatedAt.getTime();
  const { t } = useTranslation();

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="flex bg-white rounded-md shadow-md mb-4 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="w-3 bg-gray-800 rounded-l-md"></div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-2">{note.title}</h2>
        <p className="text-gray-700 mb-3">
          {note.content.length > 100
            ? note.content.substring(0, 100) + "..."
            : note.content}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="capitalize">
            {isEdited ? t("edited") : t("created")}:{" "}
            {formatDateTime(isEdited ? updatedAt : createdAt)}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit?.(1)}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <PencilIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => onDelete?.(1)}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
