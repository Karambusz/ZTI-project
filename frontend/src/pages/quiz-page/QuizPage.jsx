import './QuizPage.scss';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hooks';
import { useSelector, useDispatch } from 'react-redux';
import {getQuiz} from "./../../redux/quiz/quiz-action";
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

const QuizPage = () => {

	
	const {user} = useSelector(state => state['user']);
	const {quiz} = useSelector(state => state['quiz']);
	const [quizLoading, setQuizLoading] = useState(false);
	const {request} = useHttp();
	const dispatch = useDispatch();
	const {quizId} = useParams();

	useEffect(() => {
		setQuizLoading(true);
		request(`${process.env.REACT_APP_API_ROOT_URL}/quiz/${quizId}`, 'GET', null, user.accessToken)
			.then(res => {
				console.log(res);
				dispatch(getQuiz(res));
				setQuizLoading(false);
			})
			.catch(e => console.log(e))	
	}, [quizId]);

	const renderQuestions = () => {
		if (quiz === null) {
			console.log("null");
			return null
		} else {
			console.log("render " + quiz);
			return quiz['questions'].map((item, idx) => {
				const {question, answers} = item;
				return (
					<div key={idx} className="question-wrapper">
						<Typography className='question-header' sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
							{question}
						</Typography>
						<FormGroup>
							{answers.map((answer, index) => {
								return (
									<FormControlLabel key={index} control={<Checkbox />} label={answer.answer} />
								)
							})}							
							{/* // <FormControlLabel control={<Checkbox />} label="Disabled" />
							// <FormControlLabel control={<Checkbox />} label="Disabled" /> */}
						</FormGroup>
					</div>
				)
			});
		}
	}
	
	return (
		<div className="questions-wrapper">
			<form >
				{quizLoading ? null : renderQuestions()}
			</form>			
		</div>
	)
}

export default QuizPage;