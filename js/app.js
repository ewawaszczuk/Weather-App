import {myCoordinates, getWeatherIP, createWeatherModule, getCoordinatesCity} from "./adds.js"
const addCityBtn = document.querySelector("#add-city");
const moduleWeather = document.querySelector(".module__weather");
const findCity = document.querySelector("#search");
const submitbtn = document.querySelector("#submit");
const searchModule = document.querySelector(".module__form");

myCoordinates()
  .then((ip) => getWeatherIP(ip))
  .then((weather) => createWeatherModule(moduleWeather, weather))
  .catch((err) => console.log(err))


addCityBtn.addEventListener("click", function(){
  searchModule.removeAttribute("hidden");
})

submitbtn.addEventListener("click", (event) => {
  const city = findCity.value;
  event.preventDefault()
  getCoordinatesCity(city)
    .then((coordinates) => getWeatherIP(coordinates))
    .then((weather) => {
      let nextModuleWeather = moduleWeather.cloneNode(true);
      document.getElementById("app").appendChild(nextModuleWeather);
      return createWeatherModule(nextModuleWeather, weather);
    })
    .catch((err) => console.log(err))
    searchModule.toggleAttribute("hidden");
});
