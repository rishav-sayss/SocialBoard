import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '../shared/components/RootLayout'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { GuestRoute } from '../features/auth/components/GuestRoute'
import { Login } from '../features/auth/pages/Login'
import { Register } from '../features/auth/pages/Register'
import { Home } from '../features/posts/pages/Home'
import { PostDetails } from '../features/posts/pages/PostDetails'
import { Profile } from '../features/profile/pages/Profile'
import { EditProfile } from '../features/profile/pages/EditProfile'
import { AdminDashboard } from '../features/admin/pages/AdminDashboard'
import { UserManagement } from '../features/admin/pages/UserManagement'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'image/:id', element: <PostDetails /> },
      {
        element: <GuestRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'profile/edit', element: <EditProfile /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['admin', 'superadmin']} />,
        children: [
          { path: 'admin', element: <AdminDashboard /> },
          { path: 'admin/users', element: <UserManagement /> },
        ],
      },
      {
        path: '*',
        element: (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">404</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Page not found.</p>
          </div>
        ),
      },
    ],
  },
])

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />
}
