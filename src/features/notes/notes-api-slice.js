import { apiSlice } from "../../store/api/api-slice";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: ({ page = 1, limit = 5 }) => `/notes?page=${page}&limit=${limit}`,
      transformResponse: (response) => ({
        notes: response.payload.data,
        totalPages: Math.ceil(
          response.payload.pagination.total / response.payload.pagination.limit,
        ),
        page: response.payload.pagination.page,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.notes.map(({ id }) => ({ type: "Notes", id })),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
    }),

    addNote: builder.mutation({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: note,
      }),
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Notes", id }],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
