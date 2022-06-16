/*--- Состояние кнопки submit ---*/
/*Функция обходит массив полей и отвечает на вопрос: 
  «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { /*обходим все элементы в inputList (поля ввода)*/
      return !inputElement.validity.valid; /*возвращает true, если хотя бы одно поле в списке не валидно*/
    });
  };
  const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) { 
        buttonElement.classList.add('popup__button-submit_disabled'); /*делает кнопку неактивной*/
        buttonElement.setAttribute('disabled', true);
      } else {
        buttonElement.classList.remove('popup__button-submit_disabled');
        buttonElement.removeAttribute('disabled');
      };
    };

/*--- Конец ---*/

                            /*----- ОШИБКИ -----*/
/*--- Показать ошибку --*/
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__item-error_active');
  };
/*--- Скрыть ошибку --*/
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('popup__item-error_active');
    errorElement.textContent = '';
  };
                            /*--- Конец ---*/

  /*--- Проверка инвалидности ---*/
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) { /*значение параметра valid объекта inputElement (поля ввода)*/
      showInputError(formElement, inputElement, inputElement.validationMessage); /*Если true => false - отображение сообщения об ошибке*/
    } else {
      hideInputError(formElement, inputElement); /*Если false => true - скрытие сообщения об ошибке*/
    }
  };

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item')); /*кладем в inputList массив полей ввода формы*/
    const btnSubmit = formElement.querySelector('.popup__button-submit');/*кнопка submit'a*/
    inputList.forEach((inputElement) => { /*перебираем массив полей ввода*/
      inputElement.addEventListener('input', () => { 
        checkInputValidity(formElement, inputElement); /*и функция при вводе проверяет валидность поля*/
        toggleButtonState(inputList, btnSubmit);/*а также меняет состояние кнопки submit'a в зависимости от валидности формы*/
      });
    });
  };
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault(); 
      });
        setEventListeners(formElement);
        /*evt.addEventListener('keydown', function (evt) {
          if (evt.key === 'Esc') {
            closePopup(evt);
          };
        });*/
    });
  };
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item-error',
    errorClass: 'opup__item-error_active'
  }); 

