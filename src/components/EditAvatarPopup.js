import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();

    function handleSubmit(evt) {
      const avatarValue = avatarRef.current.value
    evt.preventDefault();

    onUpdateAvatar({
        avatar: avatarValue
    });
  }

  return (
    <PopupWithForm
      title="Change profile picture"
      name="new-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`${isLoading ? 'Saving' : 'Save'}`}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link"
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Picture link"
          required
          ref={avatarRef}
        />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
