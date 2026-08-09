import "./ModalWithForm.css";
import buttonX from "../../images/close-button.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  onCloseModal,
  isOpen,
  onSubmit,
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
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
