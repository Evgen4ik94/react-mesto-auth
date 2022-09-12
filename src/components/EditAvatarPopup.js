import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const [buttonText, setButtonText] = React.useState("Сохранить");
    const avaRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        setButtonText("Загрузка...");
        props
            .onUpdateAvatar({
                avatar: avaRef.current.value
            })
            .then(() => {
                handleClosePopup();
            })
            .finally(() => {
                setButtonText("Сохранить");
            })
    }

    function handleClosePopup() {
        props.onClose();
        setTimeout(() => (avaRef.current.value = ""), 200);
    }

    return (
        <PopupWithForm
          onSubmit={handleSubmit}
          name="avatar"
          title="Изменить аватар"
          submitText={buttonText}
          isOpen={props.isOpen}
          onClose={handleClosePopup}
        >
            <input
              ref={avaRef}
              className="popup__input popup__input_type_link"
              id="avatar-item"
              type="url"
              name="avatar"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__input-error" id="avatar-item-error"></span>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;