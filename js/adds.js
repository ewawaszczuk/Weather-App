export {myCoordinates, getWeatherIP, createWeatherModule}
const DaysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];



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
    console.log(result);
    return {city: ip.city, day: result };
  } catch(e) {
    console.log(e);
  }
}


function createWeatherModule(module, weather){
  module.getElementsByClassName("city__name")[0].innerText = weather.city;
  document.querySelector("#main-icon").children[0].src = `images/icons/${weather.day[0].overview}.svg`;
  module.getElementsByClassName("temperature__value")[0].innerText = weather.day[0].temp;
  module.getElementsByClassName("pressure__value")[0].innerText = weather.day[0].pressure + "hPa";
  module.getElementsByClassName("humidity__value")[0].innerText = weather.day[0].humidity + "%";
  module.getElementsByClassName("wind-speed__value")[0].innerText = weather.day[0].wind + "m/s";
  const weatherForecast = module.children[1].children[3].children;
  for(var i =0; i<= weatherForecast.length; i++){
    weatherForecast[i].getElementsByClassName("day")[0].innerText =DaysOfWeek[new Date(weather.day[i+1].timestamp* 1000).getDay()]
    weatherForecast[i].getElementsByClassName("temperature__value")[0].innerText = weather.day[i+1].temp;
    weatherForecast[i].children[1].src = `images/icons/${weather.day[i+1].overview}.svg`
  }
  }
