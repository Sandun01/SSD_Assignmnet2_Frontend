import React from 'react'
import { authRoles } from '../../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Dashboard')),
        auth: authRoles.worker,
    }
]

export default dashboardRoutes
