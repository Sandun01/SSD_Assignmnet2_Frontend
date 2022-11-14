import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { MatxLoading } from 'app/components'
import { BACKEND_API_ENDPOINT } from '../views/utilities/ApiRoutes'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    // console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (usernameOrEmail, password) => {
        try {
            const response = await axios.post(
                BACKEND_API_ENDPOINT + 'users/login',
                {
                    usernameOrEmail,
                    password,
                }
            )

            if (response.status == 200) {
                const accessToken = response.data.token
                const user = {
                    _id: response.data._id,
                    name: response.data.name,
                    type: response.data.type,
                    email: response.data.email,
                    username: response.data.username,
                }
                setSession(accessToken)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user,
                    },
                })
            }
        } catch (error) {
            console.log(error)
            throw new Error('Invalid Credentials!')
        }
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get(
                        BACKEND_API_ENDPOINT + 'users/token/' + accessToken
                    )

                    if (
                        response.data &&
                        response.data.success &&
                        response.data.user
                    ) {
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                user: response.data.user,
                            },
                        })
                    } else {
                        logout()
                    }
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
