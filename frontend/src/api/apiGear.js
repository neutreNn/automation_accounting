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
  endpoints: (builder) => ({
    getAllGears: builder.query({
      query: () => '/gears',
    }),
    getOneGear: builder.query({
      query: (id) => `/gears/${id}`,
    }),
    createGear: builder.mutation({
      query: (data) => ({
        url: '/gears',
        method: 'POST',
        body: data,
      }),
    }),
    updateGear: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gears/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    removeGear: builder.mutation({
      query: (id) => ({
        url: `/gears/${id}`,
        method: 'DELETE',
      }),
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
