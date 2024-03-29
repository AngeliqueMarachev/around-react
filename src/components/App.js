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
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res)
    })
      .catch(() => console.log("something went wrong"));
    api
      .getCardsList()
      .then((data) => {
        setCards(data)
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

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(() => console.log("something went wrong"));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((stateCard) => stateCard !== card));
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => console.log("something went wrong"));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => console.log("something went wrong"))
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        })
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => console.log("something went wrong"))
  }

  function handleAddPlaceSubmit(name, url) {
    setIsLoading(true);
    api
      .addCard(name, url)
      .then((res) => {
        //console.log(res)
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(() => console.log("something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

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
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
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
