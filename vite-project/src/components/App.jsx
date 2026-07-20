import { useState } from "react";

import "../blocks/App.css";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import { defaultClothingItems } from "../utils/clothingItems.js";
import { use } from "react";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleSelectedCard(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleAddGarmentButton() {
    setActiveModal("add-garment");
  }

  function closeModal() {
    setActiveModal("");
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddButton={handleAddGarmentButton} />
        <Main
          temperature="75"
          clothingItems={clothingItems}
          selectedCard={handleSelectedCard}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        handleCloseButton={closeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            id="name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            placeholder="Image URL"
            id="imageURL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__input-radio" id="hot" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" className="modal__input-radio" id="warm" />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" className="modal__input-radio" id="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseButton={closeModal}
      ></ItemModal>
    </div>
  );
}

export default App;
