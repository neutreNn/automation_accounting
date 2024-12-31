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
      query: (employee_number) => `/workers/${employee_number}`,
      providesTags: (result, error, employee_number) => [{ type: 'Workers', employee_number }],
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
      query: ({ employee_number, ...data }) => ({
        url: `/workers/${employee_number}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { employee_number }) => [{ type: 'Workers', employee_number }, 'Workers'],
    }),
    removeWorker: builder.mutation({
      query: (employee_number) => ({
        url: `/workers/${employee_number}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, employee_number) => [{ type: 'Workers', employee_number }, 'Workers'],
    }),
  }),
});

export const { 
  useGetAllWorkersQuery, 
  useGetOneWorkerQuery,
  useLazyGetOneWorkerQuery, 
  useCreateWorkerMutation, 
  useUpdateWorkerMutation, 
  useRemoveWorkerMutation 
} = apiWorker;

export default apiWorker;
