import './Header.scss';
import {useState} from 'react';

  
  
const Header = ({items}) => {
	const [focused, setFocused] = useState(0);

	const changeMenuItem = (index) => {
		setFocused(index);
	}

	  return (
		<div className='header'>
			<ul className='header-list'> 
				{items.map((item, index) => {
				const style = focused === index ? 'active' : '';
				return <li key={index} className={`header-list-item ${style}`} onClick={() => changeMenuItem(index)}>{item}</li>;
			})}
			</ul>
		</div>
	  );
};

export default Header;