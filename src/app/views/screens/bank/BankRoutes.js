import React from 'react'
import { authRoles } from '../../../auth/authRoles'

const bankRoutes = [
    {
        path: '/bank/documents/new',
        component: React.lazy(() => import('../bank/BankSubmitDocument')),
        auth: authRoles.manager,
    },
    {
        path: '/bank/documents/all',
        component: React.lazy(() => import('../bank/ViewAllBanks')),
        auth: authRoles.manager,
    },
    {
        path: '/bank/learning',
        component: React.lazy(() => import('./LearningMaterials')),
        auth: authRoles.manager,
    },
]

export default bankRoutes
