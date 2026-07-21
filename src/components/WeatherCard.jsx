import "../blocks/WeatherCard.css";
import { weatherConditionOptions } from "../utils/constants.js";

import weatherImage from "../images/weathercards/day/clear.svg";

function WeatherCard({ weatherData }) {
  const currentWeatherCondition = weatherConditionOptions.filter((option) => {
    return option.day == true;
  });

  return (
    <>
      <div className="weater-card">
        <p className="weather-card__temperature">{weatherData.temp}°F</p>
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
