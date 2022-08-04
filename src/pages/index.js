//Прописываем импорты//

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import {
  baseLink,
  token,
  avaInfo,
  formProfile,
  formCreateCard,
  initialCards,
  gallery,
  btnEdit,
  btnAdd,
  btnAvatar,
  nameInput,
  aboutInput,
  validationSettings,
} from '../utils/constants.js'
import Api from '../components/Api.js';
import './index.css'; // импорт главного файла стилей 

const api = new Api(baseLink, token); // Передаем в экземпляр класса Api ссылку и токен

// ВАЛИДАЦИЯ ФОРМ //
const editFormValidation = new FormValidator(validationSettings, formProfile);
const placeFormValidation = new FormValidator(validationSettings, formCreateCard);
const avatarFormValidation = new FormValidator(validationSettings, avaInfo);
//Активация валидации форм//
editFormValidation.enableValidation();
placeFormValidation.enableValidation();
avatarFormValidation.enableValidation();


// POPUPS //
const userInfo = new UserInfo({
  userSelector: '.profile__name',
  aboutSelector: '.profile__prof',
  avatarSelector: '.profile__image'
})

const popupImage = new PopupWithImage('.popup_type_fullscreen-image');


//Создание новой карточки
const generateCard = data => new Card(
  data,
  userInfo.getUserId(),
  '#gallery-template',
  ({name, link}) => popupImage.open(name, link),
  (id, deleteConfirm) => popupConfirmDelete.open(id, deleteConfirm),
  (id, liked) => api.likeCard(id, liked)
).generateCard();

//Попап удаления карточки
const popupConfirmDelete = new PopupWithDelete(
  '.popup_delete_card',
  (id, handleDelete) => {
    api.deleteCard(id)
      .then(() => {
        handleDelete();
        popupConfirmDelete.close();
      })
      .catch(err => console.log(err));
  }
);

//Профиль пользователя, экземпляр класса popupWithForm
const popupProfile = new PopupWithForm(
  '.popup_edit_profile',
  dataForm => {
    api.updUserInfo({
      name: dataForm.name,
      about: dataForm.about
    })
      .then(res => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(err))
      .finally(() => document.querySelector('.popup__button-save').textContent = 'Сохранить');
  },
  editFormValidation,
  () => {
    const {userName, userAbout} = userInfo.getUserInfo();
    nameInput.value = userName;
    aboutInput.value = userAbout;
  }
)

//Попап добавления карточки
const popupPlace = new PopupWithForm(
  '.popup_add_photo',
  item => { 
    api.uploadCard(item)
    .then(res => {
      cardList.prependItem(generateCard(res)); //!!!!!!!!!!
      popupPlace.close();
    })
    .catch(err => console.log(err))
    .finally(() => document.querySelector('.popup__button-create').textContent = 'Создать');
  },
  placeFormValidation
)

//Загрузка карточек с сервера//
let cardList; //Создаем переменную в глобальной области видимости, чтобы была доступна везде

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{name, about, avatar, _id}, initialCards]) => {
    userInfo.setUserInfo({name, about});
    userInfo.setUserAvatar(avatar);
    userInfo.setUserId(_id);
    cardList = new Section({
      items: initialCards,
      renderer: item => cardList.appendItem(generateCard(item))
    }, gallery);
    cardList.renderedItems();
  })
    .catch(err => console.log(err));


// Попап изменения аватара
const popupChangeAvatar = new PopupWithForm(
  '.popup_avatar', //в класс формы передаем селектор попапа смены аватара
  ({link}) => {
    api.changeAvatar(link) //Вызываем метод changeAvatar родительского класса Api
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch(err => console.log(err)) //в случае отклонения запроса - возвращаем сообщение об ошибке
    .finally(() => document.querySelector('.popup__button-avatar').textContent = 'Сохранить'); //Возвращаем текст кнопки после загрузки аватара
  },
  avatarFormValidation
);

// Прикрепляем обработчики к формам:
// Открытие попапа изменения инфо профиля
btnEdit.addEventListener('click', () => popupProfile.open()); //Колбэк-функция передается как handleOpen в popupWithForm //Открытие формы редактирования профиля по клику на кнопку

// Открытие попапа добавления карточки
btnAdd.addEventListener('click', () => popupPlace.open()); //Колбэк-функция передается как handleOpen в popupWithForm  //Открытие формы добавления карточки по клику на кнопку

//Открытие попапа изменения аватара
btnAvatar.addEventListener('click', () => popupChangeAvatar.open());
 
