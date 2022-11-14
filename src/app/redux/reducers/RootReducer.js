import { combineReducers } from 'redux'
import NavigationReducer from './NavigationReducer'

const RootReducer = combineReducers({
    navigations: NavigationReducer,
})

export default RootReducer
