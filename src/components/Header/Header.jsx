import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import mobileButton from "../../images/header-mobile-button.svg";
import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddButton,
  cityName,
  handleLogInButton,
  handleRegisterButton,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__wrap">
        <Link to="/">
          <img src={headerLogo} alt="Header Logo" className="header__logo" />
        </Link>
        <p className="header__location">
          {currentDate}, {cityName}
        </p>
      </div>
      <div className="header__user">
        <ToggleSwitch />
        {!isLoggedIn ? (
          <div className="header__wrap">
            <button
              type="button"
              className="header__button"
              onClick={handleRegisterButton}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__button"
              onClick={handleLogInButton}
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="header__wrap">
            <button
              type="button"
              className="header__button"
              onClick={handleAddButton}
            >
              + Add Cloth
            </button>
            <Link className="header__user-name_type_link" to="/profile">
              <p className="header__user-name">{currentUser.name}</p>
            </Link>
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="header__user-avatar"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
