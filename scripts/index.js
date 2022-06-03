// Используем .querySelector()
//---КНОПКИ---//
let editButton = document.querySelector('.profile__button-edit'); //Кнопка "Редактировать профиль" 
let addButton = document.querySelector('.profile__button-add') //Кнопка "Добавить фото"
let closeButtons = document.querySelectorAll('.popup__button-close'); //Кнопка "Закрыть" popup
let createButton = document.querySelector('.create_button'); //Кнопка [+] добавить
let deleteButton = document.querySelectorAll('.photo__button-delete'); //Кнопка "Удалить" фото
let likeButtons = document.querySelectorAll('.photo__button-like');
console.log(likeButtons);

//---POPUPS---//
let popupEdit = document.querySelector('.popup_edit_profile'); //Форма редактирования профиля
let popupAdd = document.querySelector('.popup_add_photo'); //Форма добавления карточки
let gallery = document.querySelector('.gallery__list');//Кладем в переменную галерею"

// Находим форму в DOM
let formProfile =  document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__item_type_about'); // Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__prof');
//--- ГАЛЕРЕЯ ---//
const addName = document.querySelector('.popup__item_type_caption');
const addLink = document.querySelector('.popup__item_type_link');
//------------ Open-Popups -------------//

function popupOpenEdit() {
  popupEdit.classList.add('popup_opened'); //Функция добавляет класс popup_opened
  nameInput.value = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
  jobInput.value = profileProf.textContent;
};
function popupOpenAdd() {
  popupAdd.classList.add('popup_opened');
};
//------------ END ---------------------//

//------------ Close-Popups -------------//


function closePopup(popup) {
  popup.classList.remove('popup_opened'); //Функция удаляет класс popup_opened
};

function handleClickClosePopup(evt) {
  closePopup(evt.target.closest('.popup'));
};

closeButtons.forEach(button => {
  button.addEventListener('click', handleClickClosePopup);
});
//------------ END ---------------------//

// Удаление фото
/*gallery.addEventListener('click', (evt) => {
  evt.target.closest('.photo').remove();
});*/

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup(popupEdit);
};
// Прикрепляем обработчики к формам:
editButton.addEventListener('click', popupOpenEdit); //Открытие формы редактирования профиля по клику на кнопку
addButton.addEventListener('click', popupOpenAdd); //Открытие формы добавления карточки по клику на кнопку

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfile.addEventListener('submit', formSubmitHandler); 
//Обработчик добавления карточки
createButton.addEventListener('click', createCardForm);



//Состояние кнопки лайка
function likeInit(evt) {
  evt.target.classList.toggle('photo__button-like_active');
};

/*function setLike(evt) {
  likeInit(.closest('.photo'));
};*/

likeButtons.forEach(like => {
  like.addEventListener('click', likeInit)
});



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


initialCards.forEach(card => { //Перебираем массив карточек из коробки и на каждой итерации возвращаем функцию createCard, которая создает одну карточку
  return createCard(card);
});


function createCard(item) {
  const galleryTemplate = document.querySelector('#gallery-template').content; //Кладем в переменную содержимое тега template
  const galleryItem = galleryTemplate.querySelector('.photo').cloneNode(true); //Клонируем в переменную разметку карточки
  galleryItem.querySelector('.photo__title').textContent = item.name; //Кладем в теги названия карточки название из массива
  galleryItem.querySelector('.photo__title').alt = item.name; //То же и с описанием
  galleryItem.querySelector('.photo__item').src = item.link; //Из массива в атрибут src кладем ссылку
  gallery.append(galleryItem); //Добавляем в галерею карточку
};

function createCardForm(evt) {
  evt.preventDefault();
  const galleryTemplate = document.querySelector('#gallery-template').content; //Кладем в переменную содержимое тега template
  const galleryItem = galleryTemplate.querySelector('.photo').cloneNode(true); //Клонируем в переменную разметку карточки
  galleryItem.querySelector('.photo__title').textContent = addName.value; //Кладем в теги названия карточки название из массива
  galleryItem.querySelector('.photo__title').alt = addName.value; //То же и с описанием
  galleryItem.querySelector('.photo__item').src = addLink.value; //Из массива в атрибут src кладем ссылку
  gallery.prepend(galleryItem); //Добавляем в галерею карточку
  closePopup(popupAdd);
  addName.value = "";
  addLink.value = "";
};
