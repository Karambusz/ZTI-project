import { QuizActionTypes } from "./quiz-type";

export const getQuizzes = (quizzes) => {
    return {
        type: QuizActionTypes.GET_QUIZZES,
        payload: quizzes
    }
}

export const getQuiz = (quiz) => {
    return {
        type: QuizActionTypes.GET_QUIZ,
        payload: quiz
    }
}