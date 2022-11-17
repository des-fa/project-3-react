import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiAuth } from '@/services/api/Auth'

const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiAuth.middleware)
})

setupListeners(store.dispatch)

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
