import React from 'react'
import { authRoles } from '../../../auth/authRoles'

const userRoutes = [
    {
        path: '/users/new',
        component: React.lazy(() => import('../users/AddNewUser')),
        auth: authRoles.sa,
    },
    {
        path: '/users/all',
        component: React.lazy(() => import('../users/ViewAllUsers')),
        auth: authRoles.sa,
    },
]

export default userRoutes
