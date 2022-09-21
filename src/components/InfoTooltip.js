import React from "react";
import Popup from "./Popup";
import "../images/OK.svg";
import "../images/REJECT.svg";

// Попап-компонент для отображения успешной/не успешной регистрации 
function InfoTooltip({isOpen, onClose, popupName, Success}) {
    return (
        <Popup 
            popupName={popupName}
            isOpen={isOpen}
            onClose={onClose}
        >
            <figure className="figure__infoTooltip">
                
            </figure>
        </Popup>
    )
}