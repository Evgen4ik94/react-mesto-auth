import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationForm, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validationForm = validationForm;
    this._handleOpen = handleOpen;
    this._inputList = this._form.querySelectorAll('.popup__item');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
 }
// открытие попапа с формой
  open() {
    this._validationForm.errorClear(); //Удаление сообщений об ошибках валидации
    this._handleOpen();
    super.open();
 }
// закрытие попапа с формой
  close() {
   super.close();
   this._form.reset();
  }
}