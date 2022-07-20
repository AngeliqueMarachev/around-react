import React from "react";
import api from "../utils/api.js";

function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick }) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    // const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo().then(data => {
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        //   updateLoading(false);
        });
      });

    const imageStyle ={ backgroundImage: `url(${userAvatar})` };

    return (
        <main className="page__content">
            <section className="profile">

                <div className="profile__avatar-container" onClick={onEditAvatarClick} style={imageStyle}>
                    <img
                        className="profile__avatar"
                        id="avatar"
                        src={userAvatar}
                        alt="profile avatar"
                    />
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">Jacques Cousteau</h1>
                    <p className="profile__occupation">Explorer</p>
               
                    <button type="button" className="profile__edit-button" onClick={onEditProfileClick}></button>
                </div>
                <div>
                    <button type="button"  className="profile__add-button"onClick={onAddPlaceClick}></button>
                </div>
            </section>
        
            <section className="gallery">
                <ul className="gallery__grid"></ul>
            </section>
        </main>
    );
}

export default Main;