import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationForm) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validationForm = validationForm;
    this._handleOpen = handleOpen;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._form.reset();
    });
 }
// открытие попапа с формой
  open() {
    this._validationForm.errorClear(); //Удаление сообщений об ошибках валидации
    super.open();
 }
// закрытие попапа с формой
  close() {
   super.close();
   this._form.reset();
  }
}