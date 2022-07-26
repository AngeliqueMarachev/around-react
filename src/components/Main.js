import React from "react";
import api from "../utils/api.js";
import Card from "./Card";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(() => console.log('something went wrong'));

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(() => console.log('something went wrong'));
  }, []);

  const imageStyle = { backgroundImage: `url(${userAvatar})` };

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
            src={userAvatar}
            alt="profile avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__occupation">{userDescription}</p>
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
