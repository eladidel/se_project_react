import { useEffect, useState } from "react";

import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, handleServerData } from "../../utils/weatherApi.js";
import {
  defaultClothingItems,
  apiKey,
  coordinates,
} from "../../utils/constants.js";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = handleServerData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddButton={handleAddGarmentButton}
          cityName={weatherData.name}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onSelectedCard={handleSelectedCard}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        handleCloseButton={closeModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            id="name"
            required
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
          <label
            htmlFor="weather"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__input-radio"
              name="weather"
              value="hot"
            />
            Hot
          </label>
          <label
            htmlFor="weather"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__input-radio"
              name="weather"
              value="warm"
            />
            Warm
          </label>
          <label
            htmlFor="weather"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__input-radio"
              name="weather"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseButton={closeModal}
        isOpen={activeModal === "preview"}
      ></ItemModal>
    </div>
  );
}

export default App;
