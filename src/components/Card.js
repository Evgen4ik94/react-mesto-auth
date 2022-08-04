export default class Card {
    constructor(data, userId, cardSelector, handleCardClick, handleDelBtnClick, handleLikeBtnClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._data = data;
    this._handleDelBtnClick = handleDelBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
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
      this._likeCounter = this._card.querySelector('.photo__count');
    }

    _handleClickLike(evt) {         //Метод меняет состояние кнопки лайка
      this._handleLikeBtnClick(this._cardId, this._likes.some(item => item._id === this._userId))
      .then(res => {
        this._likes = res.likes;
        this._likeCounter.textContent = res.likes.length;
        evt.target.classList.toggle('photo__button-like_active');
      })
      .catch(err => console.log(err));
    }

    _deleteCard() {           //Метод удаляет карточку
      this._card.remove();
      this._card = null;    
    }

    _handleDelete() { //Иконка корзинки только на "своих" карточках
      if (this._userId !== this._ownerId) {
        this._deleteBtn.remove();
      }
      if (this._likes.some(item => item._id === this._userId)) {
        this._likeBtn.classList.add('photo__button-like_active');
      }
    }
    
    _setEventListeners() {
        this._likeBtn.addEventListener('click', (evt) => { //Отслеживаем клик по лайку
          this._handleClickLike(evt); //Меняем состояние кнопки лайка
        });
    
        this._deleteBtn.addEventListener('click', () => {    //Отслеживаем клик по кнопке "удалить"
          this._handleDelBtnClick(this._cardId, () => this._deleteCard()); //
        });
    
        this._image.addEventListener('click', () => this._handleCardClick({
          name: this._name,
          link: this._link
        }));
      }
    
    generateCard() {
    this._getTemplate(); // Метод создает разметку карточки
    this._getCardElements(); // Получаем элементы карточки, содержимое которых надо перезаписать
    this._setEventListeners(); // Добавляем функционал карточки (удаление, лайк, открытие большого размера)
    this._handleDelete(); //Убираем иконку удаления с чужих карточек
    this._image.src = this._link;
    this._caption.textContent = this._name;
    this._image.alt = this._name;
    this._likeCounter.textContent = this._likes.length;
    return this._card;
    }
}

