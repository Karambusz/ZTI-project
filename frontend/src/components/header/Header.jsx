import './Header.scss';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import { logout } from '../../redux/user/user-action';
import { Link } from 'react-router-dom';

  
  
const Header = () => {
	const {isLogged, user} = useSelector(state => state['user']);
	const dispatch = useDispatch();

	const [items, setItems] = useState(['Quizy', 'Stwórz quiz', 'Wyloguj się']);
	const [links, setLinks] = useState(['/quizez', '/quiz/create', '/']);

	const [focused, setFocused] = useState(0);

	useEffect(() => {
		if(!isLogged) {
			setItems(["Rejestracja", "Logowanie"])
			setLinks(["/signup", "/signin"]);
			setFocused(1);
		} else if (isLogged && user['roles'][0] === "ROLE_USER") {
			setItems(['Quizy', 'Wyloguj się'])
			setLinks(['/quizzes', '/']);
			setFocused(0);
		}
		else {
			setItems(['Quizy', 'Stwórz quiz', 'Wyloguj się'])
			setLinks(['/quizzes', '/quiz/create', '/']);
			setFocused(0);
		}
	}, [isLogged])

	const changeMenuItem = (index) => {
		setFocused(index);
	}

	  return (
		<div className='header'>
			<div>
				<Link to='/'>
					<img className='logo' src={process.env.PUBLIC_URL + 'logo.png'} alt="logo"/> 
				</Link>
			</div>
			<div>
				<ul className='header-list'> 
					{items.map((item, index) => {
					const style = focused === index ? 'active' : '';
					if (index === items.length - 1 && isLogged) {
						return (
							<li 
							key={index} 
							className={`header-list-item ${style}`} 
							onClick={() => {
									localStorage.removeItem("user");
									changeMenuItem(index);
									setFocused(1);
									dispatch(logout());		
							}}>{item}</li>
						)
					}
					return (
						<Link key={index} to={`${links[index]}`}>
							<li className={`header-list-item ${style}`} onClick={() => changeMenuItem(index)}>{item}</li>
						</Link>	
					) 
					
				})}
				</ul>
			</div>
		</div>
	  );
};

export default Header;