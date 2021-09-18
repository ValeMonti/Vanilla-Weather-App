function displayTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

let apiKey = "d9d50f2f019894bca4e62266dfe12e78";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
