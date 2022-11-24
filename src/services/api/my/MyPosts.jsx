import { createApi } from '@reduxjs/toolkit/query/react'
import { serialize } from 'object-to-formdata'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyPosts = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/my/posts' }),
  reducerPath: 'apiMyPosts',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyPosts', 'MyPostShow'],
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: (page) => ({
        url: '',
        method: 'GET',
        params: { page }
      }),
      providesTags: (result) => (result?.posts ? [
        ...result.posts.map(({ id }) => ({ type: 'MyPosts', id })),
        'MyPosts'
      ] : ['MyPosts'])
    }),
    getMyPost: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyPostShow', id: result?.post?.id }] : [])
    }),
    createMyPost: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data: serialize(data, { indices: true })
      }),
      invalidatesTags: (result) => (result ? ['MyPosts'] : [])
    }),
    updateMyPost: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        data: serialize(data, { indices: true })
      }),
      invalidatesTags: (result) => (result ? ['MyPosts', { type: 'MyPostShow', id: result?.post?.id }] : [])
    }),
    deleteMyPost: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? ['MyPosts'] : [])
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
