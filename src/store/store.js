import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import notesReducer from "../features/notes/notes-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
