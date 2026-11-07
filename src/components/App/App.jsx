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
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

import { getWeather, handleServerData } from "../../utils/weatherApi.js";
import { apiKey, coordinates } from "../../utils/constants.js";
import api from "../../utils/api.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ClothingItemsContext from "../../contexts/ClothingItemsContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: { F: 999, C: 999 },
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    _id: 0,
    name: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = handleServerData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);

    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);

    api
      .getUser()
      .then((user) => {
        if (!user) {
          signOut();
          return;
        }
        setIsLoggedIn(true);
        setCurrentUser({
          name: user.name,
          avatar: user.avatar,
          _id: user._id,
        });
      })
      .catch(console.error);
  }, []);

  function handleCardLike({ id, isLiked }) {
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  }

  function signOut() {
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", _id: 0 });
    localStorage.removeItem("jwt");
  }

  function openConfirmationModal() {
    setActiveModal("delete");
  }

  function handleCardDlete() {
    api
      .deleteItem(selectedCard._id)
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
    api
      .addItem(inputValues)
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

  function handleLogIn(inputValues, handleReset) {
    api
      .signin(inputValues)
      .then((res) => {
        closeModal();
        handleReset();
        localStorage.setItem("jwt", res.token);
      })
      .catch(console.error);
  }

  function handleLogInButton() {
    setActiveModal("log-in");
  }

  function handleRegister(inputValues, handleReset) {
    api
      .signup(inputValues)
      .then(() => {
        closeModal();
        handleReset();
      })
      .catch(console.error);
  }

  function handleRegisterButton() {
    setActiveModal("register");
  }

  function closeModal() {
    setActiveModal("");
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  function handleEditButton() {
    setActiveModal("edit");
  }

  function handleProfileEdit(inputValues, handleReset) {
    api
      .editUser(inputValues)
      .then((user) => {
        setCurrentUser({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        });
        closeModal();
        handleReset();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, signOut, handleEditButton }}
    >
      <ClothingItemsContext.Provider
        value={{
          clothingItems,
          handleSelectedCard,
          handleAddGarmentButton,
          handleCardLike,
        }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddButton={handleAddGarmentButton}
                cityName={weatherData.name}
                handleLogInButton={handleLogInButton}
                handleRegisterButton={handleRegisterButton}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onSelectedCard={handleSelectedCard}
                      onCardLike={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleOnAddItem}
              onCloseModal={closeModal}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              onClick={openConfirmationModal}
              handleCloseButton={closeModal}
              card={selectedCard}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete"}
              onDeleteClick={handleCardDlete}
              handleCloseButton={closeModal}
              card={selectedCard}
            />
            <LoginModal
              isOpen={activeModal === "log-in"}
              onLogIn={handleLogIn}
              onCloseModal={closeModal}
              handleRegisterButton={handleRegisterButton}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onCloseModal={closeModal}
              handleLogInButton={handleLogInButton}
            />
            <EditProfileModal
              isOpen={activeModal === "edit"}
              onEdit={handleProfileEdit}
              onCloseModal={closeModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
