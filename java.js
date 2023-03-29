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

function displayForecast() {
  let forecastElement = document.querySelector("#weatherforecast");
  let forecastHTML = `<div class="row"`;
  forecastHTML =
    forecastHTML +
    `  <div class="row">
                  <div class="col-2"> 
                  <div class="forecastdate">Mon</div>
                  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" alt=""/>
                  <div class="forecast-temperatures">
                    <span id="max">20°</span>
                    <span id="min">18°</span>
                  </div>  
                  </div>
                  </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let degreeselement = document.querySelector("#degrees");
  let city = document.querySelector("#city");
  let overview = document.querySelector("#general");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let current = document.querySelector("#current");
  let weathericon = document.querySelector("#icon");
  celsius = response.data.temperature.current;
  degreeselement.innerHTML = Math.round(response.data.temperature.current);
  city.innerHTML = response.data.city;
  overview.innerHTML = response.data.condition.description;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  current.innerHTML = currentTime();
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

function showCurrentWeather(response) {
  let degreeselement = document.querySelector("#degrees");
  let city = document.querySelector("#city");
  let overview = document.querySelector("#general");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let current = document.querySelector("#current");
  let weathericon = document.querySelector("#icon");
  celsius = response.data.temperature.current;
  degreeselement.innerHTML = Math.round(response.data.temperature.current);
  city.innerHTML = response.data.city;
  overview.innerHTML = response.data.condition.description;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  current.innerHTML = currentTime();
  weathericon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weathericon.setAttribute("alt", `{response.data.condition.description}`);
}

function showCurrentLocation(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiKey = "037a67b0fd6f93o58ea5b48t0191c6c9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let celsius = null;

let searchcityform = document.querySelector("#search-city-form");
searchcityform.addEventListener("submit", search);

let fahrenheitlink = document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click", showFahrenheit);

let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", showCelsius);

navigator.geolocation.getCurrentPosition(showCurrentLocation);

displayForecast();
