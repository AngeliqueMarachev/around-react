import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Edit Profile"
      name="profile-form"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          name="user"
          value={name}
          placeholder="Name"
          required
          onChange={handleNameChange}
        />
        <span id="name-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_occupation"
          id="occupation-input"
          type="text"
          minLength="2"
          maxLength="200"
          name="occupation"
          value={description}
          placeholder="About me"
          required
          onChange={handleDescriptionChange}
        />
        <span id="occupation-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}