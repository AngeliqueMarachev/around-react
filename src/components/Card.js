import React from "react";

export default function Card({ card, onCardClick }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="gallery__card">

      <img className="gallery__item" style={cardStyle} src={card.link} alt={`${card.name}`} onClick={handleClick} />
      <button type="button" class="gallery__delete-button"></button>
      <div className="gallery__info">
        <h2 className="gallery__text">{card.name}</h2>
        <div className="gallery__likes-container">
          <button type="button" className="gallery__heart-icon">
            {card.likes.length}
          </button>
          <div className="gallery__likes"></div>
        </div>
      </div>
    </li>
  );
}
