import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ onCardClick, card, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = card.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = isLiked
    ? "card__like-default card__like-liked"
    : "card__like-default";

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike({ id: card._id, isLiked });
  }
  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <button
        type="button"
        className={itemLikeButtonClassName}
        onClick={handleLike}
      ></button>
      <img
        src={card.imageUrl}
        alt={card.name}
        className="card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
