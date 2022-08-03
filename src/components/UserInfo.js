export default class UserInfo {
    constructor({userSelector, aboutSelector, avatarSelector}) {
      this._userName = document.querySelector(userSelector);
      this._userAbout = document.querySelector(aboutSelector);
      this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() { //Передаем данные пользователя
      return {
        userName: this._userName.textContent,
        userAbout: this._userAbout.textContent
      };
    }

    setUserInfo(data) {  //Устанавливаем полученные данные пользователя
      this._userName.textContent = data.name;
      this._userAbout.textContent = data.about;
    }

    setUserAvatar(link) {  //Передаем в атрибут аватара src ссылку на новый аватар
      this._avatar.src = link;
    }

    setUserId(id) {     //Присваиваем пользователю идентификатор
      this._userId = id
    }
  
    getUserId() {     //Получаем идентификатор пользователя
      return this._userId;
    }
}