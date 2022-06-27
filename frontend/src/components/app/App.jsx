import './App.scss';
import { HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import SignUpPage from "../../pages/sign-up-page";
import SignInPage from "../../pages/sign-in-page";
import Header from '../header';
import QuizCreationPage from "../../pages/quiz-creation-page";
import QuizesPage from '../../pages/quizes-page/';
import QuizPage from '../../pages/quiz-page';


const App = () => {
	const {isLogged} = useSelector(state => state['user']);


	return (
		<Router>
			<div className="App">
				<Header/>
				<div className="content-wrapper">	
					<Routes>			
						<Route  path="/" element={isLogged ?  <QuizesPage/> : <SignInPage/>}/>	
						<Route  path="/signup" element={isLogged ? <Navigate replace to="/" /> : <SignUpPage/>  }/>	
						<Route  path="/signin" element={isLogged ? <Navigate replace to="/" /> : <SignInPage/>}/>
						<Route  path="/quiz/create" element={isLogged ? <QuizCreationPage/> : <Navigate replace to="/" />}/>
						<Route  path="/quizzes" element={isLogged ? <QuizesPage/> : <Navigate replace to="/" />}/>	
						<Route path="/quiz/:quizId" element={isLogged ? <QuizPage/> : <Navigate replace to="/" />} />
					</Routes>
				</div>
			</div>	
		</Router>
	)
}

export default App;