const formProfileEdit = document.forms.profile_edit;
const formPlaceInfo = document.forms.placeInfo;
const userName = formProfileEdit.elements.name;
const userInfo = formProfileEdit.elements.about;
const placeTitle = formPlaceInfo.elements.title;
const placeLink = formPlaceInfo.elements.link;

/*--- Состояние кнопки submit ---*/
/*Функция обходит массив полей и отвечает на вопрос: 
  «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-submit_disabled');
      } else {
        buttonElement.classList.remove('popup__button-submit_disabled');
      };
    };

/*--- Конец ---*/

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

  /*--- Проверка инвалидности ---*/
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const btnSubmit = formElement.querySelector('.popup__button-submit');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, btnSubmit);
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
    });
  };
  enableValidation();

