// Используем .querySelector()
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


// Находим форму в DOM
const formProfile =  document.querySelector('.popup__form_type_edit');// Воспользуйтесь методом querySelector()
const formCreateCard = document.querySelector('.popup__form_type_create-card');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__item_type_about'); // Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');
//--- ГАЛЕРЕЯ ---//
const galleryTemplate = document.querySelector('#gallery-template').content; //Кладем в переменную содержимое тега template
const nameAdd = document.querySelector('.popup__item_type_caption');
const linkAdd = document.querySelector('.popup__item_type_link');
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
  image.querySelector('.photo__item').addEventListener('click', (evt) => { //По клику на DOM элемент с картинкой выполняется функция
    popupImage.src = evt.target.src;                                     // которая заполняет атрибуты элементов поп-апа
    popupImageCaption.textContent = evt.target.alt;
    popupImageCaption.alt = evt.target.alt;
    openPopup(fullImage); // И вызывается функция открытия поп-апа
  });
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

//------------ Delete photo -------------//
function bindCardDeleteHandler(card) {
  card.querySelector('.photo__button-delete').addEventListener('click', evt => {
    evt.target.closest('.photo').remove();
  })
}
//------------ END ---------------------//


function handleEditProfileButtonSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup(popupEdit);
};

//Состояние кнопки лайка
function bindLikeCardHandler(item) {
  item.querySelector('.photo__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo__button-like_active');
  })
};

function createCard(card) {
  const galleryItem = galleryTemplate.querySelector('.photo').cloneNode(true); //Клонируем в переменную разметку карточки
  const photoItem = galleryItem.querySelector('.photo__item');
  galleryItem.querySelector('.photo__title').textContent = card.name; //Кладем в теги названия карточки название из массива
  photoItem.src = card.link; //Из массива в атрибут src кладем ссылку
  photoItem.alt = card.name; //То же и с описанием
  bindLikeCardHandler(galleryItem);
  bindCardDeleteHandler(galleryItem);
  bindImagePopupOpenHandler(galleryItem);
  return galleryItem; //Возвращает разметку карточки с содержимым
};

function handleCreateCard(evt) {
  evt.preventDefault(); //Запрещаем стандартную отправку формы
  const card = {}; //Создаем пустой список объектов
  card.link = linkAdd.value; //В список кладем объект link со значением из linkAdd - поля ввода ссылки на картинку
  card.name = nameAdd.value; //В список кладем объект name со значением из nameAdd - поля ввода названия картинки
  gallery.prepend(createCard(card));  
  closePopup(popupAdd);  
  formCreateCard.reset();
};
initialCards.forEach((card) => { //Перебираем массив карточек из коробки и на каждой итерации возвращаем функцию createCard, которая создает одну карточку
  const cardItem = createCard(card)
  gallery.prepend(cardItem);
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
