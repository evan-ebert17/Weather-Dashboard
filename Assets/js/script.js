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



function searchWeather () {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&exclude=alerts&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)

    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        appendWeather(data.current);
        
    })
    // .then(data => {
    //     console.log(data.daily)
    // })
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
        })
}


function appendWeather(weatherData) {
    //apend
    weatherBox.innerHTML = '';
    let cityNameEl = document.createElement("h2");
    // let dayDate = document.createElement("h2");
    let weatherTemp = document.createElement("p");
    let weatherWind = document.createElement("p");
    let weatherUv = document.createElement("p");
    let weatherHumid = document.createElement("p");
    weatherTemp.textContent = 'Temperature: ' + weatherData.temp;
    weatherWind.textContent = 'Wind Speed: ' + weatherData.wind_speed;
    weatherUv.textContent = 'UV: ' + weatherData.uvi;
    weatherHumid.textContent = 'Humidity: ' + weatherData.humidity;
    cityNameEl.textContent = cityName;
    weatherBox.append(cityNameEl);
    cityNameEl.appendChild(weatherTemp);
    cityNameEl.appendChild(weatherWind);
    cityNameEl.appendChild(weatherHumid);
    cityNameEl.appendChild(weatherUv);
};

// function appendForecast(dailyForecast) {
//     // let cityNameEl5 = document.createElement("h2");
//     // let dayDate = document.createElement("h2");
//     let weatherTemp5 = document.createElement("p");
//     let weatherWind5 = document.createElement("p");
//     let weatherUv5 = document.createElement("p");
//     let weatherHumid5 = document.createElement("p");
//     weatherTemp5.textContent = dailyForecast.temp;
//     weatherWind5.textContent = dailyForecast.wind_speed;
//     weatherUv5.textContent = dailyForecast.uvi;
//     weatherHumid5.textContent = dailyForecast.humidity;
//     // cityNameEl5.textContent = cityName;
//     forecastBox.append(weatherTemp5);
//     forecastBox.append(weatherWind5);
//     forecastBox.append(weatherHumid5);
//     forecastBox.append(weatherUv5);

// }

function appendCityButtons(params) {
    
}
