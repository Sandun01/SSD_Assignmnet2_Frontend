import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import AppContext from '../contexts/AppContext'
import useAuth from 'app/hooks/useAuth'

const getUserRoleAuthStatus = (pathname, user, routes) => {
    const matched = routes.find((r) => r.path === pathname)

    if (user != null) {
        const authenticated =
            matched && matched.auth && matched.auth.length
                ? matched.auth.includes(user.type)
                : true
        // console.log(matched, user.type)
        return authenticated
    }
    return false
}

const AuthGuard = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    // console.log('user', user, isAuthenticated)

    const [previousRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()

    const { routes } = useContext(AppContext)
    const isUserRoleAuthenticated = getUserRoleAuthStatus(
        pathname,
        user,
        routes
    )
    let authenticated = isAuthenticated && isUserRoleAuthenticated

    useEffect(() => {
        if (previousRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previousRoute])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Redirect
                to={{
                    pathname: '/session/signin',
                    state: { redirectUrl: previousRoute },
                }}
            />
        )
    }
}

export default AuthGuard