import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, card, onSubmit }) {
    const [buttonText, setButtonText] = React.useState("Да");
    //Подтверждение удаления
    function handleSubmit(e) {
        e.preventDefault();
        setButtonText("Удаление...");
        onSubmit(card)
            .then(() => {
                setButtonText("Да");
            })
    }

    return(
        <PopupWithForm      // Компонент формы - запрос на удаление карточки
            name="delete"
            title="Вы уверены?"
            formName="delete-card"
            isOpen={isOpen}
            onClose={onClose}
            submitText={buttonText}
            onSubmit={handleSubmit}
        />
    );
}

export default DeleteCardPopup;