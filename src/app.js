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
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `humidity: ${response.data.main.humidity} %`;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  time.innerHTML = formatTime(response.data.dt * 1000);
}

let apiKey = "d9d50f2f019894bca4e62266dfe12e78";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
