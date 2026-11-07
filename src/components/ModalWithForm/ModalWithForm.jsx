import "./ModalWithForm.css";
import buttonX from "../../images/close-button.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  onCloseModal,
  isOpen,
  onSubmit,
  isValid,
  modalClass = "",
  onClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-button"
          onClick={onCloseModal}
        >
          <img
            src={buttonX}
            alt="Close Button"
            className="modal__close_image"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
          <button
            type="submit"
            className={
              title === "Log In" || title === "Sign Up"
                ? `modal__submit-button ${modalClass}`
                : "modal__submit-button"
            }
            disabled={!isValid}
          >
            {buttonText}
          </button>
          {title === "Log In" || title === "Sign Up" ? (
            <button
              type="button"
              className="modal__register-button"
              onClick={onClick}
            >
              {title === "Sign Up" ? "Or Log In" : "Or Sign Up"}
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
