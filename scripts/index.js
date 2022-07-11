//Прописываем импорты//
import Card from './Card.js';
import {initialCards} from './data.js';
import FormValidator from './FormValidator.js';

//---КНОПКИ---//
const btnEdit = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
const btnAdd = document.querySelector('.profile__button-add') //Кнопка "Добавить фото"
const btnsClose = document.querySelectorAll('.popup__button-close'); //Кнопка "Закрыть" popup


//---POPUPS---//
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit_profile'); //Форма редактирования профиля
const popupAdd = document.querySelector('.popup_add_photo'); //Форма добавления карточки
const gallery = document.querySelector('.gallery__list');//Кладем в переменную галерею
const fullImage = document.querySelector('.popup_type_fullscreen-image'); //Попап full-изображения
const popupImage = fullImage.querySelector('.popup__image');
const popupImageCaption = fullImage.querySelector('.popup__image-caption');

//Параметры форм, передаваемые для проверки валидации//
const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
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
function openEditProfile(popup) {
  nameInput.value = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
  jobInput.value = profileProf.textContent;
  openPopup(popup);
};
function bindImagePopupOpenHandler(image) {
   //По клику на DOM элемент с картинкой выполняется функция
    popupImage.src = image.link;                                     // которая заполняет атрибуты элементов поп-апа
    popupImageCaption.textContent = image.name;
    popupImageCaption.alt = image.name;
    openPopup(fullImage); // И вызывается функция открытия поп-апа
  };

//------------ END ---------------------//

//------------ Close-Popups -------------//
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //Функция удаляет класс popup_opened у родительского элемента .popup, возвращаемого функцией handleClickClosePopup
  document.removeEventListener('keyup', handleClosePopupByEsc); //Удаляем обработчик для закрытия на клавишу Esc
  /*popup.removeEventListener('click', handleClosePopupByOverlay);*/ //Удаляем обработчик для закрытия на клик по оверлею
};
function handleClickClosePopup(evt) {
  closePopup(evt.target.closest('.popup'));
}
btnsClose.forEach(button => {
  button.addEventListener('click', handleClickClosePopup);
});

function handleClosePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened')); //Закрываем открытый попап
  }
};
function handleClosePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened')); //Закрываем открытый попап
  }
};
//------------ END ---------------------//


function handleEditProfileButtonSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup(popupEdit);
};


//Ручное создание карточки//
function handleCreateCard(evt) {
  evt.preventDefault(); //Запрещаем стандартную отправку формы
  // Создадим экземпляр карточки
  const name = nameAdd.value;
  const link = linkAdd.value;
  const card = new Card({name, link}, cardSelector, bindImagePopupOpenHandler);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
  closePopup(popupAdd);  
  formCreateCard.reset();
};
//Создание карточек "из коробки"//
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, cardSelector, bindImagePopupOpenHandler);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
});


// Прикрепляем обработчики к формам:
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfile.addEventListener('submit', handleEditProfileButtonSubmit); 
//Обработчик добавления карточки
formCreateCard.addEventListener('submit', handleCreateCard);
btnEdit.addEventListener('click', () => openEditProfile(popupEdit)); //Открытие формы редактирования профиля по клику на кнопку
btnAdd.addEventListener('click', () => openPopup(popupAdd)); //Открытие формы добавления карточки по клику на кнопку

popup.forEach((item) => 
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
    handleClosePopupByOverlay(evt);
})); //Добавляем обработчик для закрытия на клик по оверлею

 
//Активация валидации форм//
editFormValidation.enableValidation();
placeFormValidation.enableValidation();