import "./SignIn.scss";

import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './../../redux/user/user-action';
import { useNavigate } from "react-router-dom";

import CustomButton from './../button';
import Spinner from '../spinner';
import Modal from '../modal';
import FormInput from './../form-input';
import { postData,  validatePasswordField, validateEmailField, closeModal, createModalContent, setModalAndLoading } from './../../services/services';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, isLogged} = useSelector(state => state['user']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState({errorState: false, messagge: " (Musi być w postaci *@*.*)"});
    const [errorPassword, setErrorPassword] = useState({errorState: false, messagge: " (Musi zawierać co najmniej 6 znaków)"});

    const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalContent, setModalContent] = useState({});


    const validateFields = () => {
        let valid = true;
        if (!validatePasswordField(password)) {
            setErrorPassword({...errorPassword, errorState : true});
            valid = false;
        }
        if (!validateEmailField(email)) {
            setErrorEmail({...errorEmail, errorState : true});
            valid = false;
        }
        return valid;
    }

    const handleChange = (event, setter) => {
        const {value} = event.target;
        setter(value);
    }

    const clearErrorAfterFocus = (value, setter) => {
        setter({...value, errorState: false});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            email,
            password
        }
        
        if (validateFields()) {
            postData(`${process.env.REACT_APP_API_ROOT_URL}/auth/signin`, JSON.stringify(data))
            .then(res => {
				if (res && res.id && !user && !isLogged) {
					dispatch(setUser(res))
					localStorage.setItem("user", JSON.stringify(res));
				}
            })
            .catch(e => {
				console.log(e);
				const messages = [];
				messages.push("No user in the database, please check your email and password and try again or create a new account"); 
				setModalContent(createModalContent("Error", messages));

				setModalAndLoading(true, true, false, setIsModal, setModalError, setLoading);
			});
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
            Zaloguj się
    </CustomButton>

    return (
        <div className="sign-in-wrapper">
            <form id="login-user-form" method="post" onSubmit={handleSubmit}>
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
                    type="password"
                    label="Hasło"
                    value={password}
                    required
                    autoComplete="on"
                />
                {lastElement}
            </form>
            {modal}
            {isLogged ? navigate("/") : null}
        </div>
    )
}

export default SignIn;