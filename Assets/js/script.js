//search bar, button and header
let textInput = document.getElementById("textfield");
let searchButton = document.getElementById("searchbutton");
let weatherBox = document.getElementById("currentWeatherBox");
let forecastBox = document.getElementById("forecastbox")
let buttonBox = document.getElementById("citybuttons")

let coordinate = {
    lat: 0,
    lon: 0
}
let cityName;
let weatherData;
let dailyForecast;
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// // var yyyy = today.getFullYear();

// today = mm + '/' + dd; //+ '/' + yyyy;

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(textInput.value);
    cityName = textInput.value
    geoCoords(textInput.value)
    var cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    cityButton.classList.add('citybuttons');
    buttonBox.append(cityButton);
})



function searchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&exclude=alerts&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            appendWeather(data.current);
        })
}

function searchForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&exclude=alerts&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            appendForecast(data.daily);
        })
}


function geoCoords(city) {

    let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d91f911bcf2c0f925fb6535547a5ddc9`

    fetch(geoApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            coordinate.lat = data[0].lat
            coordinate.lon = data[0].lon
            searchWeather();
            searchForecast();
        })
}


function appendWeather(weatherData) {
    weatherBox.innerHTML = '';
    let cityNameEl = document.createElement("h2");
    let weatherTemp = document.createElement("p");
    let weatherWind = document.createElement("p");
    let weatherUv = document.createElement("p");
    let weatherHumid = document.createElement("p");
    weatherTemp.textContent = 'Temperature: ' + weatherData.temp;
    weatherWind.textContent = 'Wind Speed: ' + weatherData.wind_speed;
    weatherUv.textContent = 'UV: ' + weatherData.uvi;
    weatherHumid.textContent = 'Humidity: ' + weatherData.humidity;
    weatherUv.classList.add('uvbox')
    cityNameEl.textContent = cityName;
    weatherBox.append(cityNameEl);
    cityNameEl.appendChild(weatherTemp);
    cityNameEl.appendChild(weatherWind);
    cityNameEl.appendChild(weatherHumid);
    cityNameEl.appendChild(weatherUv);
};

function appendForecast(dailyForecast) {
    forecastBox.innerHTML = '';
    var textCast = document.getElementById('forecastText');
    var forecastTextDiv = document.getElementById('headerTextDiv');
    forecastTextDiv.style.display = 'inline';
    textCast.style.display = 'inline';
    for (let i = 0; i < dailyForecast.length; i++) {
        if (i < 5) {
            let weatherCard = document.createElement('div');
            weatherCard.classList.add('weathercard')
            weatherCard.innerHTML = '';
            let weatherTemp5 = document.createElement("h3");
            let weatherWind5 = document.createElement("h3");
            let weatherUv5 = document.createElement("h3");
            let weatherHumid5 = document.createElement("h3");
            weatherUv5.classList.add('uvbox');
            weatherTemp5.textContent = 'Temperature: ' + dailyForecast[i].temp.day;
            weatherWind5.textContent = 'Wind Speed: ' + dailyForecast[i].wind_speed;
            weatherUv5.textContent = 'UV: ' + dailyForecast[i].uvi;
            weatherHumid5.textContent = 'Humidity: ' + dailyForecast[i].humidity;
            forecastBox.append(weatherCard);
            //weatherCard.append(today);
            weatherCard.append(weatherTemp5);
            weatherCard.append(weatherWind5);
            weatherCard.append(weatherHumid5);
            weatherCard.append(weatherUv5);
        }
    }
}

function appendCityButtons(params) {

}
