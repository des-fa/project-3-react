import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useGetMyUserQuery } from '@/services/api/Auth'

import LayoutsNavbar from '@/layouts/Navbar'
import Loading from '@/components/Loading'

function App() {
  const { isLoading } = useGetMyUserQuery()

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            <LayoutsNavbar />
            <Outlet />
          </>
        )
      }
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
