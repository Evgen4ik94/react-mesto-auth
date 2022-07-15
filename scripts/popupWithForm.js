import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleEditProfileButtonSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleEditProfileButtonSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = this.popupSelector.querySelectorAll('.popup__item'); //Собираем массив инпутов из формы
    }
    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(item => {
            this._formValues[item.name] = item.value;
        });
        return this._formValues;
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListeners('submit', (evt) =>{
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close(){
        super.close();
        this._form.reset();
    }
}