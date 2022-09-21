import React from "react";
import '../styles/sign.css';
import AuthForm from './AuthForm';

function Login ({onLogin}) {
    // Стейты полей в форме авторизации
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
        if (!email || !password) {      //Если поля пустые, прерываем ф-ю и очищаем поля
            return;
        }
        onLogin(email, password);
    }

    return (
        <AuthForm 
            section="login"
            title="Вход"
            submit={handleSubmit}
            onChange={handleChange}
            submitText="Войти"
            emailValue={email}
            passwordValue={password}
        />
    );
}

export default Login;