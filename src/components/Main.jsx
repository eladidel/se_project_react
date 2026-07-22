import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ weatherData, clothingItems, onSelectedCard }) {
  return (
    <>
      <main className="main">
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp}° F / You may want to wear:
          </p>
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                return item.weather === weatherData.weather;
              })
              .map((card) => {
                return (
                  <ItemCard
                    card={card}
                    onCardClick={onSelectedCard}
                    key={card._id}
                  />
                );
              })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
