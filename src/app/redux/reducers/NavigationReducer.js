import { navigation } from 'app/navigation'
import { SET_USER_NAVIGATION } from '../actions/NavigationAction'

const initialState = [...navigation]

const NavigationReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAVIGATION: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default NavigationReducer
