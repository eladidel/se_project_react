import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ temperature, clothingItems, selectedCard }) {
  return (
    <>
      <main className="main">
        <WeatherCard temperature={temperature} />
        <section className="cards">
          <p className="cards__text">
            Today is {temperature}° F / You may want to wear:
          </p>
          <ul className="cards__list">
            {clothingItems.map((card) => {
              return (
                <ItemCard
                  card={card}
                  onCardClick={selectedCard}
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
