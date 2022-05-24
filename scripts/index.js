// Используем .querySelector()
let editButton = document.querySelector('.profile__button-edit'); //Кладем в переменную элемент с классом "profile__button_edit"
let popup = document.querySelector('.popup'); //Кладем в переменную элемент с классом "popup" - блок с формой
let closeButton = document.querySelector('.popup__button-close'); //Кладем в переменную элемент с классом "popup__button_close" - блок с крестиком "закрыть"
// Находим форму в DOM
let formProfile =  document.querySelector('.popup_edit_profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__item_type_about'); // Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__prof');

function popupOpen() {
    popup.classList.add('popup_opened'); //Функция добавляет класс popup_opened
    nameInput.textContent = profileName.textContent;// Получите значение полей jobInput и nameInput из свойства valueZ
    jobInput.textContent = profileProf.textContent;
}
function popupClose() {
    popup.classList.remove('popup_opened'); //Функция удаляет класс popup_opened
}


editButton.addEventListener('click', popupOpen); //Открытие формы по клику на кнопку
closeButton.addEventListener('click', popupClose); //Закрытие формы по клику на крестик


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства valueZ
    profileProf.textContent = jobInput.value;
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    popupClose();
}
//Состояние кнопки лайка

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formProfile.addEventListener('submit', formSubmitHandler); 




