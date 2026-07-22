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
  result.weather = getWeatherFeeling(result.temp);
  result.isDay = isDay(data.sys, Date.now());

  return result;
}

function isDay({ sunrise, sunset }, nowTime) {
  return nowTime >= sunrise * 1000 && nowTime < sunset * 1000;
}

function getWeatherFeeling(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
}

export { getWeather, handleServerData };
