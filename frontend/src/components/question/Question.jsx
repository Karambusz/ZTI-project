import './Question.scss';
import { useState, useEffect } from 'react';
import FormInput from '../form-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomButton from '../button';

const Question = ({questionIndex, questionText, answers, answerSetter, questionTextSetter}) => {
	const startAnswer = {
		"answer": "",
		"isCorrect": false
	}
	const [text, setText] = useState(questionText[questionIndex]);
	const [questionAnswers, setQuestionAnswers] = useState(answers[questionIndex]);

	const generateQuestion = () => {
		return questionAnswers.map((answer, index) => {
			return ( 
				<div key={index} className='question-wrapper'>
					<FormInput
						handleChange={(e) => handleAnswerTextChange(e, questionAnswers, index)}
						clearError={null}
						error={null}
						name={`question-${index}`}
						type="text"
						label={`Odpowiedź ${index + 1}`}
						value={answer['answer']}
						required
					/>
					<div className="radio-wrapper">
						<div style={{paddingTop: "50px"}}>
							<input id={`yes-answer-radio-${questionIndex}-${index}`}  type="radio" name={`radio-list-${questionIndex}-${index}`} value={true} onChange={(e) => handleAnswerRadioChange(e, questionAnswers, index)}/>
							<label htmlFor={`yes-answer-radio-${questionIndex}-${index}`}>Tak</label>
						</div>
						<div style={{paddingTop: "50px"}}>
							<input id={`no-answer-radio-${questionIndex}-${index}`} type="radio" name={`radio-list-${questionIndex}-${index}`} value={false} onChange={(e) => handleAnswerRadioChange(e, questionAnswers, index)} />
							<label htmlFor={`no-answer-radio-${questionIndex}-${index}`}>Nie</label>
						</div>
					</div>
				</div>
			)
		});
	}

	const handleChange = (event, setter) => {
        const {value} = event.target;
		let copyOftext = [...questionText];		
		copyOftext[questionIndex] = value;
		questionTextSetter(copyOftext);
        setter(value);
    }

	const handleAnswerTextChange = (event, answers, index) => {
		handleAnswerChange(event, answers, index, "answer")
	}

	const handleAnswerRadioChange = (event, answers, index) => {
		handleAnswerChange(event, answers, index, "isCorrect")
	}

	const handleAnswerChange = (event, arganswers, index, propertyName) => {
		let {value} = event.target;
		// if (propertyName === "isCorrect") {
		// 	value = value === "true" ? true : false; 
		// }
		let items = [...arganswers];
		let item = {...items[index]};
		item[propertyName] = value;
		items[index] = item;

		let copyOfAnswers = [...answers];
		let copyOfAnswersItems = [...copyOfAnswers[questionIndex]];
		let answerItem = {...copyOfAnswersItems[index]};
		answerItem[propertyName] = value;
		copyOfAnswersItems[index] = item;
		copyOfAnswers[questionIndex] = copyOfAnswersItems;
		setQuestionAnswers(items);
		answerSetter(copyOfAnswers);
	}

	const addAnswerField = () => {
		let items = [...questionAnswers];
		let copyOfAnswers = [...answers];
		items.push(startAnswer);		
		copyOfAnswers[questionIndex] = items;
		setQuestionAnswers(items);
		answerSetter(copyOfAnswers);
	}

	const deleteLastAnswerField = () => {
		if (questionAnswers.length !== 1) {
			let copyOfAnswers = [...answers];
			copyOfAnswers[questionIndex] = copyOfAnswers[questionIndex].slice(0, copyOfAnswers[questionIndex].length-1)
			setQuestionAnswers(questionAnswers.slice(0, questionAnswers.length-1));
			answerSetter(copyOfAnswers);
		}
	}





	return (
		<>
		<FormInput
			handleChange={(e) => handleChange(e, setText)}
			clearError={null}
			error={null}
			name="question"
			type="text"
			label={`Pytanie ${questionIndex + 1}`}
			value={text}
			required
		/>
		{generateQuestion()}
		<div>
			<CustomButton
				onClick={addAnswerField} 
				additionalClass="question-field-addition">
					<FontAwesomeIcon icon={faAdd} />
			</CustomButton>
			<CustomButton 
				type="button"
				onClick={deleteLastAnswerField}
				additionalClass="question-field-deletion">
					<FontAwesomeIcon icon={faXmark} />
			</CustomButton>
		</div>
		</>
	)
}

export default Question;