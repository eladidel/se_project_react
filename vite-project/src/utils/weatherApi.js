function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getWeather({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then(handleServerResponse);
}

function handleServerData(data) {
  const result = {};

  result.name = data.name;
  result.temp = data.main.temp;
  result.condition = data.weather[0].main.toLowerCase();
  result.weather = getWeatherCondition(result.temp);
  result.isDay = isDay(data);
  return result;
}

function isDay({}) {}

function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
}

export { getWeather, handleServerData };
