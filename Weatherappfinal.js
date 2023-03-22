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
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(response.data.temperature.current);
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

let apiKey = "037a67b0fd6f93o58ea5b48t0191c6c9";
let city = "San Diego";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&&units=metric`;
axios.get(apiUrl).then(displayTemperature);
