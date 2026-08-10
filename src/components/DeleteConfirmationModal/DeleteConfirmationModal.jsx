import "./DeleteConfirmationModal.css";
import closeIcon from "../../images/close-button.svg";

function DeleteConfirmationModal({
  card,
  handleCloseButton,
  isOpen,
  onDeleteClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <div className="modal__content modal__content__type_delete">
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
        <p className="delete-modal__title">
          Are you sure you want to delete this item?
          <span className="delete-modal__span">
            This action is irreversible.
          </span>
        </p>
        <button
          type="button"
          className="delete-modal__button delete-modal__delete-button"
          onClick={onDeleteClick}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="delete-modal__button delete-modal__cancel-button"
          onClick={handleCloseButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
