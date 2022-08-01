import React from "react";
import api from "../utils/api.js";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);
  


  React.useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(() => console.log('something went wrong'));
  }, []);


  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  
  return (
    <main className="page__content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={onEditAvatarClick}
          style={imageStyle}
        >
          <img
            className="profile__avatar"
            id="avatar"
            src={currentUser.avatar}
            alt="profile avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__occupation">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfileClick}
          />
        </div>
        <div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlaceClick}
          />
        </div>
      </section>

      <section className="gallery">
        <ul className="gallery__grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
