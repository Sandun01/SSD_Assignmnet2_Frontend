import { authRoles } from './auth/authRoles'

export const navigation = [
    {
        name: 'Dashboard',
        path: '/dashboard/',
        icon: 'dashboard',
        auth: authRoles.worker,
    },
    {
        name: 'Messaging',
        path: '/messages/new',
        icon: 'message',
        auth: authRoles.worker,
        children: [
            {
                name: 'New Message',
                iconText: 'N',
                icon: 'telegram',
                path: '/messages/new',
                auth: authRoles.worker,
            },
            {
                name: 'Inbox',
                iconText: 'R',
                icon: 'drafts',
                path: '/messages/received/all',
                auth: authRoles.worker,
            },
            {
                name: 'Sentbox',
                iconText: 'S',
                icon: 'send',
                path: '/messages/sent/all',
                auth: authRoles.worker,
            },
        ],
    },
    {
        name: 'Documents',
        path: '/documents/',
        icon: 'description',
        auth: authRoles.manager,
        children: [
            {
                name: 'Submit Document',
                iconText: 'N',
                icon: 'post_add',
                path: '/documents/new',
                auth: authRoles.manager,
            },
            {
                name: 'View Documents',
                iconText: 'A',
                icon: 'file_copy',
                path: '/documents/all',
                auth: authRoles.manager,
            },
        ],
    },
    {
        name: 'Users',
        path: '/users/',
        icon: 'people',
        auth: authRoles.sa,
        children: [
            {
                name: 'Add New User',
                iconText: 'N',
                icon: 'person_add',
                path: '/users/new',
                auth: authRoles.sa,
            },
            {
                name: 'View Users',
                iconText: 'A',
                icon: 'people_alt',
                path: '/users/all',
                auth: authRoles.sa,
            },
        ],
    },
]
