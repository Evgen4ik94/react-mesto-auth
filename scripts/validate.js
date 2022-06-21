/*--- Состояние кнопки submit ---*/
/*Функция обходит массив полей и отвечает на вопрос: 
  «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => { /*обходим все элементы в inputList (поля ввода)*/
    return !inputSelector.validity.valid; /*возвращает true, если хотя бы одно поле в списке не валидно*/
  });
};
function toggleButtonState(formSelector, {inputSelector, submitButtonSelector, inactiveButtonClass}) {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector)); /*кладем в inputList массив полей ввода формы*/
  const btnSubmit = formSelector.querySelector(submitButtonSelector);/*кнопка submit'a*/
  if (hasInvalidInput(inputList)) { 
    btnSubmit.classList.add(inactiveButtonClass); /*делает кнопку неактивной*/
    btnSubmit.disabled = true;
  } else {
    btnSubmit.classList.remove(inactiveButtonClass);
    btnSubmit.disabled = false;
  };
};

/*--- Конец ---*/

                            /*----- ОШИБКИ -----*/
/*--- Показать ошибку --*/
function showInputError(formSelector, inputSelector, errorMessage, {errorClass, inputErrorClass}) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
/*--- Скрыть ошибку --*/
function hideInputError(formSelector, inputSelector, {errorClass, inputErrorClass}) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
                            /*--- Конец ---*/

  /*--- Проверка валидности ---*/
  function checkInputValidity(formSelector, inputSelector, rest) {
  if (!inputSelector.validity.valid) { /*значение параметра valid объекта inputElement (поля ввода)*/
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, rest); /*Если true => false - отображение сообщения об ошибке*/
  } else {
    hideInputError(formSelector, inputSelector, rest); /*Если false => true - скрытие сообщения об ошибке*/
  }
};

function setEventListeners(formSelector, selectors) {
  const inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputSelector) => { /*перебираем массив полей ввода*/
  inputSelector.addEventListener('input', () => { 
      checkInputValidity(formSelector, inputSelector, selectors); /*и функция при вводе проверяет валидность поля*/
      toggleButtonState(formSelector, selectors);/*а также меняет состояние кнопки submit'a в зависимости от валидности формы*/
    });
  });
};
function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
    });
      setEventListeners(formSelector, rest);
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

