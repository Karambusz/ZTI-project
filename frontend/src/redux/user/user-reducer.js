import {UserActionTypes} from './user-type';

const loggedUser = JSON.parse(localStorage.getItem("user"));

const initialState =  loggedUser ? {
    user: loggedUser,
    isLogged: true
} :
{
    user: null,
    isLogged: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserActionTypes.SET_USER: 
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }
        case UserActionTypes.LOGOUT: 
            return {
                ...state,
                isLogged: false,
                user: null,
                acceptedProblems: []
            }
        default:
            return state
    }
}

export default userReducer;