export default class Api {
    constructor(baseLink, token) {
      this._baseLink = baseLink;
      this._token = token;
    }

    _fetchInfo(url, properties) { 
      return fetch(this._baseLink + url, properties)
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getUserInfo() {
      return this._fetchInfo('/users/me', {
        headers: {
          authorization: this._token
        }
      });
    }
  
    updUserInfo(dataForm) {
      return this._fetchInfo('/users/me', {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
      });
    }

    getInitialCards() {
        return this._fetchInfo('/cards', {
          headers: {
            authorization: this._token
          }
        });
      }
    
    // Запрос удаления карточки с сервера
    deleteCard(id) {
      return this._fetchInfo('/cards/' + id, {
       method: 'DELETE',
        headers: {
          authorization: this._token
        }
      });
    }

    uploadCard(item) {
      return this._fetchInfo('/cards', {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
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
        headers: {
          authorization: this._token
        }
      });
    }

    changeAvatar(link) {    //Запрос на изменение аватара
      return this._fetchInfo('/users/me/avatar', { //передаем адрес в запрос
        method: 'PATCH',  //передаем метод
        headers: {
          authorization: this._token,  //передаем уникальный заголовок
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //в тело запроса кладем введенную юзером ссылку на аватар
          avatar: link  //в свойство avatar тела запроса кладем ссылку на аватар
        })
      })
    }      
}