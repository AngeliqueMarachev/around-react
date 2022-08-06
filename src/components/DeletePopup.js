import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup({
  isLoading,
  isOpen,
  onClose,
  onSubmitDelete,
}) {
  return (
    <PopupWithForm
      title="Are you sure?"
      name="delete-confirm"
      buttonText={`${isLoading ? "Deleting..." : "Yes"}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmitDelete}
    ></PopupWithForm>
  );
}
