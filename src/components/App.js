import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        // setCurrentUser(res);
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch(() => console.log("something went wrong"));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // function handleUpdateUser(newData) { 
  //   api
  //     .editProfile(newData)
  //     .then((res) => {
  //       setCurrentUser({
  //         name: res.name,
  //         about: res.about,
  //         avatar: res.avatar,
  //         _id: res._id,
  //       });
  //     })
  //     .catch(console.log);
  //   closeAllPopups();
  // }

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name, about })
      .then(res => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
         _id: res._id,
        })
        closeAllPopups();
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          title="New Place"
          name="new-place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_title"
              id="title-input"
              type="text"
              minLength="1"
              maxLength="30"
              name="name"
              placeholder="Title"
              required
            />
            <span id="title-input-error" className="popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_link"
              id="link-input"
              type="url"
              name="link"
              placeholder="Image link"
              required
            />
            <span id="link-input-error" className="popup__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Change profile picture"
          name="new-avatar"
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
            <span id="avatar-input-error" className="popup__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Are you sure?"
          name="delete-confirm"
          buttonText="Yes"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
