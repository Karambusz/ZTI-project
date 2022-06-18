import './QuizPage.scss';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../../hooks/http.hooks';
import { useSelector, useDispatch } from 'react-redux';
import {getQuiz} from "./../../redux/quiz/quiz-action";
import { createModalContent, closeModal } from '../../services/services';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Spinner from '../../components/spinner';
import Modal from '../../components/modal';
import CustomButton from '../../components/button';
import CustomDialog from '../../components/dialog';

const QuizPage = () => {
	const startAnswerState = {
		"questionId": null,
		"answers": [
			{
				"answerId": null,
				"correct": null
			}
		]
	}


	const {user} = useSelector(state => state['user']);
	const {quiz} = useSelector(state => state['quiz']);
	const {request} = useHttp();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {quizId} = useParams();
	const [quizLoading, setQuizLoading] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [open, setOpen] = useState(false);

	const [isModal, setIsModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalContent, setModalContent] = useState({});

	const [quizScore, setQuizScore] = useState(0);
	const [quizAnswers, setQuizAnswers] = useState([]);

	useEffect(() => {
		setQuizLoading(true);
		request(`${process.env.REACT_APP_API_ROOT_URL}/quiz/${quizId}`, 'GET', null, user.accessToken)
			.then(res => {
				if (res.status !== 400) {
					console.log(res);
					dispatch(getQuiz(res));
					createDefaultAnswersState(res);
					setQuizLoading(false);
				} else {
					navigate("/");
				}
			})
			.catch(e => console.log(e))	
	}, [quizId]);

	const createDefaultAnswersState = useCallback((quiz) => {
		let answersToSet = [];
		quiz['questions'].forEach(item => {
			const {id, answers} = item;
			let itemToAdd = {...startAnswerState};
			const copyOfAnswers = createDefaultAnswersObject(answers);
			itemToAdd["questionId"] = id;
			itemToAdd["answers"] = copyOfAnswers;
			answersToSet.push(itemToAdd);
		});
		setQuizAnswers(answersToSet);
	}, []);


	const createDefaultAnswersObject = (answers) => {
		let copyOfAnswers = [];
		answers.forEach(element => {
			const {id} = element;
			const answerObj = {
				"answerId": id,
				"correct": null
			}
			copyOfAnswers.push(answerObj);
		});
		return copyOfAnswers;
	}

	const renderQuestions = useCallback((quiz, quizAnswers, isFinished) => {
		if (quiz === null) {
			return null
		} else {
			// console.log("render " + quiz);
			return quiz['questions'].map((item, idx) => {
				const {question, answers} = item;
				return (
					<div key={idx} className="question-wrapper">
						<Typography className='question-header' sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
							{question}
						</Typography>
						<FormGroup>
							{isFinished ? answers.map((answer, index) => {
								const answerCorrect = <FontAwesomeIcon icon={faCheck} />;
								const answerFalse = <FontAwesomeIcon icon={faXmark} />;
								const customLabel = answer['correct'] ? (
									<span>
										{answer.answer}
										{answerCorrect}
									</span>
								)
								:
								(
									<span>
										{answer.answer}
										{answerFalse}
									</span>
								)
								return (
									<FormControlLabel key={answer['id']} control={<Checkbox disabled />} label={customLabel} />
								)
							}) :
							answers.map((answer, index) => {
								return (
									<FormControlLabel key={answer['id']} control={<Checkbox onClick={() => handleAnswers(idx, index, quizAnswers)} />} label={answer.answer} />
								)
							}) 
							}							
						</FormGroup>
					</div>
				)
			});
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const correctAnswerNumbers = getNumberOfCorrectAnswers(quiz['questions']);
		setQuizScore(((countQuizScore(correctAnswerNumbers, quiz['questions'], quizAnswers) / quiz['questions'].length) * 100).toFixed(2));
		setOpen(true);
	}

	const getNumberOfCorrectAnswers = (questions) => {
		const correctAnswerNumbersMap = new Map();
		questions.forEach(question => {
			const numberOfCorrectAnswers = question['answers'].filter(answer => answer['correct'] === true).length
			correctAnswerNumbersMap.set(question['id'], numberOfCorrectAnswers);
		})
		return correctAnswerNumbersMap;
	}

	const countQuizScore = (correctAnswerNumbers, questions, userAnswers) => {
		let userScore = 0;
		userAnswers.forEach((item, index) => {
			let userScoreForQuestion = 0;
			item['answers'].forEach((userAnswer, answerIndex) => {
				const answerScore = getAnswerScore(userAnswer['correct'], questions[index]['answers'][answerIndex]['correct']);		
				userScoreForQuestion += answerScore;		
			})
			if (userScoreForQuestion < 0)
				userScoreForQuestion = 0;
			userScore += userScoreForQuestion / correctAnswerNumbers.get(item['questionId']);
			console.log(userScore);
		});
		return userScore;
	}

	const getAnswerScore = (correctAnswer, userAnswer) => {
		if (correctAnswer === false && userAnswer === null) {
			return 0;
		} else if (correctAnswer === false && userAnswer === true) {
			return -1;
		} else if (correctAnswer === true && userAnswer === false) {
			return -1;
		} else if (correctAnswer === true && userAnswer === true) {
			return 1;
		} else if (correctAnswer === true && userAnswer === null) {
			return 0;
		} else if (correctAnswer === false && userAnswer === false) {
			return 0;
		} else {
			return 0;
		}
	}

	const handleAnswers = useCallback((questionIndex, answerIndex, quizAnswers) => {
		let quizAnswersCopy = [...quizAnswers];
		let quizAnswersItemCopy = {...quizAnswers[questionIndex]};
		let answersCopy = [...quizAnswersItemCopy['answers']];
		let answerToChange = {...answersCopy[answerIndex]};
		answerToChange['correct'] = !answerToChange['correct'];
		answersCopy[answerIndex] = answerToChange;
		quizAnswersItemCopy['answers'] = answersCopy;
		quizAnswersCopy[questionIndex] = quizAnswersItemCopy;
		setQuizAnswers(quizAnswersCopy);
	}, []);

	const sendQuiz = (quizScore) => {
		request(`${process.env.REACT_APP_API_ROOT_URL}/quiz/${user.id}/${quizId}`, 'POST', null, user.accessToken)
		.then(res => {
			if (res) {
				console.log(res);
				const messages = [];
				messages.push(`Your final score is ${quizScore} %`); 
				setModalContent(createModalContent("You finish the quiz!", messages));
				setIsModal(true);
				setModalError(false);
			} else {
				navigate("/");
			}
		})
		.catch(e => console.log(e))
	}

	const modal = isModal ? <Modal 
		modalContent = {modalContent}
		modalError={modalError}
		close={() => closeModal(setIsModal)}/> : null 
	
	return (
		<div className="questions-wrapper">
			<form onSubmit={handleSubmit}>
				{quizLoading ?     <div className="spinner-wrapper">
        							<Spinner/>
    								</div> : renderQuestions(quiz, quizAnswers, isFinished)}
				{quizLoading ? <div className="spinner-wrapper">
        							<Spinner/>
    								</div> : 
				<CustomButton
					type="submit"
					disabled={isFinished}
					additionalClass="submit-quiz">
					Wyślij quiz
				</CustomButton>}
				
			</form>		
			{
				<CustomDialog
					title="Are you sure you want to finish the quiz?"
					mainText="When you finish the quiz you won't be able to answer the questions"
					agreeButtonText="Finish the quiz"
					disagreeButtonText="Continue the quiz"
					dialogOpen={open}
					dialogOpenSetter={setOpen}
					value={isFinished}
					setter={setIsFinished}
					additionalFunction={() => sendQuiz(quizScore)}					
				/>
			}
			{modal}	
		</div>

	)
}

export default QuizPage;