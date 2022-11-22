import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMyUserState } from '@/services/api/Auth'

function AuthRoute({ children }) {
  const location = useLocation()
  const { data: currentUser } = useMyUserState()

  if (!currentUser) {
    toast.error('You need to login first!')
    return <Navigate to="/" />
  }

  if (!currentUser.profile && location.pathname !== '/my/profile') {
    toast.error('You need to create a profile first!')
    return <Navigate to="/my/profile" />
  }

  return children
}

export default AuthRoute
