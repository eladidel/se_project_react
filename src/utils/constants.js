const apiKey = "2fe55a64e70ca210a2bc823e42280ec2";

const coordinates = { latitude: 26.1275862, longitude: -80.2331036 };

const weatherConditionOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/weathercards/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/weathercards/day/clouds.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../images/weathercards/day/fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/weathercards/day/rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/weathercards/day/snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../images/weathercards/day/storm.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "drizzle",
    url: new URL("../images/weathercards/day/rain.svg", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../images/weathercards/night/clear.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../images/weathercards/night/fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/weathercards/night/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/weathercards/night/snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../images/weathercards/night/storm.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "drizzle",
    url: new URL("../images/weathercards/night/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/weathercards/night/clouds.svg", import.meta.url)
      .href,
  },
];

export { apiKey, coordinates, weatherConditionOptions };
