import {myCoordinates, getWeatherIP, createWeatherModule, getCoordinatesCity} from "./adds.js"
const addCityBtn = document.querySelector("#add-city");
const moduleWeather = document.querySelector(".module__weather");
const findCity = document.querySelector("#search");
const submitbtn = document.querySelector("#submit");
const searchModule = document.querySelector(".module__form");
const closeSearching = document.querySelector(".btn--close");
const body = document.querySelector("body");
let deleteButton = moduleWeather.querySelector(".btn--close");


myCoordinates()
  .then((ip) => getWeatherIP(ip))
  .then((weather) => createWeatherModule(moduleWeather, weather))
  .catch((err) => console.log(err))


addCityBtn.addEventListener("click", function(){
  searchModule.toggleAttribute("hidden");
})

closeSearching.addEventListener("click", () => {
  searchModule.toggleAttribute("hidden");
})

submitbtn.addEventListener("click", (event) => {
  event.preventDefault()
  const city = findCity.value;
  body.classList.toggle("loading");
  getCoordinatesCity(city)
    .then((coordinates) => getWeatherIP(coordinates))
    .then((weather) => {
      let nextModuleWeather = moduleWeather.cloneNode(true);

      document.getElementById("app").appendChild(nextModuleWeather);
      return createWeatherModule(nextModuleWeather, weather);
    })
    .catch((err) => console.log(err))
    .then(body.classList.toggle("loading"));
    searchModule.toggleAttribute("hidden");

});
