import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiAuth } from '@/services/api/Auth'
import { apiMyProfile } from '@/services/api/MyProfile'
import { apiMyPosts } from '@/services/api/MyPosts'

const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiMyProfile.reducerPath]: apiMyProfile.reducer,
    [apiMyPosts.reducerPath]: apiMyPosts.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiAuth.middleware)
    .concat(apiMyProfile.middleware)
    .concat(apiMyPosts.middleware)
})

setupListeners(store.dispatch)

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
