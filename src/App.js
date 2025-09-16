import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Ararat");
  const [weatherDate, setWeatherDate] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "c062885baedc29a7f7d29062c1d61271";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherDate(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]); // fetches new data when city changes

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      setCity(searchInput.trim());
      setSearchInput(""); // clear input field after searching
    }
  };

  const getWeatherIconUrl = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
      case "Clouds":
        return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
      case "Rain":
        return "https://cdn-icons-png.flaticon.com/512/3351/3351972.png";
      case "Snow":
        return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-gradient-to-b from-blue-200 to-blue-500 bg-opacity-80 rounded-2xl shadow-xl p-4 w-64 flex flex-col items-center space-y-4 border border-white border-opacity-40">
        {weatherDate && weatherDate.main && weatherDate.weather && (
          <>
            <h1 className="text-lg font-semibold text-gray-800">
              {formattedDate}
            </h1>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-blue-900">
                {weatherDate.name}
              </h2>
              <img
                src={getWeatherIconUrl(weatherDate.weather[0].main)}
                alt="Weather Icon"
                width={100}
                height={100}
                className="my-2"
              />
            </div>
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              {Math.round(weatherDate.main.temp - 273.15)}°C
            </h2>
            <p className="text-sm text-white drop-shadow-lg">
              {weatherDate.weather[0].main}
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-white bg-opacity-80 rounded-full p-2 shadow-md flex items-center space-x-2 border border-gray-300 w-full mt-2"
            >
              <input
                value={searchInput}
                onChange={handleInputChange}
                type="text"
                placeholder="Search city"
                className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 flex-1"
              />
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-700"
              >
                🔍
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
