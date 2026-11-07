import "./ItemModal.css";
import closeIcon from "../../images/close-button.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useContext } from "react";

function ItemModal({ card, handleCloseButton, isOpen, onClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

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
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={onClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
