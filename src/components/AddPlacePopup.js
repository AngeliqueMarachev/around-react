import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const [cardName, setCardName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handlePlaceChange(evt) {
    setCardName(evt.target.value);
  }

  function handlelinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlaceSubmit({
      name: cardName,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="New Place"
      name="new-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`${isLoading ? 'Saving' : 'Save'}`}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_title"
          id="title-input"
          type="text"
          minLength="1"
          maxLength="30"
          name="name"
          value={cardName}
          placeholder="Title"
          required
          onChange={handlePlaceChange}
        />
        <span id="title-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link"
          id="link-input"
          type="url"
          value={link}
          name="link"
          placeholder="Image link"
          required
          onChange={handlelinkChange}
        />
        <span id="link-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
};
