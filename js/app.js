import {myCoordinates, getWeatherIP, createWeatherModule} from "./adds.js"
const addCityBtn = document.querySelector("#add-city");
const moduleWeather = document.querySelector(".module__weather");



myCoordinates()
  .then((ip) => getWeatherIP(ip))
  .then((weather) => createWeatherModule(moduleWeather, weather))
  .catch((err) => console.log(err))




addCityBtn.addEventListener("click", function(){
  const searchModule = document.querySelector(".module__form");
  searchModule.removeAttribute("hidden");
})
