import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyEducations = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}/api/my/educations` }),
  reducerPath: 'apiMyEducations',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyEducations', 'MyEducationShow'],
  endpoints: (builder) => ({
    getMyEducations: builder.query({
      query: (page) => ({
        url: '',
        method: 'GET',
        params: { page }
      }),
      providesTags: (result) => (result?.educations ? [
        ...result.educations.map(({ id }) => ({ type: 'MyEducations', id })),
        'MyEducations'
      ] : ['MyEducations'])
    }),
    getMyEducation: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyEducationShow', id: result?.education?.id }] : [])
    }),
    createMyEducation: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? ['MyEducations'] : [])
    }),
    updateMyEducation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        data
      }),
      invalidatesTags: (result) => (result ? ['MyEducations', { type: 'MyEducationShow', id: result?.education?.id }] : [])
    }),
    deleteMyEducation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? ['MyEducations'] : [])
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
