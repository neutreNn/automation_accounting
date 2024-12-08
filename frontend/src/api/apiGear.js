import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiGear = createApi({
  reducerPath: 'api',
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
  tagTypes: ['Gears'],
  endpoints: (builder) => ({
    getAllGears: builder.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `/gears?${queryString}`;
      },
      providesTags: ['Gears'],
    }),
    getOneGear: builder.query({
      query: (id) => `/gears/${id}`,
      providesTags: (result, error, id) => [{ type: 'Gears', id }],
    }),
    createGear: builder.mutation({
      query: (data) => ({
        url: '/gears',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Gears'],
    }),
    updateGear: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gears/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Gears', id }, 'Gears'],
    }),
    removeGear: builder.mutation({
      query: (id) => ({
        url: `/gears/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Gears', id }, 'Gears'],
    }),
  }),
});

export const { 
  useGetAllGearsQuery, 
  useGetOneGearQuery, 
  useCreateGearMutation, 
  useUpdateGearMutation, 
  useRemoveGearMutation 
} = apiGear;

export default apiGear;
