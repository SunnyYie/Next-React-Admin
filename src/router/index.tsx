import { Navigate, Outlet, type RouteObject, createHashRouter } from 'react-router'
import { usePermissionRoutes } from './hooks/use-permission-routes'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router/dom'
import { AppRouteObject } from './type'
import { lazy, Suspense } from 'react'

import ProtectedRoute from './components/protected-route'
import CircleLoading from '../components/circle-loading'
import PageError from '../pages/errors/PageError'
import Login from '../pages/public/login/Login'
import DashboardLayout from '../layout'

// 公共路由
const PUBLIC_ROUTE: AppRouteObject = {
  path: '/login',
  element: (
    <ErrorBoundary FallbackComponent={PageError}>
      <Login />
    </ErrorBoundary>
  ),
}
// 404
const NO_MATCHED_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
}

// error routes
const Page403 = lazy(() => import('../pages/errors/Page403'))
const Page404 = lazy(() => import('../pages/errors/Page404'))
const Page500 = lazy(() => import('../pages/errors/Page500'))

const ERROR_ROUTE: AppRouteObject = {
  element: (
    <ProtectedRoute>
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </ProtectedRoute>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
  ],
}

export default function Router() {
  const permissionRoutes = usePermissionRoutes()

  const PROTECTED_ROUTE: AppRouteObject = {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Navigate to="/" replace /> }, ...permissionRoutes],
  }

  const routes = [PUBLIC_ROUTE, PROTECTED_ROUTE, ERROR_ROUTE, NO_MATCHED_ROUTE] as RouteObject[]
  const router = createHashRouter(routes)

  return <RouterProvider router={router} />
}
