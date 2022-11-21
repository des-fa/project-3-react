import { createApi } from '@reduxjs/toolkit/query/react'
import { serialize } from 'object-to-formdata'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyPosts = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/my/posts' }),
  reducerPath: 'apiMyPosts',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyPosts'],
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: (result) => (result?.posts ? result?.posts?.map(({ id }) => ({ type: 'MyPosts', id })) : [])
    }),
    getMyPost: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyPosts', id: result?.post?.id }] : [])
    }),
    createMyPost: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data: serialize(data, { indices: true })
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyPosts', id: result?.post?.id }] : [])
    }),
    updateMyPost: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        data: serialize(data, { indices: true })
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyPosts', id: result?.post?.id }] : [])
    }),
    deleteMyPost: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [{ type: 'MyPosts', id: result?.post?.id }] : [])
    })
  })
})

export const {
  useGetMyPostsQuery,
  useGetMyPostQuery,
  useCreateMyPostMutation,
  useUpdateMyPostMutation,
  useDeleteMyPostMutation
} = apiMyPosts
