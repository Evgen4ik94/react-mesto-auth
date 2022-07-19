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
  jobInput,
  validationSettings,
} from '../utils/constants.js'

import '../pages/index.css';

// ВАЛИДАЦИЯ ФОРМ //
const editFormValidation = new FormValidator(validationSettings, formProfile);
const placeFormValidation = new FormValidator(validationSettings, formCreateCard);

// POPUPS //
const userInfo = new UserInfo({
  userSelector: '.popup__item_type_name',
  aboutSelector: '.popup__item_type_about'
})


const popupImage = new PopupWithImage('.popup_type_fullscreen-image');
const generateCard = data => new Card(data, '#gallery-template', ({name, link}) => popupImage.open(name, link)).generateCard();

//Профиль пользователя, экземпляр класса popupWithForm
const popupProfile = new PopupWithForm(
  '.popup',
  dataForm => {
    userInfo.setUserInfo(dataForm);
  },
  editFormValidation,
  () => {
    const {userName, userAbout} = userInfo.getUserInfo();
    nameInput.value = userName;
    jobInput.value = userAbout;
  }
)

//Новая карточка
const popupPlace = new PopupWithForm(
  '.photo',
  item => cardList.setItem(generateCard(item)),
  placeFormValidation
)
//Создание карточек "из коробки"//
const cardList = new Section({
  items: initialCards,
  renderer: (item) => cardList.addItem(generateCard(item))
}, gallery);
// вызов метода renderItems класса Section, для отрисовки карточек
cardList.renderItems();


// Прикрепляем обработчики к формам:
btnEdit.addEventListener('click', () => {openEditProfile(popupEdit), editFormValidation.errorClear()}); //Открытие формы редактирования профиля по клику на кнопку
btnAdd.addEventListener('click', () => {openPopup(popupAdd), placeFormValidation.errorClear()}); //Открытие формы добавления карточки по клику на кнопку
 
 
//Активация валидации форм//
editFormValidation.enableValidation();
placeFormValidation.enableValidation();