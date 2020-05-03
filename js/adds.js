export {myCoordinates, getWeatherIP, createWeatherModule, getCoordinatesCity}
const DaysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const body = document.querySelector("body");

async function myCoordinates(){
  try{
    let ip = await fetch('http://ip-api.com/json/');
    ip = await ip.json();
    return {lat: ip.lat, lon: ip.lon, city: ip.city}
  } catch(e) {
    console.log(e);
  }
}

async function getWeatherIP(ip){
  const apiKey = "6dbebd5b597dddcc96b26f5a575cf31b";
  const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${ip.lat}&lon=${ip.lon}&appid=${apiKey}&units=metric`;

  try{
    let weather = await fetch(urlWeather);
    weather = await weather.json();
    const Weather7dayTable = weather.daily;
    let result =  Weather7dayTable.map((day) => {
      return {
        temp: day.temp.day,
        overview: day.weather[0].main,
        pressure: day.pressure,
        humidity: day.humidity,
        wind: day.wind_speed,
        timestamp: day.dt
      }
    });
    return {city: ip.city, day: result };
  } catch(e) {
    console.log(e);
  }
}

function changeWeather(city, module) {
    body.classList.toggle("loading");
    getCoordinatesCity(city)
      .then((coordinates) => getWeatherIP(coordinates))
      .then((weather) => {
        return createWeatherModule(module, weather);
    })
    .catch((error) => console.log(error))
    .then(body.classList.toggle("loading"));
}


function createWeatherModule(module, weather){
  module.getElementsByClassName("city__name")[0].innerText = weather.city;
  document.querySelector("#main-icon").children[0].src = `images/icons/${weather.day[0].overview}.svg`;
  module.getElementsByClassName("temperature__value")[0].innerText = weather.day[0].temp;
  module.getElementsByClassName("pressure__value")[0].innerText = weather.day[0].pressure + "hPa";
  module.getElementsByClassName("humidity__value")[0].innerText = weather.day[0].humidity + "%";
  module.getElementsByClassName("wind-speed__value")[0].innerText = weather.day[0].wind + "m/s";
  const weatherForecast = Array.from(module.children[1].children[3].children);
  weatherForecast.forEach((element, index) => {
    element.getElementsByClassName("day")[0].innerText = DaysOfWeek[new Date(weather.day[index +1].timestamp* 1000).getDay()];
    element.querySelector("img").setAttribute("src", `images/icons/${weather.day[index +1].overview}.svg`)
    element.querySelector(".temperature__value").innerText = weather.day[index +1].temp;
  });
  let deleteButton = module.querySelector(".btn--close");
  deleteButton.addEventListener("click", function () {
    this.parentNode.remove();
  });
  let changeBtn = module.querySelector(".change_button");
  changeBtn.addEventListener("click", () =>  {
    let city = module.querySelector(".city__name");
    city.setAttribute("contentEditable", true);
    city.focus();
    city.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      changeWeather(city.innerText, module);
      city.classList.remove("active");
      city.setAttribute("contentEditable", false);
    }
});
});
}

async function getCoordinatesCity(city){
  const key = "44777d08-ab13-4022-947d-a900a63bcccd";
  const url = ` https://graphhopper.com/api/1/geocode?key=${key}&q=${city}`;
  try{
    let coordinates = await fetch(url);
    coordinates = await coordinates.json();
    return {lat: coordinates.hits[0].point.lat, lon: coordinates.hits[0].point.lng, city: city}

  } catch(e) {
    console.log(e);
    }
}
