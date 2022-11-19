import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyProfile = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/my/profile' }),
  reducerPath: 'apiMyProfile',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyProfile'],
  endpoints: (builder) => ({
    createMyProfile: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      }),
      invalidatesTags: ['MyProfile']
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: ['MyProfile']
    }),

    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'PUT',
        data
      }),
      invalidatesTags: ['MyProfile']
    })
  })
})

export const {
  useCreateMyProfileMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation
} = apiMyProfile
