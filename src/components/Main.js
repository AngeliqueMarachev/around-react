import React from "react";

function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick }) {

    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatarClick} >
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