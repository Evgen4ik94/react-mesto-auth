export default class FormValidator {
    constructor(settings, form) {
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._form = form;
    }
  
    _showInputError(inputSelector) {
      const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputSelector.validationMessage;
    }
  
    _hideInputError(inputSelector) {
      const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  
    _checkInputValidity(inputSelector) {
      if (!inputSelector.validity.valid) {
        this._showInputError(inputSelector);
      } else {
        this._hideInputError(inputSelector);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some(inputSelector => !inputSelector.validity.valid);
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._button.setAttribute('disabled', true)
        this._button.classList.add(this._inactiveButtonClass);
      } else {
        this._button.removeAttribute('disabled', true);
        this._button.classList.remove(this._inactiveButtonClass);
      }
    }
  
    _setEventListeners() {
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._button = this._form.querySelector(this._submitButtonSelector);
      this._toggleButtonState();
      this._inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
          this._checkInputValidity(inputSelector);
          this._toggleButtonState();
        });
      });
    }
  
    errorClear() {
      this._inputList.forEach(input => {
        if (input.classList.contains(this._inputErrorClass)) {
          this._hideInputError(input);
        }
      });
      if (this._button.classList.contains('button')) {
        this._toggleButtonState(this._inputList, this._button);
      }
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }
  