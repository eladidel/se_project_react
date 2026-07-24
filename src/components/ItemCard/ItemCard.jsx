import "./ItemCard.css";

function ItemCard({ onCardClick, card }) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
