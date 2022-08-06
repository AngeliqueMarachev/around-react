import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  const [isUrlInputValid, setIsUrlInputValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

    function handleSubmit(evt) {
      const avatarValue = avatarRef.current.value
    evt.preventDefault();

    onUpdateAvatar({
        avatar: avatarValue
    });
    }

  function checkInputValidity(evt) {
    if (!evt.target.validity.valid) {
      setIsUrlInputValid(false);
      setErrorMessage(evt.target.validationMessage);
    } else {
      setIsUrlInputValid(true);
      setErrorMessage('');
    }
  }
    
  return (
    <PopupWithForm
      title="Change profile picture"
      name="new-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isInvalid={!isUrlInputValid}
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
          onChange={checkInputValidity}
        />
        <span
          id="avatar-input-error"
          className={`popup__input-error ${!isUrlInputValid && 'popup__error_visible'}`}>
          {errorMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}
