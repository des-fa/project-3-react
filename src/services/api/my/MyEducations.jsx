import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyEducations = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/my/educations' }),
  reducerPath: 'apiMyEducations',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyEducations'],
  endpoints: (builder) => ({
    getMyEducations: builder.query({
      query: (page) => ({
        url: '',
        method: 'GET',
        params: { page }
      }),
      providesTags: (result) => (result?.educations ? result?.educations?.map(({ id }) => ({ type: 'MyEducations', id })) : [])
    }),
    getMyEducation: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyEducations', id: result?.education?.id }] : [])
    }),
    createMyEducation: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyEducations', id: result?.education?.id }] : ['MyEducations'])
    }),
    updateMyEducation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        data
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyEducations', id: result?.education?.id }] : [])
    }),
    deleteMyEducation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyEducations', id: result?.education?.id }] : [])
    })
  })
})

export const {
  useGetMyEducationsQuery,
  useGetMyEducationQuery,
  useCreateMyEducationMutation,
  useUpdateMyEducationMutation,
  useDeleteMyEducationMutation
} = apiMyEducations
