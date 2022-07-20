import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick() {
    console.log("Clicked");
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
  
      <PopupWithForm
        title="Edit Profile"
        name="profile-form" //"edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            minlength="2"
            maxlength="40"
            name="user"
            placeholder="Name"
            required
          />
          <span id="name-input-error" class="popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_occupation"
            id="occupation-input"
            type="text"
            minlength="2"
            maxlength="200"
            name="occupation"
            placeholder="About me"
            required
          />
          <span id="occupation-input-error" class="popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title="New Place"
        name="new-place" //"new-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label class="popup__label">
          <input
            className="popup__input popup__input_type_title"
            id="title-input"
            type="text"
            minlength="1"
            maxlength="30"
            name="name"
            placeholder="Title"
            required
          />
          <span id="title-input-error" class="popup__input-error"></span>
        </label>
        <label class="popup__label">
          <input
            className="popup__input popup__input_type_link"
            id="link-input"
            type="url"
            name="link"
            placeholder="Image link"
            required
          />
          <span id="link-input-error" class="popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title="Change profile picture"
        name="new-avatar" //"owner-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_link"
            id="avatar-input"
            type="url"
            name="avatar"
            placeholder="Picture link"
            required
          />
          <span id="avatar-input-error" class="popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title="Are you sure?"
        name="delete-confirm" //"remove-card"
        buttonText="Yes"
        onClose={closeAllPopups}
      ></PopupWithForm>

      {/* <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup> */}
      <ImagePopup />

    </div>
  );
}

export default App;
