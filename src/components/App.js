import React from "react";
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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpenClose] = React.useState(false); //Стейт попапа ред. профиля
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false); //Стейт попапа добавления карточки
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false); //Стейт попапа изменения аватара
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false); //Стейт попапа удаления карточки

  const [selectedCard, setSelectedCard] = React.useState({ // Стейт, отвечающий за открытие нужной карточки
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({}); //Стейт данных текущего пользователя
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); //Стейт попапа карточки
  const [cards, setCards] = React.useState([]); // Стейт, отвечающий за состояние cards
  const [toDeleteCard, setToDeleteCard] = React.useState({}); // Стейт, отвечающий за подготовку к удалении карточки

  // Стейты прелоудеров загрузки
  const [isLoadingAddPopup, setIsLoadingAddPopup] = React.useState(false);
  const [isLoadingEditPopup, setIsLoadingEditPopup] = React.useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = React.useState(false);
  const [isLoadingDeletePopup, setIsLoadingDeletePopup] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();
  //===========//

  //=== API ЗАПРОСЫ ===//
  //Эффект, отвечающий за запрос на отображение карточек и информации пользователя
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  // Эффект проверяющий токен при загрузки страницы, чтобы не обрывало сессию при перезагрузке страницы
  React.useEffect(() => {
    tokenCheck();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);


  // ===== Функции-обработчики для открытия попапов
  function handleEditProfileClick() { //Открытие попапа ред. профиля по клику (меняем состояние на true)
    setIsEditProfilePopupOpenClose(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() { //Открытие попапа добавления карточки по клику (меняем состояние на true)
    setAddCardPopupOpenClose(!isAddCardPopupOpen);
  }

  function handleEditAvatarClick() { //Открытие попапа ред. аватара по клику (меняем состояние на true)
    setEditAvatarPopupOpenClose(!isEditAvatarPopupOpen);
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
    setAddCardPopupOpenClose(false);
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
    setIsLoadingDeletePopup(true);
    api
      .deleteCard(toDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => // с помощью метода filter: создаем копию массива, исключив из него удалённую карточку
          c._id !== toDeleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка при удалении карточки', err))
      .finally(() => {
        setIsLoadingDeletePopup(false);
      });
  }

  function handleUpdateUser(data) { //Добавляем обработчик (п. 3)
    setIsLoadingEditPopup(true);
    return api
              .updateUserData(data)
              .then((res) => {setCurrentUser(res);})
              .catch((err) => alert('Ошибка при загрузке данных пользователя', err))
              .finally(() => {
                setIsLoadingEditPopup(false);
              });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarPopup(true);
    return api
              .updateAvatar(data)
              .then((res) => {
                setCurrentUser(res);
              })
              .catch((err) => alert('Ошибка при обновлении аватара', err))
              .finally(() => {
                setIsLoadingAvatarPopup(false);
              });
  }

  function handleAddPlaceSubmit(card) {
    return api
              .addNewCard(card)
              .then((newCard) => {
                setCards([newCard, ...cards]);
              })
              .catch((err) => alert('Ошибка при добавлении карточки', err))
              .finally(() => {
                setIsLoadingAddPopup(false);
              });
  }

  // === Функция регистрации === //
  function handleRegistration(email, password) {
    ApiAuth.register(email, password)
      .then((res) => {
        if (res) {
          console.log('Регистрация прошла успешно!');
          setLoggedIn(true);
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
  function tokenCheck() {
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
          isLoading={isLoadingEditPopup} //Загрузка попапа
        />
        <AddPlacePopup 
          isOpen={isAddCardPopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoadingAddPopup} //Загрузка попапа
        />
        <DeleteCardPopup // Попап подтверждения удаления карточки
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDeleteClick}
        isLoading={isLoadingDeletePopup}
      />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoadingAvatarPopup} //Загрузка попапа
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
