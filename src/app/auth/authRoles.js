export const authRoles = {
    sa: ['Admin'], // Only Super Admin has access
    manager: ['Admin', 'Manager'], // Only SA & Manager has access
    worker: ['Admin', 'Manager', 'Worker'], // Only SA & Manager & Worker has access(Auth User)
}

