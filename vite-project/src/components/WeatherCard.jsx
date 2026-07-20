import "../blocks/WeatherCard.css";
import weatherImage from "../images/weathercards/day-sunny.svg";

function WeatherCard(props) {
  return (
    <>
      <div className="weater-card">
        <p className="weather-card__temperature">{props.temperature}°F</p>
        <img
          src={weatherImage}
          alt="Weather card"
          className="weather-card__image"
        />
      </div>
    </>
  );
}

export default WeatherCard;
