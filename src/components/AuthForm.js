import React from "react";
import "../styles/sign.css";

// Компонент формы для регистрации и авторизации
function AuthForm({ section, title, submit, emailValue, passwordValue, onChange, submitText }) {
    return (
        <section className={section}>
            <div className="sign">
                <h2 className="sign__welcome">{title}</h2>
                <form className="sign__form" onSubmit={submit}>
                    <input
                        className="sign__item"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Введите E-mail"
                        value={emailValue}
                        onChange={onChange}
                        required
                    />
                    <input
                        className="sign__item"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        value={passwordValue}
                        onChange={onChange}
                        autoComplete="off"
                        minLength="5"
                        required
                    />
                    <button className="sign__button" type="submit">
                        {submitText}
                    </button>
                </form>
            </div>
        </section>
    );
}
export default AuthForm;