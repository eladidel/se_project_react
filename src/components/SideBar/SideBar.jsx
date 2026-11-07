import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar() {
  const { currentUser, signOut, handleEditButton } =
    useContext(CurrentUserContext);

  return (
    <div className="user">
      <div className="user__wrap">
        <img src={currentUser.avatar} alt="Avatar" className="user__avatar" />
        <p className="user__name">{currentUser.name}</p>
      </div>
      <button
        type="button"
        className="user__button user__edit"
        onClick={handleEditButton}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="user__button user__logout"
        onClick={signOut}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
