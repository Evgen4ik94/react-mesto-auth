export default class Api {
    constructor(options) {
      this._options = options;
    }

    _fetchInfo(url, properties) { 
      return fetch(this._options.baseLink + url, properties)
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getUserInfo() {
      return this._fetchInfo('/users/me', {
        headers: this._options.headers
      });
    }
  
    updUserInfo(dataForm) {
      return this._fetchInfo('/users/me', {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify(dataForm)
      });
    }

    getInitialCards() {
        return this._fetchInfo('/cards', {
          headers: this._options.headers
        });
      }
    
    // Запрос удаления карточки с сервера
    deleteCard(id) {
      return this._fetchInfo('/cards/' + id, {
       method: 'DELETE',
       headers: this._options.headers
      });
    }

    uploadCard(item) {
      return this._fetchInfo('/cards', {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify(item)
      });
    }
  
    likeCard(id, liked) {
      let method;
      if (liked) {
        method = 'DELETE';
      } else {
        method = 'PUT';
      }
      return this._fetchInfo('/cards/likes/' + id, {
        method: method,
        headers: this._options.headers
      });
    }

    changeAvatar(link) {    //Запрос на изменение аватара
      return this._fetchInfo('/users/me/avatar', { //передаем адрес в запрос
        method: 'PATCH',  //передаем метод
        headers: this._options.headers,
        body: JSON.stringify({ //в тело запроса кладем введенную юзером ссылку на аватар
          avatar: link  //в свойство avatar тела запроса кладем ссылку на аватар
        })
      })
    }      
}