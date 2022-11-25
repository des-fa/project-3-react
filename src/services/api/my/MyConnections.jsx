import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'
import { apiUsers } from '@/services/api/Users'

export const apiMyConnections = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}/api/my/connections` }),
  reducerPath: 'apiMyConnections',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyConnections'],
  endpoints: (builder) => ({
    getMyFollowing: builder.query({
      query: (page) => ({
        url: '/following',
        method: 'GET',
        params: { page },
        noError: true
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
      query: (page) => ({
        url: '/followers',
        method: 'GET',
        params: { page },
        noError: true
      }),
      providesTags: (result) => (result?.followers ? (
        result.followers.map(({ followingId, followerId }) => ({
          type: 'MyConnections', id: `${followingId}_${followerId}`
        }))
      ) : [])
    }),
    getMyFollowingPosts: builder.query({
      query: (page) => ({
        url: '/following/posts',
        method: 'GET',
        params: { page },
        noError: true
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
        noError: true,
        data
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          console.error(err) // eslint-disable-line
        } finally {
          dispatch(apiUsers.util.invalidateTags([{ type: 'Users' }]))
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
          dispatch(apiUsers.util.invalidateTags(['Users']))
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
