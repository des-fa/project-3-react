import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMyUserState } from '@/services/api/Auth'

function NoAuthRoute({ children }) {
  const { data: { user: currentUser } = {} } = useMyUserState()
  console.log(currentUser) // eslint-disable-line

  if (currentUser) {
    toast.error('You are already logged in!')
    return <Navigate to="/my/home" />
  }

  return children
}

export default NoAuthRoute