import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";

import { getWeather, handleServerData } from "../../utils/weatherApi.js";
import {
  defaultClothingItems,
  apiKey,
  coordinates,
} from "../../utils/constants.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ClothingItemsContext from "../../contexts/ClothingItemsContext.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: { F: 999, C: 999 },
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function handleOnAddItem(inputValues, handleReset) {
    setClothingItems([...clothingItems, inputValues]);
  }

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

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
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
    <ClothingItemsContext.Provider
      value={{ clothingItems, handleSelectedCard }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddButton={handleAddGarmentButton}
              cityName={weatherData.name}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onSelectedCard={handleSelectedCard}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleOnAddItem}
            onCloseModal={closeModal}
          />
          <ItemModal
            card={selectedCard}
            handleCloseButton={closeModal}
            isOpen={activeModal === "preview"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </ClothingItemsContext.Provider>
  );
}

export default App;
