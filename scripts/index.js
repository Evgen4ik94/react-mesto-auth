// Используем .querySelector()
//---КНОПКИ---//
const btnEdit = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
const btnAdd = document.querySelector('.profile__button-add') //Кнопка "Добавить фото"
const btnsClose = document.querySelectorAll('.popup__button-close'); //Кнопка "Закрыть" popup
const btnCreate = document.querySelector('.popup__button-create'); //Кнопка [+] добавить

//---POPUPS---//
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

const initialCards = [
  {
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
  },
]; 
const nameAdd = document.querySelector('.popup__item_type_caption');
const linkAdd = document.querySelector('.popup__item_type_link');
//------------ Open-Popups -------------//
function openPopup(popup) { //Функцию передаем в обработчик по клику на элемент DOM
  popup.classList.add('popup_opened'); //Функция добавляет класс popup_opened
  nameInput.value = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
  jobInput.value = profileProf.textContent;
};

function openImagePopup(image) {
  image.querySelector('.photo__item').addEventListener('click', evt => { //По клику на DOM элемент с картинкой выполняется функция
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
};
function handleClickClosePopup(evt) {
  closePopup(evt.target.closest('.popup'));
}
btnsClose.forEach(button => {
  button.addEventListener('click', handleClickClosePopup);
});
//------------ END ---------------------//

//------------ Delete photo -------------//
function deleteItem(item) {
  item.querySelector('.photo__button-delete').addEventListener('click', evt => {
    evt.target.closest('.photo').remove();
  })
}
//------------ END ---------------------//


function submitFormHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup(popupEdit);
};
// Прикрепляем обработчики к формам:

btnEdit.addEventListener('click', () => openPopup(popupEdit)); //Открытие формы редактирования профиля по клику на кнопку
btnAdd.addEventListener('click', () => openPopup(popupAdd)); //Открытие формы добавления карточки по клику на кнопку

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfile.addEventListener('submit', submitFormHandler); 
//Обработчик добавления карточки
formCreateCard.addEventListener('submit', createCardForm);



//Состояние кнопки лайка
function setLike(item) {
  item.querySelector('.photo__button-like').addEventListener('click', evt => {
    evt.target.classList.toggle('photo__button-like_active');
  })
};





initialCards.forEach(card => { //Перебираем массив карточек из коробки и на каждой итерации возвращаем функцию createCard, которая создает одну карточку
  return createCard(card);
});


function createCard(item) {
  const galleryTemplate = document.querySelector('#gallery-template').content; //Кладем в переменную содержимое тега template
  const galleryItem = galleryTemplate.querySelector('.photo').cloneNode(true); //Клонируем в переменную разметку карточки
  galleryItem.querySelector('.photo__title').textContent = item.name; //Кладем в теги названия карточки название из массива
  galleryItem.querySelector('.photo__item').alt = item.name; //То же и с описанием
  galleryItem.querySelector('.photo__item').src = item.link; //Из массива в атрибут src кладем ссылку
  setLike(galleryItem);
  deleteItem(galleryItem);
  openImagePopup(galleryItem);
  gallery.append(galleryItem); //Добавляем в галерею карточки из коробки
};

function createCardForm(evt) {
  evt.preventDefault();
  const galleryTemplate = document.querySelector('#gallery-template').content; //Кладем в переменную содержимое тега template
  const galleryItem = galleryTemplate.querySelector('.photo').cloneNode(true); //Клонируем в переменную разметку карточки
  galleryItem.querySelector('.photo__title').textContent = nameAdd.value; //Кладем в теги названия карточки название из массива
  galleryItem.querySelector('.photo__item').alt = nameAdd.value; //То же и с описанием
  galleryItem.querySelector('.photo__item').src = linkAdd.value; //Из массива в атрибут src кладем ссылку
  setLike(galleryItem);
  deleteItem(galleryItem);
  openImagePopup(galleryItem);
  gallery.prepend(galleryItem); //Добавляем в галерею карточку
  closePopup(popupAdd);  
  formCreateCard.reset()
};

