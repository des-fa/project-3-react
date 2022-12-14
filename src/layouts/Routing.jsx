import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import ReduxProvider from '@/layouts/ReduxProvider'

import App from '@/layouts/App'
import AuthRoute from '@/layouts/AuthRoute'
import NoAuthRoute from '@/layouts/NoAuthRoute'

import PagesHome from '@/pages/Home'

import PagesMyHome from '@/pages/my/Home'
import PagesMyProfile from '@/pages/my/profile/Profile'
import PagesMyAccountSettings from '@/pages/my/account/Settings'
import PagesMyConnections from '@/pages/my/connections/Connections'

import PagesUsers from '@/pages/users/Index'
import PagesUsersShow from '@/pages/users/Show'

import PagesNotFound from '@/pages/NotFound'
import { SkeletonTheme } from 'react-loading-skeleton'

function Routing() {
  return (
    <ReduxProvider>
      <SkeletonTheme baseColor="#EDEDED" highlightColor="#B2B2B2">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<NoAuthRoute><PagesHome /></NoAuthRoute>} />

              <Route path="/my/home" element={<AuthRoute><PagesMyHome /></AuthRoute>} />
              <Route path="/my/profile" element={<AuthRoute><PagesMyProfile /></AuthRoute>} />
              <Route path="/my/account/settings" element={<AuthRoute><PagesMyAccountSettings /></AuthRoute>} />
              <Route path="/my/connections" element={<AuthRoute><PagesMyConnections /></AuthRoute>} />

              <Route path="/users" element={<AuthRoute><PagesUsers /></AuthRoute>} />
              <Route path="/users/:id" element={<AuthRoute><PagesUsersShow /></AuthRoute>} />

              <Route path="*" element={<PagesNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </ReduxProvider>
  )
}

export default Routing
