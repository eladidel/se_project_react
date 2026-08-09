import "./SideBar.css";
import userAvatar from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="user">
      <img src={userAvatar} alt="Avatar" className="user__avatar" />
      <p className="user__name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
