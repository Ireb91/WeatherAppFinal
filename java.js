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

function formatDate(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let daysoftheweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysoftheweek[day];
}

function displayForecast(response) {
  let forecastweek = response.data.daily;
  let forecastElement = document.querySelector("#weatherforecast");
  let forecastHTML = `<div class="row">`;
  forecastweek.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 mt-3 text-center"> 
      <div class="fw-bold" id="forecastdate">${formatDate(
        forecastday.time
      )}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastday.condition.icon
        }.png" class="mx-auto d-block" alt=""/>
          <div class="forecast-temperatures">
           <span class="fw-bold" id="max">${Math.round(
             forecastday.temperature.maximum
           )}°</span>
           <span id="min">${Math.round(forecastday.temperature.minimum)}°</span>
          </div>  
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrieveCoords(coordinates) {
  console.log(coordinates);
  let apiKey = "037a67b0fd6f93o58ea5b48t0191c6c9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  retrieveCoords(response.data.coordinates);
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
  searchcityform.reset();
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
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
  axios.get(apiUrl2).then(displayForecast);
}

let celsius = null;

let searchcityform = document.querySelector("#search-city-form");
searchcityform.addEventListener("submit", search);

navigator.geolocation.getCurrentPosition(showCurrentLocation);

displayForecast();
