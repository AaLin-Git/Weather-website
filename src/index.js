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

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(`.currentTemperature`);
  let temperature = Math.round(response.data.main.temp);
  let iconElements = document.querySelector(`.animated-icon`);
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector(`.wind-speed`);
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(`.humidity`);
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(`.description`);
  temp.innerHTML = temperature;
  iconElements.setAttribute(`src`, `img/${response.data.weather[0].main}.svg`);
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  descriptionElement.innerHTML = capitalizeFirstLetter(description);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#city-input`);
  let apiKey = `26310790c7af07b3a6f2f1bf2272d7f2`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=${unit}`).then(showWeather);

  let h1 = document.querySelector(`h1`);
  h1.innerHTML = cityInput.value;
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

let date = new Date();

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

let celsiusTemperature = null;

getCurrentPosition();

let currentDay = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];

let currentHours = date.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let todayDate = document.querySelector(`#current-date`);
todayDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;

let currentTime = document.querySelector(`#time`);
currentTime.innerHTML = `${currentHours}:${currentMinutes}`;

let secondDay = document.querySelector(`#second-day`);
secondDay.innerHTML = days[(date.getDay() + 1) % 7];

let thirdDay = document.querySelector(`#third-day`);
thirdDay.innerHTML = days[(date.getDay() + 2) % 7];

let fourthDay = document.querySelector(`#fourth-day`);
fourthDay.innerHTML = days[(date.getDay() + 3) % 7];

let fifthDay = document.querySelector(`#fifth-day`);
fifthDay.innerHTML = days[(date.getDay() + 4) % 7];

let sixthDay = document.querySelector(`#sixth-day`);
sixthDay.innerHTML = days[(date.getDay() + 5) % 7];

let form = document.querySelector(`#button`);
form.addEventListener(`click`, showCity);

let pressFahrenheit = document.querySelector(`#fahrenheit`);
pressFahrenheit.addEventListener(`click`, changeFahrenheit);

let pressCelsius = document.querySelector(`#celsius`);
pressCelsius.addEventListener(`click`, changeCelsius);

let pressCurrent = document.querySelector(`#current-button`);
pressCurrent.addEventListener(`click`, getCurrentPosition);
