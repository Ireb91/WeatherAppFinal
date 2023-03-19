function displayTemperature(response) {
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(response.data.temperature.current);
}
let apiKey = "037a67b0fd6f93o58ea5b48t0191c6c9";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&&units=metric`;
axios.get(apiUrl).then(displayTemperature);
