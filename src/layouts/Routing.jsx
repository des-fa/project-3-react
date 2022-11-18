import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import ReduxProvider from '@/layouts/ReduxProvider'

import App from '@/layouts/App'
import AuthRoute from '@/layouts/AuthRoute'
import NoAuthRoute from '@/layouts/NoAuthRoute'

import PagesHome from '@/pages/Home'

import PagesMyProfile from '@/pages/my/Profile'
import PagesMyHome from '@/pages/my/Home'

import PagesNotFound from '@/pages/NotFound'

function Routing() {
  return (
    <ReduxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<NoAuthRoute><PagesHome /></NoAuthRoute>} />

            <Route path="/my/profile" element={<AuthRoute><PagesMyProfile /></AuthRoute>} />
            <Route path="/my/home" element={<AuthRoute><PagesMyHome /></AuthRoute>} />

            <Route path="*" element={<PagesNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default Routing
