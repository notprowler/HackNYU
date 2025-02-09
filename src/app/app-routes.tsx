import { UiLayout } from '@/components/ui/ui-layout'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AccountListFeature = lazy(() => import('../components/account/account-list-feature'))
const AccountDetailFeature = lazy(() => import('../components/account/account-detail-feature'))
const HACKNYUFeature = lazy(() => import('../components/HACKNYU/HACKNYU-feature'))
const DashboardFeature = lazy(() => import('../components/dashboard/dashboard-feature'))

const Login = lazy(() => import('../components/login/Login'))

const Signup = lazy(() => import('../components/signup/Signup'))

const Customer = lazy(() => import('../components/customer/customer'))

const links: { label: string; path: string }[] = [
  // { label: 'Account', path: '/account' },
  // { label: 'Clusters', path: '/clusters' },
  // { label: 'HACKNYU Program', path: '/HACKNYU' },
]

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
  { path: '/HACKNYU', element: <HACKNYUFeature /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/customer', element: <Customer /> },
]

export function AppRoutes() {
  const router = useRoutes([
    { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
    { path: '/dashboard', element: <DashboardFeature /> },
    ...routes,
    { path: '*', element: <Navigate to={'/dashboard'} replace={true} /> },
  ])
  return <UiLayout links={links}>{router}</UiLayout>
}
