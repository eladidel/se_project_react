import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import userAvatar from "../../images/avatar.svg";
import mobileButton from "../../images/header-mobile-button.svg";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddButton, cityName }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
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
        <div className="header__wrap">
          <button
            type="button"
            className="header__button"
            onClick={handleAddButton}
          >
            + Add Cloth
          </button>
          <Link className="header__user-name_type_link" to="/profile">
            <p className="header__user-name">Terrence Tegegne</p>
          </Link>
          <img
            src={userAvatar}
            alt="User Avatar"
            className="header__user-avatar"
          />
        </div>
        <button className="header__mobile-button">
          <img
            src={mobileButton}
            alt="Mobile Menu"
            className="header__mobile-menu"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
