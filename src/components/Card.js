export default class Card {
    constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._data = data;
    }
    
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo')
        .cloneNode(true);    
      this._card = cardElement;
    }
  
    _getCardElements() {
      this._image = this._card.querySelector('.photo__item');
      this._caption = this._card.querySelector('.photo__title');
      this._likeBtn = this._card.querySelector('.photo__button-like');
      this._deleteBtn = this._card.querySelector('.photo__button-delete');
    }

    _handleClickLike(evt) {         //Метод меняет состояние кнопки лайка
        evt.target.classList.toggle('photo__button-like_active'); 
        }

    _deleteCard(evt) {           //Метод удаляет карточку
      const card = evt.target.closest('.photo');
      card.remove();
      this._card = null;    
    }
    _setEventListeners() {
        this._likeBtn.addEventListener('click', (evt) => { //Отслеживаем клик по лайку
          this._handleClickLike(evt); //Меняем состояние кнопки лайка
        });
    
        this._deleteBtn.addEventListener('click', (evt) => {    //Отслеживаем клик по кнопке "удалить"
          this._deleteCard(evt); //
        });
    
        this._image.addEventListener('click', () => this._handleCardClick({
          name: this._name,
          link: this._link
        }));
      }
    
    generateCard() {
    this._getTemplate(); // Метод создает разметку карточки
    this._getCardElements();
    this._setEventListeners();
    this._image.src = this._link;
    this._caption.textContent = this._name;
    this._image.alt = this._name;
    return this._card;
    }
}

