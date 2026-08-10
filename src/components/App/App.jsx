import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import { getWeather, handleServerData } from "../../utils/weatherApi.js";
import { apiKey, coordinates } from "../../utils/constants.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ClothingItemsContext from "../../contexts/ClothingItemsContext.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: { F: 999, C: 999 },
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = handleServerData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  function openConfirmationModal() {
    setActiveModal("delete");
  }

  function handleCardDlete() {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id != selectedCard._id;
          }),
        );
        closeModal();
      })
      .catch(console.error);
  }

  function handleOnAddItem(inputValues, handleReset) {
    addItem(inputValues)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
        handleReset();
      })
      .catch(console.error);
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

  return (
    <ClothingItemsContext.Provider
      value={{ clothingItems, handleSelectedCard, handleAddGarmentButton }}
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
            onClick={openConfirmationModal}
          />
          <DeleteConfirmationModal
            card={selectedCard}
            handleCloseButton={closeModal}
            isOpen={activeModal === "delete"}
            onDeleteClick={handleCardDlete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </ClothingItemsContext.Provider>
  );
}

export default App;
