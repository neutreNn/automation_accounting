import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiLogs = createApi({
  reducerPath: 'apiLogs',
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
  tagTypes: ['Logs'],
  endpoints: (builder) => ({
    getAllLogs: builder.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `/logs?${queryString}`;
      },
      providesTags: ['Logs'],
    }),
  }),
});

export const { 
  useGetAllLogsQuery,
} = apiLogs;

export default apiLogs;
