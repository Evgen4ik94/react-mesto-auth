import React from "react";
import "../styles/sign.css";
import AuthForm from "./AuthForm";
import { Link } from 'react-router-dom';

function Register ({ onRegister }) {  //Создаем компонент формы регистрации
    // Стейты полей в форме регистрации
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChange(evt) {
        if (evt.target.name === 'email') {
            setEmail(evt.target.value);
        } else if (evt.target.name === 'password') {
            setPassword(evt.target.value);
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <>
            <AuthForm 
                section="register"
                title="Регистрация"
                emailValue={email}
                passwordValue={password}
                submit={handleSubmit}
                onChange={handleChange}
                submitText="Зарегистрироваться"
            />
            <div className="sign__sign-in">
                <Link to="sign-in" className="sign__login-link">
                    Уже зарегистрированы? Войти.
                </Link>
            </div>
        </>
    )
}

export default Register;