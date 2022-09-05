import React from "react";

function PopupWithForm({isOpen, name, onClose, title, children, submitText}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <form className="popup__form" name={name} noValidate>
          <button
            className="popup__button-close"
            onClick={onClose}
            type="button">
          </button>
          <h2 className="popup__head">{title}</h2>
            {children}
          <button className="popup__button-submit" type="submit" disabled>
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
