var currentConditionsEl = document.querySelector("#currentConditions");
var forecastEl = document.getElementById("forecast");
var cityInputEl = document.querySelector("#cityInput");
var cityHistoryEl = document.querySelector("#cityHistory");
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('cityName');
var displayDate = document.getElementById('displayDate');
var apiKey = `998e80efa5c136b60b9c41d58573f307`
const currentDate = dayjs().format("MM/DD/YYYY");
displayDate.innerHTML = `<h2 id="displayDate">${currentDate}<img src="https://openweathermap.org/img/wn/10d@2x.png"></h2>`


function convertLocation(cityName) {
    geolocationURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(geolocationURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentConditionsEl.innerHTML = `<div id="currentConditions">
        <h2>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")})<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}10d@2x.png"></h2>
        <p>Temperature: ${data.main.temp}</p> 
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind: ${data.wind.speed}</p>
        </div>`
        });

geolocationURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
fetch(geolocationURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        forecastEl.innerHTML = ""
        for (i = 2; i < data.list.length; i = i + 8) {
            console.log(data.list[i]);
            forecastEl.innerHTML += `<div class="card" style="width: 18rem;" style="height: 40rem;">
            <img>
            <div class="card-body">
              <h5 class="card-title"></h5>
                <p class="card-text">Temperature:${data.list[i].main.temp}</p>
                <p class="card-text">Humidity:${data.list[i].main.humidity}</p>
                <p class="card-text">Wind Speed:${data.list[i].wind.speed}</p>
            </div>
          </div>`
        }
    })}

cityInput.addEventListener('submit', function (event) {
    event.preventDefault();
    convertLocation(cityName.value);
})
