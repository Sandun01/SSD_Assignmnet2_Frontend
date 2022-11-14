import React from 'react'
import { authRoles } from '../../../auth/authRoles'

const messageRoutes = [
    {
        path: '/messages/new',
        component: React.lazy(() => import('../messages/NewMessage')),
        auth: authRoles.manager,
    },
    {
        path: '/messages/received/all',
        component: React.lazy(() => import('../messages/ReceivedMessages')),
        auth: authRoles.manager,
    },
    {
        path: '/messages/sent/all',
        component: React.lazy(() => import('../messages/SentMessages')),
        auth: authRoles.manager,
    },
]

export default messageRoutes
