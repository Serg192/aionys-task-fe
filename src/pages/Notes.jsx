import {
  NotePreview,
  Pagination,
  NoteEdit,
  ConfirmationModal,
} from "../components";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetNotesQuery } from "../features/notes/notes-api-slice";
import { setNotes, setCurrentPage } from "../features/notes/notes-slice";
import { useTranslation } from "react-i18next";
import useModal from "../hooks/use-modal";
import useNoteActions from "../hooks/use-note-actions";

export function Notes() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { notes, currentPage, totalPages } = useSelector(
    (state) => state.notes,
  );

  const editModal = useModal();
  const confirmModal = useModal();

  const [editingNote, setEditingNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const { data, isLoading, isError } = useGetNotesQuery({
    page: currentPage,
    limit: 5,
  });

  const { saveNote, removeNote } = useNoteActions();

  useEffect(() => {
    if (data) {
      dispatch(
        setNotes({
          notes: data.notes,
          totalPages: data.totalPages,
        }),
      );
    }
  }, [data, dispatch]);

  const handleAddNoteClick = () => {
    setEditingNote(null);
    editModal.open();
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    editModal.open();
  };

  const handleSaveNote = async (note) => {
    await saveNote(note);
    editModal.close();
  };

  const handleDeleteClick = (note) => {
    setNoteToDelete(note.id);
    confirmModal.open();
  };

  const handleConfirmDelete = async () => {
    await removeNote(noteToDelete);
    confirmModal.close();
    setNoteToDelete(null);
  };

  if (isLoading) return <div>{t("loading")}</div>;
  if (isError) return <div>{t("loading_err")}</div>;

  return (
    <div className="flex flex-col items-center w-full relative">
      <button
        data-testid="add-note-button"
        onClick={handleAddNoteClick}
        className="fixed top-32 right-8 p-3 bg-gray-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      <div className="w-full max-w-2xl mt-8">
        {notes.map((note) => (
          <NotePreview
            data-testid={`note-${note.id}`}
            key={note.id}
            note={note}
            onEdit={() => handleEditClick(note)}
            onDelete={() => handleDeleteClick(note)}
          />
        ))}

        {notes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 text-2xl">
            {t("no_notes")}
          </div>
        )}
      </div>

      {notes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      )}

      <NoteEdit
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSave={handleSaveNote}
        note={editingNote}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        onConfirm={handleConfirmDelete}
        message={t("confirm_delete_note")}
      />
    </div>
  );
}
