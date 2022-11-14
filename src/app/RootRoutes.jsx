import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import documentRoutes from './views/screens/documents/DocumentRoutes'
import messageRoutes from './views/screens/messages/MessageRoutes'
import userRoutes from './views/screens/users/UserRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...documentRoutes,
    ...messageRoutes,
    ...userRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
