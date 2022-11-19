// router.get('/api/users/:id', authenticateUser('json'), (await import('./api/users/show.js')).default)
import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiUsers = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/users' }),
  reducerPath: 'apiUsers',
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['MyUsers'],
  endpoints: (builder) => ({
    getMyUsers: builder.query({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      providesTags: (result) => (result?.users ? result?.users?.map(({ id }) => ({ type: 'MyUsers', id })) : [])
    }),
    getMyUser: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'MyUsers', id: result?.user?.id }] : [])
    })

  })
})

export const {
  useGetMyUsersQuery,
  useLazyGetMyUsersQuery,
  useGetMyUserQuery
} = apiUsers
