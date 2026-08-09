import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile__page">
      <SideBar />
      <ClothesSection />
    </div>
  );
}

export default Profile;
