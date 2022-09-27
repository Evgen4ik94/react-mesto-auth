import React from "react";
import Popup from "./Popup";
import successImg from "../images/OK.svg";
import rejectImg from "../images/REJECT.svg";

// Попап-компонент для отображения успешной/не успешной регистрации 
function InfoTooltip({ namePopup, isOpen, onClose, isSuccess }) {
    return (
        <Popup 
            popupName={namePopup}
            isOpen={isOpen}
            onClose={onClose}
        >
            <figure className="infoTooltip__figure">
                <img className="infoTooltip__img" src={isSuccess ? successImg : rejectImg} alt="Статус регистрации" /> 
                <figcaption className="infoTooltip__caption">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
                </figcaption>
            </figure>
        </Popup>
    );
}

export default InfoTooltip;