const API_KEY = "770c1a8a2a12bb23c6b935566ac135f2";
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM';

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];
}, 1000);

getWeatherData();

function getWeatherData () {
  const successCallback = function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;

    fetch(url).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      showWeatherData(data);
    });
  }

  const errorCallback = function (error) {
    console.error(error);
  }

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function showWeatherData (data) {
  const humidity = data.current.humidity;
  const pressure = data.current.pressure;
  const sunrise = data.current.sunrise;
  const sunset = data.current.sunset;
  const wind_speed = data.current.wind_speed;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N ' + data.lon+'E';

  let currentWeatherItems = `
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}hPa</div>
    </div>
    <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed}m/s</div>
    </div>
    <div class="weather-item">
      <div>Sunrise</div>
      <div>${moment(sunrise*1000).format('h:mm a')}</div>
    </div>
    <div class="weather-item">
      <div>Sunset</div>
      <div>${moment(sunset*1000).format('h:mm a')}</div>
    </div>
  `;

  currentWeatherItemsEl.innerHTML = currentWeather
}
function showWeatherData (data) {
  const humidity = data.current.humidity;
  const pressure = data.current.pressure;
  const sunrise = data.current.sunrise;
  const sunset = data.current.sunset;
  const wind_speed = data.current.wind_speed;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N ' + data.lon+'E';

  currentWeatherItems
// Initialize variable for storing other days' forecast HTML
let otherDayForecastHTML = '';

// Loop through daily weather data and generate HTML for current and other days
data.daily.forEach(function(day, idx) {
  if(idx == 0) {
    // Generate HTML for current day
    currentTempEl.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
        alt="weather icon" class="w-icon">
      <div class="other">
        <div class="day">${moment(day.dt*1000).format('dddd')}</div>
        <div class="temp">Night - ${day.temp.night}&#176;C</div>
        <div class="temp">Day - ${day.temp.day}&#176;C</div>
      </div>
    `;
  } else {
    // Generate HTML for other days and append to otherDayForecastHTML
    otherDayForecastHTML += `
      <div class="weather-forecast-item">
        <div class="day">${moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt="weather icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176;C</div>
        <div class="temp">Day - ${day.temp.day}&#176;C</div>
      </div>
    `;
  }
});


  weatherForecastEl.innerHTML = otherDayForcast;
}
