import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import quizReducer from "./quiz/quiz-reducer";

export default combineReducers({
	user: userReducer,
	quiz: quizReducer
})