import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({
  isOpen,
  onRegister,
  onCloseModal,
  handleLogInButton,
}) {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    validateForm,
  } = useFormWithValidation({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  function handleReset() {
    resetForm({ email: "", password: "", name: "", avatar: "" }, {}, false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      validateForm(evt.target);
      return;
    }
    onRegister(values, handleSubmit);
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      modalClass="modal__submit-button__type_register"
      onClick={handleLogInButton}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          id="user-email"
          className="modal__input"
          placeholder="Email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="modal__error" id="email-error">
            {errors.email}
          </span>
        )}
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          id="user-pasword"
          className="modal__input"
          placeholder="Password"
          required
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error" id="password-error">
            {errors.password}
          </span>
        )}
      </label>
      <label className="modal__label">
        Name*
        <input
          type="name"
          name="name"
          id="user-name"
          className="modal__input"
          placeholder="Name"
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
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          id="user-avatar"
          className="modal__input"
          placeholder="Avatar URL"
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

export default RegisterModal;
