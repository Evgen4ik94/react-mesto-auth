// Используем .querySelector()
let editButton = document.querySelector('.profile__button-edit'); //Кладем в переменную кнопку Редактировать"
let addButton = document.querySelector('.profile__button-add') //Кладем в переменную кнопку Добавить"
let popup = document.querySelector('.popup'); //Кладем в переменную элемент с классом "popup" - блок с формой
let popupAdd = document.querySelector('.popup_add_photo'); //Кладем в переменную элемент с классом "popup_add_photo" - блок с формой
let closeButton = document.querySelector('.popup__button-close'); //Кладем в переменную элемент с классом "popup__button_close" - блок с крестиком "закрыть"
let gallery = document.querySelector('.gallery__list');//Кладем в переменную галерею"
// Находим форму в DOM
let formProfile =  document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__item_type_about'); // Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__prof');

function popupOpen() {
    popup.classList.add('popup_opened'); //Функция добавляет класс popup_opened
    nameInput.value = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
    jobInput.value = profileProf.textContent;
}
function popupClose() {
    popup.classList.remove('popup_opened'); //Функция удаляет класс popup_opened
}


function popupAddOpen() {
    popupAdd.classList.add('popup_opened'); //Функция добавляет класс popup_opened
    nameInput.value = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
    jobInput.value = profileProf.textContent;
}
function popupAddClose() {
    popupAdd.classList.remove('popup_opened'); //Функция удаляет класс popup_opened
}


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    popupClose();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editButton.addEventListener('click', popupOpen); //Открытие формы по клику на кнопку
addButton.addEventListener('click', popupAddOpen); //Открытие формы по клику на кнопку
closeButton.addEventListener('click', popupClose); //Закрытие формы по клику на крестик

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfile.addEventListener('submit', formSubmitHandler); 

//Добавление фото
/*function addPlace(nameValue, linkValue) {
    const galleryTemplate = document.querySelector('#gallery-template').content;
    const photoItem = galleryTemplate.querySelector('.')
}*/




// Удаление фото
gallery.addEventListener('click', (evt) => {
    evt.target.closest('.photo').remove();
});

//Состояние кнопки лайка




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
  galleryItem.querySelector('.photo__title').textContent = item.name; //Кладем в теги названия карточки название из массива
  galleryItem.querySelector('.photo__title').alt = item.name; //То же и с описанием
  galleryItem.querySelector('.photo__item').src = item.link; //Из массива в атрибут src кладем ссылку
};


