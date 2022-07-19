export default class UserInfo {
    constructor({userSelector, aboutSelector}) {
      this._userName = document.querySelector(userSelector);
      this._userAbout = document.querySelector(aboutSelector);
    }

    getUserInfo() { //Передаем данные пользователя
      return {
        userName: this._userName.textContent,
        userJob: this._userAbout.textContent
      };
    }

    setUserInfo(data) {  //Устанавливаем полученные данные пользователя
      this._userName.textContent = data.name;
      this._userAbout.textContent = data.about;
    }
}