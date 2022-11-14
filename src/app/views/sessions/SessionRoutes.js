import NotFound from './NotFound'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'

const sessionRoutes = [
    {
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
