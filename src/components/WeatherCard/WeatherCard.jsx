import "./WeatherCard.css";
import { weatherConditionOptions } from "../../utils/constants.js";

import weatherImage from "../../images/weathercards/day/clear.svg";

function WeatherCard({ weatherData }) {
  const currentWeatherCondition = weatherConditionOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  return (
    <div className="weather-card">
      <p className="weather-card__temperature">{weatherData.temp}°F</p>
      <img
        src={currentWeatherCondition[0]?.url}
        alt="Weather card"
        className="weather-card__image"
      />
    </div>
  );
}

export default WeatherCard;
