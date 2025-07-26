import React, { useState } from 'react';
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import err from "../images/error.png";

const Myapp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "6d83156e4e40ca97d0c6924b832fe00c";

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "Clouds":
      case "Haze":
        return cloud;
      case "Rain":
        return rain;
      case "Clear":
        return clear;
      case "Mist":
        return mist;
      default:
        return cloud;
    }
  };

  const myFun = async () => {
    if (search.trim() === "") {
      setError("Please Enter Name");
      setData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.cod === "404") {
        setError("Please Enter Valid Name !");
        setData(null);
      } else {
        setData(jsonData);
        setError("");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong. Please try again.");
      setData(null);
    }

    setSearch("");
  };

  return (
    <>
      <div className="container">
        <div className="inputs">
          <input
            placeholder="Enter city, Country"
            value={search}
            onChange={handleInput}
          />
          <button onClick={myFun}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div>
          {error && (
            <div className="errorPage">
              <p>{error}</p>
              <img src={err} alt="Error icon" />
            </div>
          )}

          {data && data.weather && (
            <div className="weathers">
              <h2 className="cityName">{data.name}</h2>
              <img
                src={getWeatherImage(data.weather[0].main)}
                alt={data.weather[0].main}
              />
              <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
              <p className="climate">{data.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Myapp;
