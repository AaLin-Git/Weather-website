function formatDate() {
  let date = new Date();
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let months = [
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

  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let todayDate = document.querySelector(`#current-date`);
  let currentTime = document.querySelector(`#time`);
  todayDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;
  currentTime.innerHTML = `${currentHours}:${currentMinutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `26310790c7af07b3a6f2f1bf2272d7f2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row next">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="weather-forecast-date">
        ${day}
      </div>
      <div>
        <img class="animated-icon" src="img/clear.svg" width="40" />
      </div>
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">18</span>
      <span class="weather-forecast-temperature-min">11</span>
      </div>
    </div>
  
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let city = document.querySelector(`h1`);
  let temp = document.querySelector(`.currentTemperature`);
  let iconElements = document.querySelector(`.animated-icon`);
  let wind = document.querySelector(`.wind-speed`);
  let humidityElement = document.querySelector(`.humidity`);
  let descriptionElement = document.querySelector(`.description`);

  celsiusTemperature = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  temp.innerHTML = Math.round(celsiusTemperature);
  iconElements.setAttribute(`src`, `img/${response.data.weather[0].main}.svg`);
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  descriptionElement.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );

  formatDate();
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `26310790c7af07b3a6f2f1bf2272d7f2`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function changeFahrenheit(event) {
  event.preventDefault();
  pressCelsius.classList.remove(`active`);
  pressFahrenheit.classList.add(`active`);
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheit = document.querySelector(`.currentTemperature`);
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault;
  let celsius = document.querySelector(`.currentTemperature`);
  celsius.innerHTML = celsiusTemperature;
  pressCelsius.classList.add(`active`);
  pressFahrenheit.classList.remove(`active`);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showGpsWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  let temp = document.querySelector(`.currentTemperature`);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector(`h1`);
  let iconElements = document.querySelector(`.animated-icon`);
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector(`.wind-speed`);
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(`.humidity`);
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(`.description`);
  temp.innerHTML = temperature;
  h1.innerHTML = response.data.name;
  iconElements.setAttribute(`src`, `img/${response.data.weather[0].main}.svg`);
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  descriptionElement.innerHTML = capitalizeFirstLetter(description);
}

function getGpsPosition(position) {
  let apiKey = "26310790c7af07b3a6f2f1bf2272d7f2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showGpsWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getGpsPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = cityInputElement.value;
}

let celsiusTemperature = null;

let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, handleSubmit);

let pressFahrenheit = document.querySelector(`#fahrenheit`);
pressFahrenheit.addEventListener(`click`, changeFahrenheit);

let pressCelsius = document.querySelector(`#celsius`);
pressCelsius.addEventListener(`click`, changeCelsius);

let pressCurrent = document.querySelector(`#current-button`);
pressCurrent.addEventListener(`click`, getCurrentPosition);

search(`Amsterdam`);
