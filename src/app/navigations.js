import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/',
        icon: 'dashboard',
        auth: authRoles.worker,
    },
   
    {
        name: 'Documents',
        path: '/bank/',
        icon: 'description',
        auth: authRoles.manager,
        children: [
            {
                name: 'Submit Document',
                iconText: 'N',
                icon: 'post_add',
                path: '/bank/documents/new',
            },
            {
                name: 'View Documents',
                iconText: 'A',
                icon: 'assessment',
                path: '/bank/documents/all',
            },
        ],
    },
    {
        name: 'Messaging',
        path: '/bank/learning',
        icon: 'account_balance',
        auth: authRoles.worker,
    },
]
