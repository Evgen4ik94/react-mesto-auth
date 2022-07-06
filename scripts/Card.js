export default class Card {
    constructor({name, link}, cardSelector, bindImagePopupOpenHandler, bindLikeCardHandler, bindCardDeleteHandler) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._bindImagePopupOpenHandler = bindImagePopupOpenHandler;
    this._bindCardDeleteHandler = bindCardDeleteHandler;
    this._bindLikeCardHandler = bindLikeCardHandler;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo')
      .cloneNode(true);    
      this._cardElement = cardElement;
    }

    _getConstants () {
        this._imgElement = this._cardElement.querySelector('.photo__item');
        this._imgTextElement = this._cardElement.querySelector('.photo__title');
        this._likeButton = this._cardElement.querySelector('.photo__button-like');
        this._deleteButton = this._cardElement.querySelector('.photo__button-delete');
      }    

    _handleClickLike(evt) {         //Метод меняет состояние кнопки лайка
        evt.target.classList.toggle('photo__button-like_active'); 
        }

    _deleteCard() {           //Метод удаляет карточку
        this._cardElement.remove();
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', (e) => { //Отслеживаем клик по лайку
          this._handleClickLike(e); //Меняем состояние кнопки лайка
        });
    
        this._deleteButton.addEventListener('click', () => {    //Отслеживаем клик по кнопке "удалить"
          this._deleteCard(); //
        });
    
        this._imgElement.addEventListener('click', () => this._bindImagePopupOpenHandler({
          name: this._name,
          link: this._link
        }));
      }
    

    generateCard() {
    this._getTemplate(); // Метод создает разметку карточки
    this._getConstants(); // Метод создает константы
    this._setEventListeners();
    this._deleteCard();
    this._imgElement.src = this._link;
    this._imgTextElement.textContent = this._name;
    this._imgElement.alt = this._name;
    return this._cardElement;
    }
}

