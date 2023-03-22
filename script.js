const getWeatherForecast = async (cityName) => {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": Process.env.API_KEY,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

const displayCityName = async (weatherData) => {
  const displayCityDiv = document.getElementById("city-description");
  const cityName = weatherData.location.name;
  const countryName = weatherData.location.country;
  const element = `<h2>Ini adalah cuaca ${cityName}, ${countryName}</h2>`;
  displayCityDiv.innerHTML = element;
};

const displayCurrentWeather = async (weatherData) => {
  const currentWeather = {
    condition: weatherData.current.condition.text,
    conditionImage: weatherData.current.condition.icon,
    conditionTemp: weatherData.current.temp_c,
    conditionHumidity: weatherData.current.humidity,
    conditionUpdated: weatherData.current.last_updated,
  };
  const displayCurrentWeatherDiv = document.getElementById("current-weather");

  const element = `
  <div class="weather-container">
  <h2>Today Weather</h2>
  <p style="text">"${currentWeather.condition}"</p>
  <img src="https:${currentWeather.conditionImage}" class="weather-image">
  <p>temperature: ${currentWeather.conditionTemp}</p>
  <p>humidity: ${currentWeather.conditionHumidity}</p>
  <p>updated at ${currentWeather.conditionUpdated}</p>
  </div>
  `;

  displayCurrentWeatherDiv.innerHTML = element;
};

const displayWeatherForecast = async (weatherData) => {
  const forecasts = weatherData.forecast.forecastday;
  const weatherForecastDiv = document.getElementById("weather-forecast");

  let listElement = "";
  for (let i = 0; i < forecasts.length; i++) {
    const forecastData = {
      date: forecasts[i].date,
      avgHumiditiy: forecasts[i].day.avghumidity,
      avgTemp: forecasts[i].day.avgtemp_c,
      condition: forecasts[i].day.condition.text,
      conditionImage: forecasts[i].day.condition.icon,
      maxTemp: forecasts[i].day.maxtemp_c,
      minTemp: forecasts[i].day.mintemp_c,
    };
    const element = `
    <div class="weather-container">
    <h1>Weather of ${forecastData.date}</h1>
    <p>"${forecastData.condition}"</p>
    <img src="https:${forecastData.conditionImage}">
    <p>Average Temperture: ${forecastData.avgTemp}</p>
    <p>(Maximum: ${forecastData.avgTemp}, Minimum: ${forecastData.minTemp})</p>
    <p>Average Humadity: ${forecastData.avgHumiditiy}</p>
    </div>
    `;
    listElement += element;
  }
  weatherForecastDiv.innerHTML = listElement;
};

const searchWeather = async () => {
  // Argument ini akan digantikan dengan kata dari formulir search
  const formValue = document.getElementById("city-name").value;
  if (!formValue) {
    return null;
  }
  const weatherData = await getWeatherForecast(formValue);
  if (!weatherData.error) {
    displayCityName(weatherData);
    displayCurrentWeather(weatherData);
    displayWeatherForecast(weatherData);
  }
};

// date: Tanggal
// day.avghumidity: Rata-rata kelembaban pada hari tersebut
// day.avgtemp_c: Rata-rata temperatur pada hari tersebut
// day.condition.text: Keterangan dari cuaca pada hari tersebut
// day.condition.icon: Gambar yang mewakili suasana dari cuaca pada hari tersebut
// day.maxtemp_c: Temperatur maksimal pada hari tersebut
// day.mintemp_c: Temperatur minimal pada hari tersebut
