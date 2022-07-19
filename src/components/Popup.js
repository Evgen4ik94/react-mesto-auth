export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);    
      this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    }
    // закрыть popup клавишей Esc
    _handleCloseByEsc(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    }
    // закрыть popup кликом по фону
    _closeOnOverlay(e) {
      if(e.target === e.currentTarget) {
        this.close();
      }
    }
    //Установка слушателей на закрытие по кнопке и по фону
    _setEventListeners() {
      this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (e) => this._closeOnOverlay(e));
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