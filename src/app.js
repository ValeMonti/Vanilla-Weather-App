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
function formatTime(timestamp) {
  let date = new Date(timestamp);
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

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#current-date");
  let time = document.querySelector("#current-time");
  let icon = document.querySelector("#now-icon");

  celsius = response.data.main.temp;

  temperature.innerHTML = `${Math.round(celsius)}°`;
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
  let fahreneit = (celsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahreneit);
}

let celsius = null;

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", search);

let fahreneit = document.querySelector("#fahr-link");
fahreneit.addEventListener("click", showFahreneit);

searchCity("Sydney");
