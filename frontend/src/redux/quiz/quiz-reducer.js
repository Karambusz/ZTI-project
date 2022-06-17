import { QuizActionTypes } from "./quiz-type";

const initialState =  {
    quizzes: null,
    quiz: null
}

const quizReducer = (state = initialState, action) => {
    switch(action.type) {
        case QuizActionTypes.GET_QUIZZES: 
            return {
                ...state,
                quizzes: action.payload
            }
        case QuizActionTypes.GET_QUIZ: 
        return {
            ...state,
            quiz: action.payload
        }
        default:
            return state
    }
}

export default quizReducer;