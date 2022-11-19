import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyConnections = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/my/connections' }),
  reducerPath: 'apiMyConnections',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyConnections'],
  endpoints: (builder) => ({
    getMyFollowing: builder.query({
      query: () => ({
        url: '/following',
        method: 'GET'
      }),
      providesTags: (result) => (result?.following ? result?.following?.map(({ id }) => ({ type: 'MyConnections', id })) : [])
    }),
    getMyFollowers: builder.query({
      query: () => ({
        url: '/followers',
        method: 'GET'
      }),
      providesTags: (result) => (result?.followers ? result?.followers?.map(({ id }) => ({ type: 'MyConnections', id })) : [])
    }),
    getMyFollowingPosts: builder.query({
      query: () => ({
        url: '/following/posts',
        method: 'GET'
      }),
      providesTags: (result) => (result?.following ? result?.following?.map(({ id }) => ({ type: 'MyConnections', id })) : [])
    }),
    createMyFollowing: builder.mutation({
      query: (data) => ({
        url: `/following/${data.id}`,
        method: 'POST',
        data
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyConnections', id: result?.following?.id }] : [])
    }),
    deleteMyFollowing: builder.mutation({
      query: (data) => ({
        url: `/following/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyConnections', id: result?.following?.id }] : [])
    })
  })
})

export const {
  useGetMyFollowingQuery,
  useGetMyFollowersQuery,
  useGetMyFollowingPostsQuery,
  useCreateMyFollowingMutation,
  useDeleteMyFollowingMutation
} = apiMyConnections
