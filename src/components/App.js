import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
 

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpenClose(true);
  }
  function handleAddPlaceClick() {
    setAddCardPopupOpenClose(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpenClose(true);
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
  }
  // Закрываем попапы (изменяем открытое состояние с true на false) и очищаем поля
  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setSelectedCard({ name: "", link: "" });
  }
  //Добавим функцию лайка
  function handleLikeClick (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  } 
  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => // с помощью метода filter: создаем копию массива, исключив из него удалённую карточку
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) { //Добавляем обработчик (п. 3)
    return api
            .setUserInfo(data)
            .then((res) => {setCurrentUser(res);})
            .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    return api
              .updateAvatar(data)
              .catch((err) => console.log(err))
              .then((res) => {
                setCurrentUser(res);
              });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onCardClick={handleImagePopupOpen}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteClick}
          cards={cards}
        />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} //Добавляем пропс с обработчиком
        />
        <PopupWithForm
          name="form"
          title="Новое место"
          submitText="Создать"
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        >
            <input
              className="popup__input popup__input_type_caption"
              id="title-item"
              type="text"
              name="name"
              placeholder="Название"
              minLength="1"
              maxLength="30"
              required
            />
            <span className="popup__input-error"id="title-item-error"></span>
            <input
              className="popup__input popup__input_type_link"
              id="link-item"
              type="url"
              name="link"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__input-error" id="link-item-error"></span>
        </PopupWithForm>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 
        <PopupWithForm
          name="delete"
          title="Удалить карточку?"
          submitText="Да"
          onClose={closeAllPopups}
        >
        </PopupWithForm>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
