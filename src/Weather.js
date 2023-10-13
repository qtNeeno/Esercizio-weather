import React, { useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState("");
  const [userWeather, setUserWeather] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const valueHandler = (event) => {
    setUserWeather(event.target.value);
  };

  const eventHandler = () => {
  
    const queryParams = `?q=${userWeather}&appid=${apiKey}`;
    fetch(apiUrl + queryParams)
      .then((response) => response.json())
      .then((data) => {
        setWeather([data]);
        // setWeather([...weather, data]);
      })
      .catch((error) => {
        console.log("Errore nella richiesta api", error);
      })
    setUserWeather("");

  };
  return (
    <div className="container">
      <h1>Enter a City Name</h1>
    <input type="text" onChange={valueHandler} value={userWeather} className="input"/>
    <button type="button" onClick={eventHandler} className="button">
      GET
    </button>
    {weather.length > 0 && (
      <div>
        <h2>Current weather:</h2>
        <ul className="weather">
          {weather.map((data, index) => (
            <li key={index} className="list">
              <strong>Città:</strong> {data.name}<br />
              <strong>Descrizione:</strong> {data.weather[0].description}<br />
              <strong>Temperatura:</strong> {data.main.temp}°C<br />
              <strong>Pressione:</strong> {data.main.pressure} hPa<br />
              <strong>Umidità:</strong> {data.main.humidity}%
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
};

export default Weather;
