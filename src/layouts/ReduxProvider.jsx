import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiAuth } from '@/services/api/Auth'
import { apiMyProfile } from '@/services/api/MyProfile'
import { apiMyPosts } from '@/services/api/MyPosts'
import { apiMyExperiences } from '@/services/api/MyExperiences'
import { apiMyEducations } from '@/services/api/MyEducations'
import { apiMyConnections } from '@/services/api/MyConnections'

const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiMyProfile.reducerPath]: apiMyProfile.reducer,
    [apiMyPosts.reducerPath]: apiMyPosts.reducer,
    [apiMyExperiences.reducerPath]: apiMyExperiences.reducer,
    [apiMyEducations.reducerPath]: apiMyEducations.reducer,
    [apiMyConnections.reducerPath]: apiMyConnections.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiAuth.middleware)
    .concat(apiMyProfile.middleware)
    .concat(apiMyPosts.middleware)
    .concat(apiMyExperiences.middleware)
    .concat(apiMyEducations.middleware)
    .concat(apiMyConnections.middleware)
})

setupListeners(store.dispatch)

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
