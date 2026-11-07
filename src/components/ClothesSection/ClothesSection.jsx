import { useContext } from "react";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ClothesSection() {
  const {
    clothingItems,
    handleSelectedCard,
    handleAddGarmentButton,
    handleCardLike,
  } = useContext(ClothingItemsContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__header-title">Your items</p>
        <button
          type="button"
          className="clothes__header-button"
          onClick={handleAddGarmentButton}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__cards">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((card) => {
            return (
              <ItemCard
                card={card}
                onCardClick={handleSelectedCard}
                key={card._id}
                onCardLike={handleCardLike}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ClothesSection;
