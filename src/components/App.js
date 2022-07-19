import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />

    <div className="popup popup_type_profile">
      <div className="popup__content">
        <h2 className="popup__title">Edit Profile</h2>
        <button
          type="button"
          aria-label="close button"
          className="popup__close popup__close_profile"
        ></button>
     
        <form
          className="popup__form popup__form-edit"
          name="profileForm"
          novalidate
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
          <button
            type="submit"
            className="button popup__button popup__button_disabled"
          >
            Save
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_add-card">
      <div className="popup__content">
        <h2 className="popup__title">New place</h2>
        <button
          type="button"
          aria-label="close button"
          className="popup__close popup__close_add-card"
        ></button>

        <form
          className="popup__form popup__form-create"
          name="new place"
          novalidate
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
          <button type="submit" class="popup__button popup__button_disabled">
            Create
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_avatar-change">
      <div className="popup__content">
        <h2 className="popup__title">Change profile picture</h2>
        <button
          type="button"
          aria-label="close button"
          className="popup__close popup__close_add-avatar"
        ></button>

        <form
          claclassNamess="popup__form popup__form-create"
          name="new-avatar"
          novalidate
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
          <button type="submit" class="popup__button popup__button_disabled">
            Save
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_confirm-delete">
      <div className="popup__content">
        <h2 className="popup__title">Are you sure?</h2>
        <button
          type="button"
          aria-label="close button"
          class="popup__close popup__close_delete-confirm"
        ></button>

        <form 
        action="#"
        className="popup__form popup__form-confirm"
          name="delete-confirm"
          novalidate
        >
          <button type="submit" class="popup__button popup__button_delete">
            Yes
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_preview">
      <div className="popup__content popup__content_content_preview">
        <button
          type="button"
          aria-label="close button"
          className="popup__close popup__close_preview"
        ></button>
        <img className="popup__image" src="#" alt="#" />
        <div className="popup__text"></div>
      </div>
      </div>
  
   </div>
  );
}

export default App;
