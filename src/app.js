function formatDate(timestamp) {
  let fullDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[fullDate.getDay()];
  let date = fullDate.getDate();
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
  let month = months[fullDate.getMonth()];

  let year = fullDate.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
function formatTime() {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour} : ${minute}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let daysForecast = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="card" style="width: 11rem">
      <div class="card-body">
      <h4 class="card-title">${day}</h4>
      <img
      src="http://openweathermap.org/img/wn/01d@2x.png"
      alt=""
      width="35"
      />
      <h4 class="card-title">20&deg;</h4>
      </div>
      </div>
      `;
  });

  daysForecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "d9d50f2f019894bca4e62266dfe12e78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#current-date");
  let time = document.querySelector("#current-time");
  let icon = document.querySelector("#now-icon");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = `${Math.round(celsiusTemperature)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `humidity: ${response.data.main.humidity} %`;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  time.innerHTML = formatTime(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "d9d50f2f019894bca4e62266dfe12e78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
function showFahreneit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahreneitLink.classList.add("active");
  let fahreneit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahreneit)}°`;
}
function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahreneitLink.classList.remove("active");
  temperature.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", search);

let fahreneitLink = document.querySelector("#fahr-link");
fahreneitLink.addEventListener("click", showFahreneit);
let celsiusLink = document.querySelector("#cels-link");
celsiusLink.addEventListener("click", showCelsius);

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "d9d50f2f019894bca4e62266dfe12e78";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

function handleGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let geoButton = document.querySelector("#local-button");
geoButton.addEventListener("click", handleGeolocation);

searchCity("Sydney");
