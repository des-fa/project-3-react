import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

import { useGetMyUserQuery } from '@/services/api/Auth'

import LayoutsNavbar from '@/layouts/Navbar'
import LayoutsFooter from '@/layouts/Footer'
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
            <LayoutsFooter />
            <ScrollToTop smooth className="scroll-btn" style={{ bottom: 95 }} />
          </>
        )
      }
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
