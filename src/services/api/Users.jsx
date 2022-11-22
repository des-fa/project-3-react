// router.get('/api/users/:id', authenticateUser('json'), (await import('./api/users/show.js')).default)
import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiUsers = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/users' }),
  reducerPath: 'apiUsers',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (q) => ({
        url: '',
        method: 'GET',
        params: { q }
      }),
      providesTags: (result) => (result?.users ? [...result.users.map(({ id }) => ({ type: 'Users', id })), 'Users'] : ['Users'])
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'Users', id: result?.user?.id }, 'Users'] : ['Users'])
    })
  })
})

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserQuery
} = apiUsers
