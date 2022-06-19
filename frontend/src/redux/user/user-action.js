import {UserActionTypes} from './user-type';

export const setUser = (user) => {
    return {
        type: UserActionTypes.SET_USER,
        payload: user
    }
}

export const updateUserQuizzes = (quizzes) => {
    return {
        type: UserActionTypes.UPDATE_USER_QUIZZES,
        payload: quizzes
    }
}

export const logout = () => {
    return {
        type: UserActionTypes.LOGOUT,
    }
}