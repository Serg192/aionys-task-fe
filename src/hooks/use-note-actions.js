import { useDispatch } from "react-redux";
import {
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../features/notes/notes-api-slice";
import { addNote, editNote, deleteNote } from "../features/notes/notes-slice";

export default function useNoteActions() {
  const dispatch = useDispatch();
  const [addNoteMutation] = useAddNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();
  const [deleteNoteMutation] = useDeleteNoteMutation();

  const saveNote = async (note) => {
    if (note.id) {
      dispatch(editNote({ id: note.id, data: note }));
      try {
        await updateNoteMutation(note).unwrap();
      } catch {
        console.error("Update failed, refetching...");
      }
    } else {
      const tempId = Date.now();
      const tempNote = { ...note, id: tempId };
      dispatch(addNote(tempNote));
      try {
        const savedNote = await addNoteMutation(note).unwrap();
        dispatch(editNote({ id: tempId, data: savedNote }));
      } catch {
        console.error("Add failed, removing temp note");
        dispatch(deleteNote(tempId));
      }
    }
  };

  const removeNote = async (id) => {
    dispatch(deleteNote(id));
    try {
      await deleteNoteMutation(id).unwrap();
    } catch {
      console.error("Delete failed, refetching...");
    }
  };

  return { saveNote, removeNote };
}
