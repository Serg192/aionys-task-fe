import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notes: [],
  currentPage: 1,
  notesPerPage: 5,
  totalPages: 1,
};
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload.notes;
      state.totalPages = action.payload.totalPages;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    editNote: (state, action) => {
      const { id, data } = action.payload;
      const index = state.notes.findIndex((note) => note.id === id);
      if (index !== -1) state.notes[index] = { ...state.notes[index], ...data };
    },
  },
});
export const { setCurrentPage, setNotes, addNote, deleteNote, editNote } =
  notesSlice.actions;

export default notesSlice.reducer;
