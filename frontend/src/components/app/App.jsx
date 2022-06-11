import SignUpPage from "../../pages/sign-up-page";
import SignInPage from "../../pages/sign-in-page";
import Header from '../header';
import './App.scss';

const App = () => {
	return (
		<div className="App">
			<Header items={['Home', 'Services', 'About', 'Contact us']}/>
			<div className="content-wrapper">
				<SignUpPage/>
				<SignInPage/>
			</div>
		</div>	
	)
}

export default App;