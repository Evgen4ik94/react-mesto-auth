export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);   
      this._setEventListeners(); 
      this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    }
    // закрыть popup клавишей Esc
    _handleCloseByEsc(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    // закрыть popup кликом по фону
    _closeOnOverlay(evt) {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    }
    //Установка слушателей на закрытие по кнопке и по фону
    _setEventListeners() {
      this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (evt) => this._closeOnOverlay(evt));
    }
  
    open() {
      document.addEventListener('keyup', this._handleCloseByEsc); //Ставим слушатель на Esc при открытии попапа
      this._popup.classList.add('popup_opened');
    }
  
    close() {
      document.removeEventListener('keyup', this._handleCloseByEsc); //Убираем слушатель с Esc при закрытии попапа
      this._popup.classList.remove('popup_opened');
    }
  }