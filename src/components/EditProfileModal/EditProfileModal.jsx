import "./EditProfileModal.css";

import { useContext, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function EditProfileModal({
  isOpen,
  onEdit,
  onCloseModal,
  handleRegisterButton,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    validateForm,
  } = useFormWithValidation({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  function handleReset() {
    resetForm(
      { name: currentUser.name, avatar: currentUser.avatar },
      {},
      false,
    );
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      validateForm(evt.target);
      return;
    }
    onEdit(values, handleReset);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      onClick={handleRegisterButton}
    >
      <label className="modal__label" htmlFor="user-name">
        Name *
        <input
          type="name"
          name="name"
          id="user-name"
          className="modal__input"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="modal__error" id="name-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="modal__label" htmlFor="user-avatar">
        Avatar *
        <input
          type="url"
          name="avatar"
          id="user-avatar"
          className="modal__input"
          required
          aria-invalid={!!errors.avatar}
          aria-describedby={errors.avatar ? "avatar-error" : undefined}
          value={values.avatar}
          onChange={handleChange}
        />
        {errors.avatar && (
          <span className="modal__error" id="avatar-error">
            {errors.avatar}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
