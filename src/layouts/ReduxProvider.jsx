import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiAuth } from '@/services/api/Auth'
import { apiMyProfile } from '@/services/api/my/MyProfile'
import { apiMyPosts } from '@/services/api/my/MyPosts'
import { apiMyExperiences } from '@/services/api/my/MyExperiences'
import { apiMyEducations } from '@/services/api/my/MyEducations'
import { apiMyConnections } from '@/services/api/my/MyConnections'
import { apiUsers } from '@/services/api/Users'

const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiMyProfile.reducerPath]: apiMyProfile.reducer,
    [apiMyPosts.reducerPath]: apiMyPosts.reducer,
    [apiMyExperiences.reducerPath]: apiMyExperiences.reducer,
    [apiMyEducations.reducerPath]: apiMyEducations.reducer,
    [apiMyConnections.reducerPath]: apiMyConnections.reducer,
    [apiUsers.reducerPath]: apiUsers.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiAuth.middleware)
    .concat(apiMyProfile.middleware)
    .concat(apiMyPosts.middleware)
    .concat(apiMyExperiences.middleware)
    .concat(apiMyEducations.middleware)
    .concat(apiMyConnections.middleware)
    .concat(apiUsers.middleware)
})

setupListeners(store.dispatch)

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
