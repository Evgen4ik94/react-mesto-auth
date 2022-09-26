import React from "react";
import logo from "../images/header-logo.svg"; //Импортируем логотип
import { Link, Route } from 'react-router-dom';

function Header({ userEmail, onLogOut }) { //Создаем компонент Header
  return (  //Вставляем разметку шапки на страницу
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Route path={'/sign-up'}>
        <Link to='/sign-in' className="header__auth">
          Войти
        </Link>
      </Route>

      <Route path={'/sign-in'}>
        <Link to='/sign-up' className="header__auth">
          Регистрация
        </Link>
      </Route>

      <Route exact path={'/'}>
        <div className="header__profile">
          <p className="header__email"></p>
          <Link to="/sign-in" className="header__sign-out" onClick={onLogOut}>
            Выйти
          </Link>
        </div>
      </Route>

    </header>
  );
}

export default Header;
