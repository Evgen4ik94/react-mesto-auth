import Popup from './Popup.js'

export default class PopupWithImage extends Popup { //Наследование от класса Popup
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageCaption = this._popup.querySelector('.popup__image-caption');
    }
    open(name, link) { //Перезапишем родительский метод open
        this._image.src = link; 
        this._imageCaption.textContent = name;
        this._image.alt = name;
        super.open(); //вызовем родительский метод open уже с учетом строк выше
    }
}