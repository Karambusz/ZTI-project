import './QuizCreation.scss';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import FormInput from '../form-input';
import Select from 'react-select'
import Modal from '../modal';
import Typography from '@mui/material/Typography';
import QuizCard from '../quiz-card/QuizCard';
import { getData, fetchWithAuthorization, closeModal, createModalContent, setModalAndLoading } from '../../services/services';
import Question from '../question/Question';
import CustomButton from '../button';
import Spinner from '../spinner';



const QuizCreation = () => {
	const startAnswer = {
		"answer": "",
		"isCorrect": false
	}
	const [questionText, setQuestionText] = useState([""]);
	const [answers, setAnswers] = useState([[startAnswer, startAnswer]]);
	const [quizname, setQuizName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [errorQuizName, setErrorQuizName] = useState({errorState: false, messagge: " (Pole nie może być puste)"});
	const [numberOfQuestions, setNumberOfQuestions] = useState([0]);
	const [modalContent, setModalContent] = useState({});
	const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [modalError, setModalError] = useState(false);

	const {user} = useSelector(state => state['user']);

	const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

	useEffect(() => {
		console.log("useEffect category fetching");
        getData(`${process.env.REACT_APP_API_ROOT_URL}/category`)
            .then(categories => {
				setCategories(categories);
				if (categories.length >0) {
					const name = categories[0]['name'];
					setCategory({value: name, label: name});
				}
			});
    }, []);


	const handleCategory = (selectedOptions) => {
        setCategory(selectedOptions);
    }

	const renderCategories = () => {
        return categories.map(({name}) => {
            return { value: name, label: name }
        })
    }

	const handleChange = (event, setter) => {
        const {value} = event.target;
		console.log(value);
        setter(value);
    }

	const clearErrorAfterFocus = (value, setter) => {
        setter({...value, errorState: false});
    }

	const generateQuestionFields = () => {
		return numberOfQuestions.map((component, index) => {
			return (
				<Question
					questionTextSetter={setQuestionText}
					answerSetter={setAnswers}
					key={index} 
					questionText={questionText}
					answers={answers}
					questionIndex={index}/>
			)
		})
	}

	const addQuestion = () => {
		let items = [...numberOfQuestions];
		let copyOftext = [...questionText];
		let copyOfAnswers = [...answers];
		items.push(numberOfQuestions[numberOfQuestions.length-1] + 1);		
		copyOfAnswers.push([startAnswer, startAnswer])
		copyOftext.push("")
		setNumberOfQuestions(items);
		setAnswers(copyOfAnswers);
		setQuestionText(copyOftext);
	}

	const convertAnswersAndQuestionRequestDto = () => {
		return numberOfQuestions.map((element, index) => {
			return {
				question: questionText[index],
				answers: answers[index]
			}
		})
	}

	const modal = isModal ? <Modal 
    	modalContent = {modalContent}
    	modalError={modalError}
    	close={() => closeModal(setIsModal)}/> : null

	const lastElement = loading ?                 
    <div className="spinner-wrapper">
        <Spinner/>
    </div> :
	<CustomButton 
		type="submit"
		additionalClass="submit">
		Stwórz quiz
	</CustomButton>

	const handleSubmit = (event) => {
        event.preventDefault();
		console.log("Submitted");
        setLoading(true);

		const quizCategory = categoryName !== '' ? categoryName : category['value'];


        const data = {
            quizName: quizname,
		    categoryName: quizCategory,
			questions: convertAnswersAndQuestionRequestDto()
				
        }

		console.log(JSON.stringify(data));

		fetchWithAuthorization(`${process.env.REACT_APP_API_ROOT_URL}/quiz/${user['id']}/create`, JSON.stringify(data), user.accessToken, "POST")
		.then(res => {
			console.log(res);
			console.log(res.status);
			const {status} = res;
			if (status === 200) {
				const messages = [];
				messages.push(res['message']); 
				setModalContent(createModalContent("Success", messages));
				document.getElementById("create-quiz-form").reset();
				setModalAndLoading(true, false, false, setIsModal, setModalError, setLoading);
			
			} else if (status === 400 || status === 404) {
				const messages = []; 
				for (const key in res) {
					if (key !== 'status') {
						messages.push(res[key]);
					}
				}
				setModalContent(createModalContent("Error", messages));

				setModalAndLoading(true, true, false, setIsModal, setModalError, setLoading);
			} else if (status === 500) {
				const messages = [];
				messages.push("Server error, please try later!"); 
				setModalContent(createModalContent("Error", messages));

				setModalAndLoading(true, true, false, setIsModal, setModalError, setLoading);
			}
		})
		.catch(e => console.log(e));
    }

	return (
		<div className="quiz-wrapper">
			<div className="quiz-creation-wrapper">
				<Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
					Dodaj quiz: 
				</Typography>
				<form id="create-quiz-form" onSubmit={handleSubmit} method="post">
					<FormInput
						handleChange={(e) => handleChange(e, setQuizName)}
						clearError={() => clearErrorAfterFocus(errorQuizName, setErrorQuizName)}
						error={errorQuizName}
						name="quizName"
						type="text"
						label="Nazwa quizu"
						value={quizname}
						required
					/>
					<Select
						styles={{
							control: (provided, state) => ({
								...provided,
								boxShadow: "none",
								border: state.isFocused && "none",
							})}}
						value={category}
						onChange={handleCategory}
						placeholder={"Kategoria"}
						className='react-select-container'
						classNamePrefix="react-select"
						options={renderCategories()} />
					<p className='category-text'>
						Brak potrzebnej kategorii? Wpisz swoją nawzwę:
					</p>
					<FormInput
						handleChange={(e) => handleChange(e, setCategoryName)}
						clearError={null}
						error={null}
						name="userName"
						type="text"
						label="Nowa kategoria"
						value={categoryName}
					/>
					<Typography className='questions-header' sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
						Pytania:
					</Typography>
					{generateQuestionFields()}
					<CustomButton
						onClick={addQuestion}
						additionalClass="question-addition">
							Dodaj nowe pytanie
					</CustomButton>
					{lastElement}
				</form>
			</div>
			<div className="quiz-info">
				<QuizCard
					color={"rgb(202, 130, 255, 0.4)"}
					quizname={quizname}
					categoryName={category}
					questionCount={numberOfQuestions.length}/>
			</div>
			{modal}
		</div>

	)
}

export default QuizCreation;