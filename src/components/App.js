import React, { useState, useEffect } from 'react'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as ApiAuth from '../utils/ApiAuth';
import NotFound from './NotFound';


function App() {

  // СТЕЙТЫ
  // Стейты, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpenClose] = useState(false); //Стейт попапа ред. профиля
  const [isAddCardPopupOpen, setIsAddCardPopupOpenClose] = useState(false); //Стейт попапа добавления карточки
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = useState(false); //Стейт попапа изменения аватара
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false); //Стейт попапа удаления карточки

  const [selectedCard, setSelectedCard] = useState({ // Стейт, отвечающий за открытие нужной карточки
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = useState({}); //Стейт данных текущего пользователя
  const [isImagePopupOpen, setImagePopupOpen] = useState(false); //Стейт попапа карточки
  const [cards, setCards] = useState([]); // Стейт, отвечающий за состояние cards
  const [toDeleteCard, setToDeleteCard] = useState({}); // Стейт, отвечающий за подготовку к удалении карточки

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  //===========//

  //=== API ЗАПРОСЫ ===//
  //Эффект, отвечающий за запрос на отображение карточек и информации пользователя
  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  // Эффект проверяющий токен при загрузки страницы, чтобы не обрывало сессию при перезагрузке страницы
  useEffect(() => {
    checkToken();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);


  // ===== Функции-обработчики для открытия попапов
  function handleEditProfileClick() { //Открытие попапа ред. профиля по клику (меняем состояние на true)
    setIsEditProfilePopupOpenClose(true);
  }

  function handleAddPlaceClick() { //Открытие попапа добавления карточки по клику (меняем состояние на true)
    setIsAddCardPopupOpenClose(true);
  }

  function handleEditAvatarClick() { //Открытие попапа ред. аватара по клику (меняем состояние на true)
    setEditAvatarPopupOpenClose(true);
  }

  function handleCardDeleteClick(toDeleteCard) { //Открытие попапа удаления карточки
    // Отмечаем id карточки
    setToDeleteCard(toDeleteCard);
    // Передаем открытие попапа
    setIsDeleteCardPopupOpen(true);
  }

  function handleImagePopupOpen(card) { //Открытие попапа карточки по клику (меняем состояние на true)
    setSelectedCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }

  // ===== Функция-обработчик для закрытия всех попапов ===== //
  // Закрываем попапы (изменяем открытое состояние с true на false) и очищаем поля
  function closeAllPopups() {
    setIsEditProfilePopupOpenClose(false);
    setIsAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setIsDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }

  //Добавим функцию лайка
  function handleLikeClick (card) {
    //Проверяем, есть ли лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    //Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося c новой карточкой
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log('Ошибка лайка карточки: ', err));
  } 
  

  function handleDeleteClick(card) {
    api
      .deleteCard(toDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => // с помощью метода filter: создаем копию массива, исключив из него удалённую карточку
          c._id !== toDeleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка при удалении карточки', err));
  }

  function handleUpdateUser(data) { //Добавляем обработчик (п. 3)
    return api
              .updateUserData(data)
              .then((res) => {setCurrentUser(res);})
              .catch((err) => alert('Ошибка при загрузке данных пользователя', err));
  }

  function handleUpdateAvatar(data) {
    return api
              .updateAvatar(data)
              .then((res) => {
                setCurrentUser(res);
              })
              .catch((err) => alert('Ошибка при обновлении аватара', err));
  }

  function handleAddPlaceSubmit(card) {
    return api
              .addNewCard(card)
              .then((newCard) => {
                setCards([newCard, ...cards]);
              })
              .catch((err) => alert('Ошибка при добавлении карточки', err));
  }

  // === Функция регистрации === //
  function handleRegistration(email, password) {
    ApiAuth.register(email, password)
      .then((res) => {
        if (res) {
          console.log('Регистрация прошла успешно!');
          setIsRegistrationSuccess(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccess(false);
        console.log('Ошибка регистрации:', err);
      });
  }

  // === Функция авторизации === //
  function handleAuthorization(email, password) {
    ApiAuth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
          console.log('Время входа:', new Date().toLocaleTimeString());
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccess(false);
        console.log('Ошибка входа в систему:', err);
      });
  }

  // === Функция проверки токена === //
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      ApiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log('Возникла ошибка при проверке токена:', err);
        })
    }
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/sign-in');
    console.log('Время выхода:', new Date().toLocaleTimeString());
  }


  //=== РЕНДЕРИНГ КОМПОНЕНТОВ ===//
  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} onLogOut={handleLogOut}/>
          <Switch>
            <ProtectedRoute  /* Защищаем контент главной страницы от неавторизованных пользователей */
              component={Main}
              loggedIn={loggedIn} 
              exact path="/"
              onCardClick={handleImagePopupOpen}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleLikeClick}
              onCardDelete={handleDeleteClick}
              cards={cards}
            />

            <Route path="/sign-up">
              <Register onRegister={handleRegistration} /> 
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleAuthorization} />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>

            <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up"/>}
            </Route>
          </Switch>
        <Footer />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} /> 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} //Добавляем пропс с обработчиком
        />
        <AddPlacePopup 
          isOpen={isAddCardPopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteCardPopup // Попап подтверждения удаления карточки
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDeleteClick}
      />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 
        <InfoTooltip /* Попап уведомление о статусе регистрации (успешно/неуспешно) */
        namePopup="infoTooltip"
        isSuccess={isRegistrationSuccess}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
  );
}

export default App;
