import React, {useState, useEffect} from "react";
import Card from "./Card";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);
  useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        const cardList = result;
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <>
      <section className="profile">
          <div className="profile__avatar">
            <button onClick={props.onEditAvatar} className="profile__avatar-button">
              <img
                src={currentUser.avatar}
                alt="Фото профиля"
                className="profile__image"
              />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__name-box">
              <h1 className="profile__name text">{currentUser.name || ""}</h1>
              <button
                className="profile__button profile__button-edit"
                onClick={props.onEditProfile}
                type="button"
              />
            </div>
            <div className="profile__prof text">{currentUser.about || ""}</div>
          </div>
        <button
          className="profile__button profile__button-add"
          onClick={props.onAddPlace}
          type="button"
        />
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              likeCounter={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
