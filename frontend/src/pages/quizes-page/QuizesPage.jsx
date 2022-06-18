import './QuizesPage.scss';
import QuizCard from '../../components/quiz-card/QuizCard';
import randomColor from "randomcolor";
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/spinner';
import {getQuizzes} from "./../../redux/quiz/quiz-action";
import { useHttp } from '../../hooks/http.hooks';
import { Link } from 'react-router-dom';

const QuizesPage = () => {
	const {user} = useSelector(state => state['user']);
	const {quizzes} = useSelector(state => state['quiz']);
	const [quizLoading, setQuizLoading] = useState(false);
	const dispatch = useDispatch();
	const {request} = useHttp();
	

	useEffect(() => {
		setQuizLoading(true);
		request(`${process.env.REACT_APP_API_ROOT_URL}/quiz/quizes`, 'GET', null, user.accessToken)
			.then(res => {
				console.log(res);
				dispatch(getQuizzes(res));
				setQuizLoading(false);
			})
			.catch(e => console.log(e))	
	}, [dispatch]);

	const parseCategoryColor = (res) => {
		const arrayOfCategory = res.map(item => item['categoryName']);		
		const categorySet = new Set(arrayOfCategory);
		const categoryColor = [...categorySet].map(item => {
			return {
				category: item,
				color: randomColor({
					luminosity: 'light',
					alpha: 0.4
				 })
			}
		})
		return categoryColor;
	}

	const generateQuizCards = useCallback((quizzes) => {
		if (quizzes === null) {
			return null;
		}
		const categoriesColor = parseCategoryColor(quizzes);
		quizzes.sort(function (a, b) {
			if (a.categoryName > b.categoryName) return 1;
			if (a.categoryName < b.categoryName) return -1;
			return 0;
		});
		return quizzes.map((quiz, index) => {
			const {quizName, categoryName, questions, id} = quiz;
			const category = categoriesColor.filter(item => item["category"] === quiz.categoryName);
			const cardColor = category[0]['category'] === quiz.categoryName ? category[0]['color'] : "rgb(202, 130, 255, 0.4)";

			return (
				<Link key={index} to={`/quiz/${id}`}>
					<QuizCard
						color={cardColor}
						quizname={quizName}
						categoryName={categoryName}
						questionCount={questions.length}/>
				</Link>
			)
		})
	}, [])

	return (
		<div className="quizes-wrapper">
			{quizLoading ?                 
				<div className="spinner-wrapper">
					<Spinner/>
				</div> :
				generateQuizCards(quizzes)}
		</div>
	)
}

export default QuizesPage;