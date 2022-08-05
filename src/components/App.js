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
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
    api
      .getCardsList()
      .then(data => {
        setCards(data);
        // .getCardsList()
        // .then(res => {
        // const formattedCards = res.map((card) => ({title: card.name, url: card.link, etc}))
        //   setCards(formattedCards);
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

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch(() => console.log("something went wrong"))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        });
      })
      .catch(() => console.log("something went wrong"))
      .finally(() => {
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
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

        {/* <PopupWithForm
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
        </PopupWithForm> */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
