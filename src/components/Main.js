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

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(stateCard => stateCard !== card));
    });
  }
  
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
            // <Card key={card._id} card={card} onCardClick={onCardClick} />
            <Card
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              key={card._id}
              card={card} 
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;