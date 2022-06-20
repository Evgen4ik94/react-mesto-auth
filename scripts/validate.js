/*--- Состояние кнопки submit ---*/
/*Функция обходит массив полей и отвечает на вопрос: 
  «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
const hasInvalidInput = (formSelector) => {
  return formSelector.some((inputSelector) => { /*обходим все элементы в inputList (поля ввода)*/
    return !inputSelector.validity.valid; /*возвращает true, если хотя бы одно поле в списке не валидно*/
  });
};
const toggleButtonState = (formSelector, submitButtonSelector) => {
  if (hasInvalidInput(formSelector)) { 
    submitButtonSelector.classList.add('popup__button-submit_disabled'); /*делает кнопку неактивной*/
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove('popup__button-submit_disabled');
    submitButtonSelector.disabled = false;
  };
};

/*--- Конец ---*/

                            /*----- ОШИБКИ -----*/
/*--- Показать ошибку --*/
function showInputError(formSelector, inputSelector, errorMessage) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__item-error_active');
  };
/*--- Скрыть ошибку --*/
function hideInputError(formSelector, inputSelector) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    errorElement.classList.remove('popup__item-error_active');
    errorElement.textContent = '';
  };
                            /*--- Конец ---*/

  /*--- Проверка валидности ---*/
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) { /*значение параметра valid объекта inputElement (поля ввода)*/
    showInputError(formSelector, inputSelector, inputSelector.validationMessage); /*Если true => false - отображение сообщения об ошибке*/
  } else {
    hideInputError(formSelector, inputSelector); /*Если false => true - скрытие сообщения об ошибке*/
  }
};

function setEventListeners(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__item')); /*кладем в inputList массив полей ввода формы*/
  const btnSubmit = formSelector.querySelector('.popup__button-submit');/*кнопка submit'a*/
  inputList.forEach((inputSelector) => { /*перебираем массив полей ввода*/
  inputSelector.addEventListener('input', () => { 
      checkInputValidity(formSelector, inputSelector); /*и функция при вводе проверяет валидность поля*/
      toggleButtonState(inputList, btnSubmit);/*а также меняет состояние кнопки submit'a в зависимости от валидности формы*/
    });
  });
};
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
    });
      setEventListeners(formSelector);
  });
};
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active'
}); 

