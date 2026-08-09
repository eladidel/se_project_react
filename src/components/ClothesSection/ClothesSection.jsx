import { useContext } from "react";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  const { clothingItems, handleSelectedCard } =
    useContext(ClothingItemsContext);

  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__header-title">Your items</p>
        <button className="clothes__header-button">+ Add new</button>
      </div>
      <div className="clothes__cards">
        {clothingItems.map((card) => {
          return (
            <ItemCard
              card={card}
              onCardClick={handleSelectedCard}
              key={card._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ClothesSection;
