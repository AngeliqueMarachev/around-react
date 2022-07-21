import React from "react";

function ImagePopup({ card }) {
    return (
        <div className={`"popup popup_type_preview ${card ? 'popup_open' : ''}`}>
            <div className="popup__content popup__content_content_preview">
                <button type="button" className="popup__close"></button>
                <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
                <p className="popup__caption">{card ? card.name : ''}</p>
                <button type="button" aria-label="Close" className="popup__close popup__close_preview"></button>
            </div>
        </div>
    );
}

export default ImagePopup;