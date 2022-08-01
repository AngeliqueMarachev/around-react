import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `gallery__delete-button ${isOwn ? 'gallery__delete-button_visible' : 'gallery__delete-button_hidden'}`
); 

  const cardLikeButtonClassName = (
    `gallery__like-button ${isLiked ? 'gallery__like-button_visible' : 'gallery__like-button_hidden'}`
  );
   
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="gallery__card">
      <img
        className="gallery__item"
        src={card.link}
        alt={`${card.name}`}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName}></button>
      
      <div className="gallery__info">
        <h2 className="gallery__text">{card.name}</h2>
        <div className="gallery__likes-container">
          <button type="button" className={cardLikeButtonClassName}></button>
          <div className="gallery__likes">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}
