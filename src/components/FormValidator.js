export default class FormValidator {
    constructor(settings, form) {
      this._formSelector = settings.formSelector;
      this._inputElement = settings.inputElement;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputElement));
    }
  
    _showInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage;
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
  
    _enableSubmitButton() {
      this._form.querySelector(this._submitButtonSelector).setAttribute('disabled', true)
      this._form.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    }
    disableSubmitButton() {
      this._form.querySelector(this._submitButtonSelector).removeAttribute('disabled', true);
      this._form.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._enableSubmitButton();
      } else {
        this.disableSubmitButton();
      }
    }
  
    _setEventListeners() {
      this._button = this._form.querySelector(this._submitButtonSelector);
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    errorClear() {
      this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
      this._toggleButtonState();
      if (this._form.classList.contains('popup__form_type_create-card') || this._form.classList.contains('popup__form_type_new-avatar')) {
        this._form.reset(); 
      }
    }
  
    enableValidation() {
      this._setEventListeners();
      this.errorClear();
    }
  }
  