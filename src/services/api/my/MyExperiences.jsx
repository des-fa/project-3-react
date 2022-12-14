import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyExperiences = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}/api/my/experiences` }),
  reducerPath: 'apiMyExperiences',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyExperiences', 'MyExperienceShow'],
  endpoints: (builder) => ({
    getMyExperiences: builder.query({
      query: (page) => ({
        url: '',
        method: 'GET',
        params: { page }
      }),
      providesTags: (result) => (result?.experiences ? [
        ...result.experiences.map(({ id }) => ({ type: 'MyExperiences', id })),
        'MyExperiences'
      ] : ['MyExperiences'])
    }),
    getMyExperience: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyExperienceShow', id: result?.experience?.id }] : [])
    }),
    createMyExperience: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? ['MyExperiences'] : [])
    }),
    updateMyExperience: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        data
      }),
      invalidatesTags: (result) => (result ? ['MyExperiences', { type: 'MyExperienceShow', id: result?.experience?.id }] : [])
    }),
    deleteMyExperience: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? ['MyExperiences'] : [])
    })
  })
})

export const {
  useGetMyExperiencesQuery,
  useGetMyExperienceQuery,
  useCreateMyExperienceMutation,
  useUpdateMyExperienceMutation,
  useDeleteMyExperienceMutation
} = apiMyExperiences
