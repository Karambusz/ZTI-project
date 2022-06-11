import './SignUp.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { postData, validateUsernameField, validatePasswordField, validateEmailField, closeModal, createModalContent, setModalAndLoading} from './../../services/services';



import FormInput from './../form-input';
import CustomButton from './../button';
import Spinner from '../spinner';
import Modal from '../modal/';


const SignUp = () => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState('user')

    const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const [errorUserName, setErrorUserName] = useState({errorState: false, messagge: " (Nie może zawierać spacje! (Dostępne znaki _-))"});
    const [errorEmail, setErrorEmail] = useState({errorState: false, messagge: " (Musi być w postaci *@*.*)"});
    const [errorPassword, setErrorPassword] = useState({errorState: false, messagge: " (Musi zawierać co najmniej 6 znaków)"});
    const [errorConfirmPassword, setErrorConfirmPassword] = useState({errorState: false, messagge: " (Hasło rózni się)"});


    const eye = <FontAwesomeIcon icon={faEye} />;
    const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;


    const validateFields = () => {
        let valid = true;
        if (!validateUsernameField(username)) {
            setErrorUserName({...errorUserName, errorState : true});
            valid = false;
        }
        if (!validatePasswordField(password)) {
            setErrorPassword({...errorPassword, errorState : true});
            valid = false;
        }
        if (!validateEmailField(email)) {
            setErrorEmail({...errorEmail, errorState : true});
            valid = false;
        }
        if (password !== confirmPassword) {
            setErrorConfirmPassword({...errorConfirmPassword, errorState : true});
            valid = false;
        }
        return valid;
    }

    const clearForm = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };

    const handleChange = (event, setter) => {
        const {value} = event.target;
		console.log(value);
        setter(value);
    }

    const clearErrorAfterFocus = (value, setter) => {
        setter({...value, errorState: false});
    }


    const handleSubmit = (event) => {
        event.preventDefault();
		console.log("Submitted");
        setLoading(true);


        const data = {
            username,
            email,
            password,
            roles: [role]
        }

        if (validateFields()) {
            postData(`${process.env.REACT_APP_API_ROOT_URL}/auth/signup`, JSON.stringify(data))
            .then(res => {
				console.log(res.status);
                const {status} = res;
                if (status === 200) {
                    const messages = [];
                    messages.push("Success, now you can sign in and use the site."); 
                    setModalContent(createModalContent("The user has been registered!", messages));

                    clearForm();
                    document.getElementById("create-user-form").reset();
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
                    messages.push("Problem z serwerem, proszę spróbować pózniej"); 
                    setModalContent(createModalContent("Error", messages));

                    setModalAndLoading(true, true, false, setIsModal, setModalError, setLoading);
                }
            })
            .catch(e => console.log(e));
        } else {
            setLoading(false);
        }
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
                Stworzyć konto
        </CustomButton>

    return (
        <div className="sign-up-wrapper">
            <form id="create-user-form" method="post" onSubmit={handleSubmit}>
                <FormInput
                    handleChange={(e) => handleChange(e, setUserName)}
                    clearError={() => clearErrorAfterFocus(errorUserName, setErrorUserName)}
                    error={errorUserName}
                    name="userName"
                    type="text"
                    label="Nazwa użytkownika"
                    value={username}
                    required
                />
                <FormInput
                    handleChange={(e) => handleChange(e, setEmail)}
                    clearError={() => clearErrorAfterFocus(errorEmail , setErrorEmail)}
                    error={errorEmail}
                    name="email"
                    type="text"
                    label="E-mail"
                    value={email}
                    required
                />
                <FormInput
                    handleChange={(e) => handleChange(e, setPassword)}
                    clearError={() => clearErrorAfterFocus(errorPassword ,setErrorPassword)}
                    error={errorPassword}
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    label="Hasło"
                    value={password}
                    i={<i onClick={togglePasswordVisiblity}>{passwordShown ? eyeSlash : eye}</i>}
                    required
                />
                <FormInput
                    handleChange={(e) => handleChange(e, setConfirmPassword)}
                    clearError={() => clearErrorAfterFocus(errorConfirmPassword ,setErrorConfirmPassword)}
                    error={errorConfirmPassword}
                    name="confirmPassword"
                    type={confirmPasswordShown ? "text" : "password"}
                    label="Podaj ponownie hasło"
                    value={confirmPassword}
                    i={<i onClick={toggleConfirmPasswordVisiblity}>{confirmPasswordShown ? eyeSlash : eye}</i>}
                    required
                />
				<div className="radio-wrapper">
					<div>
						<input id='user-radio' type="radio" name="radio-list" value="user" onChange={(e) => handleChange(e, setRole)} checked/>
						<label htmlFor="user-radio">Użytkownik</label>
					</div>
					<div>
						<input  id='admin-radio' type="radio" name="radio-list" value="admin" onChange={(e) => handleChange(e, setRole)}/>
						<label htmlFor="admin-radio">Admin</label>
					</div>
				</div>
                {lastElement}
            </form>
			{modal}
        </div>
    );
}

export default SignUp;