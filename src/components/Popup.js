import React from "react";

//Создание универсального компонента для отображения любого попапа
function Popup({ isOpen, onClose, popupName, children, isImagePopup}) {
    //Используем `useEffect` для обработчика закрытия попапа на Esc
    React.useEffect( () => {
        if (!isOpen) return; //Если попап не! открыт, то обработчик не навешиваем

        // объявляем функцию, чтобы не терялась ссылка при рендере компонента
        function closeByEscape(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        // Навешиваем обработчик на открытый попап
        document.addEventListener('keydown', closeByEscape);
        // Снимаем обработчик в clean-up функции
        return () => document.removeEventListener('keydown', closeByEscape);
    }, [isOpen, onClose])

    //Создаем обработчик на закрытие по оверлею
    const handleCloseByOverlay = (e) => {
        onClose();
    };

    //Рендерим верстку любого объекта с классом popup и классом popup-opened при открытии. 
    return (
        <section
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            //Добавляем закрытие на оверлей
            onClick={handleCloseByOverlay}
        >
        {/* Создаем контейнер для контента попапа согласно его типу
          у ImagePopup свой контейнер, а у остальных одинаковый
          из-за этого делаем условие на котором будет отображаться тот или иной попап (пропсами)
        */}
            <div className={`${isImagePopup ? 'popup_type_fullscreen-image' : `popup__container popup__container_type_${popupName}`}`}>
                {/*Размещаем здесь контент попапа*/}
                {children}
                {/*Размещаем кнопку-крестик закрытия (она есть у любого попапа)*/}
                <button className="popup__button-close" type="button" onClick={onClose} />
            </div>
        </section>
    );
}

export default Popup;