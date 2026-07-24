import "./ItemModal.css";
import closeIcon from "../../images/close-button.svg";

function ItemModal({ activeModal, card, handleCloseButton, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <div className="modal__content modal__content__type_image">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleCloseButton}
        >
          <img
            src={closeIcon}
            alt="Close Button"
            className="modal__close_image"
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
