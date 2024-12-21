import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiWorker = createApi({
  reducerPath: 'apiWorker',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Workers'],
  endpoints: (builder) => ({
    getAllWorkers: builder.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `/workers?${queryString}`;
      },
      providesTags: ['Workers'],
    }),
    getOneWorker: builder.query({
      query: (id) => `/workers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workers', id }],
    }),
    createWorker: builder.mutation({
      query: (data) => ({
        url: '/workers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Workers'],
    }),
    updateWorker: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/workers/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Workers', id }, 'Workers'],
    }),
    removeWorker: builder.mutation({
      query: (id) => ({
        url: `/workers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Workers', id }, 'Workers'],
    }),
  }),
});

export const { 
  useGetAllWorkersQuery, 
  useGetOneWorkerQuery, 
  useCreateWorkerMutation, 
  useUpdateWorkerMutation, 
  useRemoveWorkerMutation 
} = apiWorker;

export default apiWorker;
