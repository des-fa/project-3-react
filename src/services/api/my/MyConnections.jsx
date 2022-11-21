import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'
import { apiUsers } from '@/services/api/Users'

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
      providesTags: (result) => (result?.following ? (
        [
          ...result.following.map(({ followingId, followerId }) => ({
            type: 'MyConnections', id: `${followingId}_${followerId}`
          })),
          'MyConnections'
        ]
      ) : ['MyConnections'])
    }),
    getMyFollowers: builder.query({
      query: () => ({
        url: '/followers',
        method: 'GET'
      }),
      providesTags: (result) => (result?.followers ? (
        result.followers.map(({ followingId, followerId }) => ({
          type: 'MyConnections', id: `${followingId}_${followerId}`
        }))
      ) : [])
    }),
    getMyFollowingPosts: builder.query({
      query: () => ({
        url: '/following/posts',
        method: 'GET'
      }),
      providesTags: (result) => (result?.following ? (
        result.following.map(({ followingId, followerId }) => ({
          type: 'MyConnections', id: `${followingId}_${followerId}`
        }))
      ) : [])
    }),
    createMyFollowing: builder.mutation({
      query: (data) => ({
        url: `/following/${data}`,
        method: 'POST',
        data
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          console.error(err) // eslint-disable-line
        } finally {
          dispatch(apiUsers.util.invalidateTags([{ type: 'MyUsers' }]))
        }
      }
    }),
    deleteMyFollowing: builder.mutation({
      query: (data) => ({
        url: `/following/${data}`,
        method: 'DELETE'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          console.error(err) // eslint-disable-line
        } finally {
          dispatch(apiUsers.util.invalidateTags(['MyUsers']))
        }
      }
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
