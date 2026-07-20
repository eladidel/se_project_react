import "../blocks/Header.css";
import headerLogo from "../images/header-logo.svg";
import userAvatar from "../images/avatar.svg";

function Header({ handleAddButton }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <header className="header">
        <div className="header__wrap">
          <img src={headerLogo} alt="Header Logo" className="header__logo" />
          <p className="header__location">{currentDate}, city</p>
        </div>
        <div className="header__wrap">
          <button
            type="button"
            className="header__button"
            onClick={handleAddButton}
          >
            + Add Cloth
          </button>
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            src={userAvatar}
            alt="User Avatar"
            className="header__user-avatar"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
