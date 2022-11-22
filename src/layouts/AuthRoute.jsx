import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMyUserState } from '@/services/api/Auth'

function AuthRoute({ children }) {
  const { data: { id: currentUser } = {} } = useMyUserState()
  // console.log(profile)

  if (!currentUser) {
    toast.error('You need to login first!')
    return <Navigate to="/" />
  }

  // if (!profile) {
  //   toast.error('You need to create a profile first!')
  //   return <Navigate to="/my/profile" />
  // }

  return children
}

export default AuthRoute
