export default class Popup {
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
    }
    //Открыть попап
    open(){
        document.addEventListener('keyup', this._handleEscapeClose); //Добавляем обработчик для закрытия на клавишу Esc
        this._popupElemen.classList.add('popup_opened'); //Функция добавляет класс popup_opened
    }
    //Закрыть попап
    close(){
        document.removeEventListener('keyup', this._handleEscapeClose); //Удаляем обработчик для закрытия на клавишу Esc
        this._popupElement.classList.remove('popup_opened'); //Функция удаляет класс popup_opened у родительского элемента .popup, возвращаемого функцией handleClickClosePopup 
    }
    //Закрыть попап кнопкой Esc
    _handleEscapeClose(evt){
        if (evt.key === "Escape") {
            this.close();
        }
    }
     // Закрыть попап кликом по фону
    _closeOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }
    setEventListeners(){
        this._popupElement.addEventListener('click', (evt) => this._closeOverlay(evt));
        this._popupElement.querySelector('.popup__button-close').addEventListener('click', () => this.close());
    }
}