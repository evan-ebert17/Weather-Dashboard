# Weather-Dashboard
## Function
This application, after submitting a city in the top left, displays the city with current date, wind speed and other factors. Additionally, it also displays the upcoming forecast for the next 5 days.
## Code
This application uses WeatherApi as the method for getting all of the weather statistics. By clicking the button, we call the api and append its information to the page. First, we take the information we need from the api by drilling into it and targeting the relevant information, and inside this api we have "daily" which is an array of objects, so to get the upcoming week forecast we just loop through that array to get all the days we need.
