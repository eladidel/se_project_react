import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onLogIn, onCloseModal, handleRegisterButton }) {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    validateForm,
  } = useFormWithValidation({ email: "", password: "" });

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  function handleReset() {
    resetForm({ email: "", password: "" }, {}, false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      validateForm(evt.target);
      return;
    }
    onLogIn(values, handleReset);
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      modalClass="modal__submit-button__type_login"
      onClick={handleRegisterButton}
    >
      <label className="modal__label" htmlFor="user-email">
        Email
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
      <label className="modal__label" htmlFor="user-password">
        Password
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
    </ModalWithForm>
  );
}

export default LoginModal;
