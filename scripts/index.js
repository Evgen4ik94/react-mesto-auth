//Прописываем импорты//
import Card from './Card.js';
import {initialCards} from './data.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './popupWithImage.js';

//---КНОПКИ---//
const btnEdit = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
const btnAdd = document.querySelector('.profile__button-add') //Кнопка "Добавить фото"

//---POPUPS---//
const popupEdit = document.querySelector('.popup_edit_profile'); //Форма редактирования профиля
const popupAdd = document.querySelector('.popup_add_photo'); //Форма добавления карточки
const gallery = document.querySelector('.gallery__list');//Кладем в переменную галерею
const popupFullImage = document.querySelector('.popup_type_fullscreen-image'); //Попап full-изображения
const popupImage = popupFullImage.querySelector('.popup__image');
const popupImageCaption = popupFullImage.querySelector('.popup__image-caption');

//Параметры форм, передаваемые для проверки валидации//
const formSettings = {
  formSelector: '.popup__form',
  inputElement: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active'
};
// Находим форму в DOM
const formProfile =  document.querySelector('.popup__form_type_edit');// Воспользуйтесь методом querySelector()
const formCreateCard = document.querySelector('.popup__form_type_create-card');

// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__item_type_about'); // Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

//--- ГАЛЕРЕЯ ---//
const cardSelector = '#gallery-template';
const nameAdd = document.querySelector('.popup__item_type_caption');
const linkAdd = document.querySelector('.popup__item_type_link');

// ВАЛИДАЦИЯ ФОРМ //
const editFormValidation = new FormValidator(formSettings, formProfile);
const placeFormValidation = new FormValidator(formSettings, formCreateCard);

//------------ Open-Popups -------------//
function openPopup(popup) { //Функцию передаем в обработчик по клику на элемент DOM
  popup.classList.add('popup_opened'); //Функция добавляет класс popup_opened
  document.addEventListener('keyup', handleClosePopupByEsc); //Добавляем обработчик для закрытия на клавишу Esc
};




//Профиль пользователя, экземпляр класса popupWithForm
const popupProfile = new PopupWithForm('.popup__form_type_edit', handleEditProfileButtonSubmit(evt));
popupProfile.setEventListeners();


//Попап изображения, экземпляр класса popupWithImage
const popupPlace = new PopupWithImage('.popup_type_fullscreen-image');
popupPlace.open();

//------------ END ---------------------//



function handleEditProfileButtonSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup(popupEdit);
};

function renderCard({name, link}) {
const card = new Card({name, link}, cardSelector, bindImagePopupOpenHandler);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
};

//Ручное создание карточки//
function handleCreateCard(evt) {
  evt.preventDefault(); //Запрещаем стандартную отправку формы
  // Создадим экземпляр карточки
  const name = nameAdd.value;
  const link = linkAdd.value;
  gallery.prepend(renderCard({name, link}));
  formCreateCard.reset();
  closePopup(popupAdd);  
};

//Создание карточек "из коробки"//
initialCards.forEach((item) => {
  gallery.prepend(renderCard(item));
});


// Прикрепляем обработчики к формам:
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfile.addEventListener('submit', handleEditProfileButtonSubmit); 
//Обработчик добавления карточки
formCreateCard.addEventListener('submit', handleCreateCard);
btnEdit.addEventListener('click', () => {openEditProfile(popupEdit), editFormValidation.errorClear()}); //Открытие формы редактирования профиля по клику на кнопку
btnAdd.addEventListener('click', () => {openPopup(popupAdd), placeFormValidation.errorClear()}); //Открытие формы добавления карточки по клику на кнопку
 

[popupAdd, popupEdit, popupFullImage].forEach((item) => 
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
    handleClosePopupByOverlay(evt);
})); //Добавляем обработчик для закрытия на клик по оверлею

 
//Активация валидации форм//
editFormValidation.enableValidation();
placeFormValidation.enableValidation();