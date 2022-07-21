//Прописываем импорты//

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  formProfile,
  formCreateCard,
  initialCards,
  gallery,
  btnEdit,
  btnAdd,
  nameInput,
  aboutInput,
  validationSettings,
} from '../utils/constants.js'

import './index.css'; // импорт главного файла стилей 

// ВАЛИДАЦИЯ ФОРМ //
const editFormValidation = new FormValidator(validationSettings, formProfile);
const placeFormValidation = new FormValidator(validationSettings, formCreateCard);

// POPUPS //
const userInfo = new UserInfo({
  userSelector: '.profile__name',
  aboutSelector: '.profile__prof'
})


const popupImage = new PopupWithImage('.popup_type_fullscreen-image');
const generateCard = data => new Card(
  data, 
  '#gallery-template', 
  ({name, link}) => popupImage.open(name, link)
  ).generateCard();

//Профиль пользователя, экземпляр класса popupWithForm
const popupProfile = new PopupWithForm(
  '.popup_edit_profile',
  dataForm => {
    userInfo.setUserInfo(dataForm);
  },
  editFormValidation,
  () => {
    const {userName, userAbout} = userInfo.getUserInfo();
    nameInput.value = userName;
    aboutInput.value = userAbout;
  }
)

//Новая карточка
const popupPlace = new PopupWithForm(
  '.popup_add_photo',
  item => cardList.addItem(generateCard(item)),
  placeFormValidation
)
//Создание карточек "из коробки"//
const cardList = new Section({
  items: initialCards,
  renderer: (item) => cardList.addItem(generateCard(item))
}, gallery);
// вызов метода renderedItems класса Section, для отрисовки карточек
cardList.renderedItems();


// Прикрепляем обработчики к формам:
btnEdit.addEventListener('click', () => popupProfile.open()); //Колбэк-функция передается как handleOpen в popupWithForm //Открытие формы редактирования профиля по клику на кнопку
btnAdd.addEventListener('click', () => popupPlace.open()); //Колбэк-функция передается как handleOpen в popupWithForm  //Открытие формы добавления карточки по клику на кнопку
 
 
//Активация валидации форм//
editFormValidation.enableValidation();
placeFormValidation.enableValidation();