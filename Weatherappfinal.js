function currentTime() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let daysoftheweek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysoftheweek[date.getDay()];
  console.log(day);
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let degreeselement = document.querySelector("#degrees");
  celsius = response.data.temperature.current;
  degreeselement.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  console.log(response);
  city.innerHTML = response.data.city;
  let overview = document.querySelector("#general");
  overview.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let current = document.querySelector("#current");
  current.innerHTML = currentTime();
  let weathericon = document.querySelector("#icon");
  weathericon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weathericon.setAttribute("alt", `{response.data.condition.description}`);
}

function showCity(city) {
  let apiKey = "037a67b0fd6f93o58ea5b48t0191c6c9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  showCity(cityinput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let degreeselement = document.querySelector("#degrees");
  let fahrenheit = (celsius * 9) / 5 + 32;
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  degreeselement.innerHTML = Math.round(fahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let degreeselement = document.querySelector("#degrees");
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  degreeselement.innerHTML = Math.round(celsius);
}

let celsius = null;

let searchcityform = document.querySelector("#search-city-form");
searchcityform.addEventListener("submit", search);

let fahrenheitlink = document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click", showFahrenheit);

let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", showCelsius);
