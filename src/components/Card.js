export default class Card {
    constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo')
        .cloneNode(true);    
      return cardElement;
    }
  
    _handleClickLike(evt) {         //Метод меняет состояние кнопки лайка
        evt.target.classList.toggle('photo__button-like_active'); 
        }

    _deleteCard() {           //Метод удаляет карточку
        this._cardElement.remove();
    }
    
    _setEventListeners() {
        this._cardElement.querySelector('.photo__button-like').addEventListener('click', (evt) => { //Отслеживаем клик по лайку
          this._handleClickLike(evt); //Меняем состояние кнопки лайка
        });
    
        this._cardElement.querySelector('.photo__button-delete').addEventListener('click', () => {    //Отслеживаем клик по кнопке "удалить"
          this._deleteCard(); //
        });
    
        this._cardElement.querySelector('.photo__item').addEventListener('click', () => this._handleOpenFullImage({
          name: this._name,
          link: this._link
        }));
      }
    
    generateCard() {
    this._card = this._getTemplate(); // Метод создает разметку карточки
    this._card.querySelector('.photo__item').src = this._link;
    this._card.querySelector('.photo__description').textContent = this._name;
    this._card.querySelector('.photo__item').alt = this._name;
    this._setEventListeners();
    return this._card;
    }
}

