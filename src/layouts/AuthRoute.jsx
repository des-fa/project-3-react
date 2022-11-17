import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMyUserState } from '@/services/api/Auth'

function AuthRoute({ children }) {
  const { data: { user: currentUser } = {} } = useMyUserState()

  if (!currentUser) {
    toast.error('You need to login first!')
    return <Navigate to="/" />
  }

  return children
}

export default AuthRoute
