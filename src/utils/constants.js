  
  // DOM элементы
  // контейнер для вставки карточек
  export const gallery = '.gallery__list';//Кладем в переменную галерею


  //Формы 
  export const formProfile =  document.querySelector('.popup__form_type_edit'); //Форма редактирования профиля
  export const formCreateCard = document.querySelector('.popup__form_type_create-card'); //Форма добавления карточки
  export const avaInfo = document.querySelector('.popup__form_type_new-avatar'); //Сменить аватар

  //Поля формы редактирования профиля
  export const nameInput = formProfile.elements.name;
  export const aboutInput = formProfile.elements.about;

  //Попапы
  export const popupEdit = document.querySelector('.popup_edit_profile'); //Редактирование профиля
  export const popupAdd = document.querySelector('.popup_add_photo'); //Добавление карточки

  // Кнопки  
  export const btnEdit = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
  export const btnAdd = document.querySelector('.profile__button-add'); //Кнопка "Добавить фото";
  export const btnAvatar = document.querySelector('.profile__avatar-button'); //Кнопка изменения аватара
  export const btnCreate = document.querySelector('.popup__button-create'); //Кнопка сабмита формы
  export const btnSave = document.querySelector('.popup__button-save'); //Кнопка сабмита формы

  // Настройки валидации форм (2 параметра у FormValidator - объект с настройками и элемент формы)
  export const validationSettings = {
    formSelector: '.popup__form',
    inputElement: '.popup__item',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item-error',
    errorClass: 'popup__item-error_active'
  };

  export const baseLink = 'https://mesto.nomoreparties.co/v1/cohort-47';
  export const token = '76d23833-7ba9-4f79-9b2a-5a0913e0b1e5';
