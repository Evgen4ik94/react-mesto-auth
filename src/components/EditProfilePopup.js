import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {  //Выносим компонент из App и 
    const currentUser = React.useContext(CurrentUserContext); //подключаем контекст
    //Создаем стейт-переменные для формы редактирования профиля
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [buttonText, setButtonText] = React.useState("Сохранить");

    function handleNameChange (e) { //Ф-я изменения имени 
        setName(e.target.value);
    }

    function handleAboutChange (e) { //Ф-я изменения инф-ии "О себе"
        setDescription(e.target.value);
    }

    function handleSubmit (e) { //Добавляем обработчик handleSubmit
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        setButtonText("Загрузка...");
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({ //Обновляем данные
                name: name,
                about: description
            })
            .then(() => props.onClose())
            .catch((err) => console.log(err))
            .finally(() => {
                setButtonText("Сохранить"); //Возвращаем текст кнопки
            });
    }
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (props.isOpen === true) {
            setName(currentUser.name);
            setDescription(currentUser.about);   
        } // eslint-disable-next-line
    }, [props.isOpen]);

    return (
        <PopupWithForm //Далее "пробрасываем" пропсы
          name="form"
          title="Редактировать профиль"
          submitText={buttonText}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <input
              className="popup__input popup__input_type_name"
              id="name-item"
              type="text"
              name="name"
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              value={name} //Привязываем стейт-переменную name к полю ввода
              onChange={handleNameChange} //Добавляем обработчик onChange
              required
            />
            <span className="popup__input-error" id="name-item-error"></span>
            <input
              className="popup__input popup__input_type_about"
              id="about-item"
              type="text"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              value={description} //Привязываем стейт-переменную description к полю ввода
              onChange={handleAboutChange} //Добавляем обработчик onChange
              required
            />
            <span className="popup__input-error" id="about-item-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;