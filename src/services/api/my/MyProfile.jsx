import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'
import { apiAuth } from '@/services/api/Auth'

export const apiMyProfile = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}/api/my/profile` }),
  reducerPath: 'apiMyProfile',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyProfile'],
  endpoints: (builder) => ({
    createMyProfile: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      }),
      // invalidatesTags: (result) => (result ? ['MyProfile', { type: 'MyProfileShow', id: result?.profile?.id }] : [])
      invalidatesTags: (result) => (result ? ['MyProfile'] : []),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          console.error(err) // eslint-disable-line
        } finally {
          dispatch(apiAuth.util.invalidateTags(['Auth']))
        }
      }
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: '',
        method: 'GET',
        noError: true
      }),
      providesTags: (result) => (result ? ['MyProfile'
      ] : ['MyProfile'])
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'PUT',
        data
      }),
      invalidatesTags: (result) => (result ? ['MyProfile'] : [])
    })
  })
})

export const {
  useCreateMyProfileMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation
} = apiMyProfile
