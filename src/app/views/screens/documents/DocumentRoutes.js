import React from 'react'
import { authRoles } from '../../../auth/authRoles'

const documentRoutes = [
    {
        path: '/documents/new',
        component: React.lazy(() => import('../documents/SaveDocument')),
        auth: authRoles.manager,
    },
    {
        path: '/documents/all',
        component: React.lazy(() => import('../documents/ViewDocuments')),
        auth: authRoles.manager,
    },
]

export default documentRoutes
