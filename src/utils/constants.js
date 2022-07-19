// Шесть карточек «из коробки»
export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
  
  // DOM элементы
  // контейнер для вставки карточек
  export const gallery = document.querySelector('.gallery__list');//Кладем в переменную галерею


  //Формы 
  export const formProfile =  document.querySelector('.popup__form_type_edit'); //Форма редактирования профиля
  export const formCreateCard = document.querySelector('.popup__form_type_create-card'); //Форма добавления карточки
  //Поля формы редактирования профиля
  export const nameInput = formProfile.elements.name;
  export const jobInput = formProfile.elements.about;

  //Попапы
  export const popupEdit = document.querySelector('.popup_edit_profile'); //Редактирование профиля
  export const popupAdd = document.querySelector('.popup_add_photo'); //Добавление карточки


  // Кнопки  
  export const btnEdit = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
  export const btnAdd = document.querySelector('.profile__button-add') //Кнопка "Добавить фото";

  
  // Настройки валидации форм (2 параметра у FormValidator - объект с настройками и элемент формы)
  export const validationSettings = {
    formSelector: '.popup__form',
    inputElement: '.popup__item',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item-error',
    errorClass: 'popup__item-error_active'
  };