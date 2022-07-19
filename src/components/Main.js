import React from "react";

function Main() {
    function handleEditAvatarClick() {
        const avatarChangePopup = document.querySelector('.popup_type_avatar-change');
        avatarChangePopup.classList.add('popup_open');
    }

    function handleEditProfileClick() {
        const avatarChangePopup = document.querySelector('.popup_type_profile');
        avatarChangePopup.classList.add('popup_open');
    }

    function handleAddPlaceClick() {
        const avatarChangePopup = document.querySelector('.popup_type_add-card');
        avatarChangePopup.classList.add('popup_open');
    }

    return (
        <main className="page__content">
            <section className="profile">
                <div onClick={handleEditAvatarClick} className="profile__avatar-container">
                    <img
                        className="profile__avatar"
                        id="avatar"
                        src=" "
                        alt="profile avatar"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">Jacques Cousteau</h1>
                    <p className="profile__occupation">Explorer</p>
                    <button type="button" className="profile__edit-button"></button>
                    <button onClick={handleEditProfileClick} className="profile__edit-button"></button>
                </div>
                <div>
                    <button onClick={handleAddPlaceClick} className="profile__add-button" type="button" ></button>

                </div>
            </section>
        
            <section className="gallery">
                <ul className="gallery__grid"></ul>
            </section>
        </main>
    );
}

export default Main;