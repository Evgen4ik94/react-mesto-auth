import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, isLoading, onDeleteCard}) {
    //Подтверждение удаления
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard();
    }

    return(
        <PopupWithForm      // Компонент формы - запрос на удаление карточки
            popupName="delete"
            title="Вы уверены?"
            formName="delete-card"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Да"
            isLoading={isLoading}
            onSubmit={handleSubmit}
            loadingBtnText="Удаление..."
        />
    );
}

export default DeleteCardPopup;