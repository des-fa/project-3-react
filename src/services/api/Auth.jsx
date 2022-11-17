import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiAuth = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  reducerPath: 'apiAuth',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getMyUser: builder.query({
      query: () => ({
        url: '/my/user',
        method: 'GET',
        noError: true
      }),
      providesTags: ['Auth']
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? ['Auth'] : [])
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? ['Auth'] : [])
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          console.error(err) // eslint-disable-line
        } finally {
          dispatch(apiAuth.util.resetApiState())
        }
      }
    })
  })
})

export const {
  useGetMyUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation
} = apiAuth

export const useMyUserState = apiAuth.endpoints.getMyUser.useQueryState