"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPage = createPage;
exports.backgroundImg = backgroundImg;
exports.getTown = getTown;
exports.timeNow = timeNow;

require("core-js/modules/es6.regexp.split");

var _request = _interopRequireDefault(require("./request"));

var _country = _interopRequireDefault(require("./country"));

var _circle = _interopRequireDefault(require("../dist/assets/images/circle.png"));

var _search = _interopRequireDefault(require("../dist/assets/images/search.png"));

var _switch = _interopRequireDefault(require("../dist/assets/images/switch.png"));

var _down = _interopRequireDefault(require("../dist/assets/images/down.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BODY = ['main__section1', 'main__wrapper'];
const MAIN_SECTION1 = ['main__section1__box', 'main__section1__search'];
const MAIN_SECTION1_BOX = ['main__section1__switch-photo', 'main__section1__switch-lang', 'main__section1__switch-temperature'];
const MAIN_SECTION1_SWITCH_TEMPERATURE = ['switch-temperature-item-C', 'switch-temperature-item-F'];
const MAIN_SECTION1_SEARCH = ['main__section1__search-flex'];
const MAIN_WRAPPER = ['main__box', 'main__section4'];
const MAIN_BOX = ['main__section2', 'main__section3'];
const MAIN_SECTION2 = ['main__section2__town', 'main__section2__day', 'main__section2__temperature'];
const MAIN_SECTION2__TEMPERATURE_DESCRIPTION = ['main__section2__element', 'main__section2__element', 'main__section2__element', 'main__section2__element'];
const MAIN_SECTION3 = ['main__section3__weather', 'main__section3__weather', 'main__section3__weather'];
const MAIN_SECTION3_WEATHER = ['main__section3__weather-day', 'main__section3__weather-temperature'];
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let lat;
let long;

async function addLoc() {
  const location = (0, _request.default)('https://ipinfo.io/json?token=fa763d842192af');

  try {
    const {
      loc
    } = await location;
    const [latitude, longitude] = loc.split(',');
    lat = latitude;
    long = longitude;
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "Latitude: ".concat(latitude);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "Longitude: ".concat(longitude);
    return [].push(lat, long);
  } catch (err) {
    return err;
  }
}

function createSearch() {
  const input = document.createElement('input');
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.src = _search.default;
  input.classList.add('main__section1__search-input');
  div.classList.add('search-flex-item');
  div.append(img);
  document.getElementsByClassName('main__section1__search-flex')[0].append(input);
  document.getElementsByClassName('main__section1__search-flex')[0].append(div);
}

function createButton() {
  const button = document.createElement('button');
  button.classList.add('main__section1__search-button');
  button.innerHTML = 'search';
  document.getElementsByClassName('main__section1__search')[0].append(button);
}

async function getTown() {
  const location = (0, _request.default)('https://ipinfo.io/json?token=fa763d842192af');

  try {
    const {
      city,
      country,
      timezone
    } = await location;
    document.getElementsByClassName('main__section2__town')[0].innerHTML = "".concat(city, ", ").concat(_country.default[country]);
    return [city, country, timezone];
  } catch (err) {
    return err;
  }
}

async function weatherOnWeek() {
  const countDay = 7;
  const [,, timezone] = await getTown();
  let date = new Date().toLocaleString('en-EN', {
    timeZone: "".concat(timezone)
  });
  date = new Date(date);
  document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = "".concat(DAY_FULL[(+date.getDay() + 1) % countDay]);
  document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = "".concat(DAY_FULL[(+date.getDay() + 2) % countDay]);
  document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = "".concat(DAY_FULL[(+date.getDay() + 3) % countDay]);
}

async function timeNow() {
  const [,, timezone] = await getTown();
  let date = new Date().toLocaleString('en-EN', {
    timeZone: "".concat(timezone)
  });
  date = new Date(date);
  let minute = date.getMinutes();

  if (minute < 10) {
    minute = "0".concat(date.getMinutes());
  }

  document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
}

async function createTemperature() {
  const divFirst = document.createElement('div');
  const img = document.createElement('img');
  const divSecond = document.createElement('div');
  const span = document.createElement('span');
  const divFirstImage = document.createElement('img');
  divFirst.classList.add('main__section2__temperature-now');
  img.classList.add('main__section2__temperature-img');
  divSecond.classList.add('main__section2__temperature-description');
  divFirstImage.classList.add('temperature-now-img');
  divFirstImage.src = _circle.default;
  divFirst.append(span);
  divFirst.append(divFirstImage);
  document.getElementsByClassName('main__section2__temperature')[0].append(divFirst);
  document.getElementsByClassName('main__section2__temperature')[0].append(img);
  document.getElementsByClassName('main__section2__temperature')[0].append(divSecond);
  let town;
  let countryName;

  try {
    const [city, country] = await getTown();
    town = city;
    countryName = country;
  } catch (err) {
    return err;
  }

  const req = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(town, ",").concat(countryName, "&key=1231c4541af04c7ea7f7b23e65949802"));

  try {
    const weatherNow = await req;
    const data = weatherNow.data[0];
    span.innerHTML = Math.round(data.temp);
    img.src = "https://raw.githubusercontent.com/KirillKub/ImageHelp/master/images/weather/".concat(data.weather.icon, ".png");
  } catch (err) {
    return err;
  }

  return '';
}

async function createWeather() {
  const [city, country] = await getTown();
  const town = city;
  const countryName = country;
  const req = (0, _request.default)("https://api.weatherbit.io/v2.0/forecast/daily?city=".concat(town, ",").concat(countryName, "&key=1231c4541af04c7ea7f7b23e65949802&days=4"));

  for (let i = 0; i < 3; i += 1) {
    const img = document.createElement('img');
    const span = document.createElement('span');
    img.classList.add('main__section3__weather-img');

    try {
      let weatherNow = await req;
      weatherNow = weatherNow.data[i + 1];
      span.innerHTML = "".concat(Math.round(weatherNow.temp), "\xB0");
      img.src = "https://raw.githubusercontent.com/KirillKub/ImageHelp/master/images/weather/".concat(weatherNow.weather.icon, ".png");
      img.style.width = '68px';
    } catch (err) {
      return err;
    }

    document.getElementsByClassName('main__section3__weather-temperature')[i].append(span);
    document.getElementsByClassName('main__section3__weather-temperature')[i].append(img);
  }

  return [town, country];
}

async function createMap() {
  const divMap = document.createElement('div');
  const divFirst = document.createElement('div');
  const divSecond = document.createElement('div');
  divFirst.classList.add('main__section4-text');
  divSecond.classList.add('main__section4-text');
  divMap.id = 'map';
  document.getElementsByClassName('main__section4')[0].append(divMap);
  document.getElementsByClassName('main__section4')[0].append(divFirst);
  document.getElementsByClassName('main__section4')[0].append(divSecond);
  document.getElementById('map').style.width = '400px';
  document.getElementById('map').style.height = '375px';
  await addLoc();
  /* eslint-disable */

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsa3ViIiwiYSI6ImNrM2tqd2IyZTAzdDEza240OHE0NGZvMWwifQ.u4ePMf5LJIEOrcLdPByj2g';
  const mapboxClient = mapboxSdk({
    accessToken: mapboxgl.accessToken
  });
  mapboxClient.geocoding.forwardGeocode({
    /* eslint-enable */
    query: 'Wellington, New Zealand',
    autocomplete: false,
    limit: 1
  }).send().then(response => {
    if (response && response.body && response.body.features && response.body.features.length) {
      const feature = response.body.features[0];
      feature.center = [long, lat]; // longitude,latitude

      const map = new mapboxgl.Map({
        // eslint-disable-line
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: feature.center,
        zoom: 10
      });
      new mapboxgl.Marker() // eslint-disable-line
      .setLngLat(feature.center).addTo(map);
    }
  });
}

function create(mas, className) {
  if (document.getElementsByClassName("".concat(className)).length === 1) {
    for (let i = 0; i < mas.length; i += 1) {
      const div = document.createElement('div');
      div.classList.add("".concat(mas[i]));
      document.getElementsByClassName("".concat(className))[0].append(div);
    }
  } else {
    for (let j = 0; j < document.getElementsByClassName("".concat(className)).length; j += 1) {
      for (let z = 0; z < mas.length; z += 1) {
        const div = document.createElement('div');
        div.classList.add("".concat(mas[z]));
        document.getElementsByClassName("".concat(className))[j].append(div);
      }
    }
  }
}

function addImg() {
  const img = document.createElement('img');
  img.src = _switch.default;
  document.getElementsByClassName('main__section1__switch-photo')[0].append(img);
}

function addTemperature() {
  document.getElementsByClassName('switch-temperature-item-F')[0].innerHTML = '°F';
  document.getElementsByClassName('switch-temperature-item-C')[0].innerHTML = '°C';
  document.getElementsByClassName('switch-temperature-item-C')[0].classList.add('active');
}

function switchLang() {
  const img = document.createElement('img');
  img.src = _down.default;
  document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = 'EN';
  document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
}

async function addInfo() {
  const [city, country] = await getTown();
  const town = city;
  const countryName = country;
  const req = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(town, ",").concat(countryName, "&key=1231c4541af04c7ea7f7b23e65949802"));

  try {
    const weatherNow = await req;
    const data = weatherNow.data[0];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = data.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "Feels like: ".concat(Math.round(data.app_temp), "\xB0");
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "WIND: ".concat(Math.round(data.wind_spd), "M/S");
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "HUMIDITY: ".concat(data.rh, "%");
  } catch (err) {
    return err;
  }

  return [town, countryName];
}

async function backgroundImg() {
  const SEASON = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
  let time;
  let weather;
  let date;
  const [town] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  const reqWeather = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(town, "&key=1231c4541af04c7ea7f7b23e65949802"));

  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    const {
      timezone
    } = data;
    weather = data.weather.description;
    date = new Date().toLocaleString('en-EN', {
      timeZone: "".concat(timezone)
    });
    date = new Date(date);
  } catch (err) {
    return err;
  }

  if (date.getHours() > 6 && date.getHours() < 18) {
    time = 'day';
  } else time = 'night';

  try {
    const req = (0, _request.default)("https://api.unsplash.com/photos/random?query=".concat(weather, ",").concat(time, ",").concat(SEASON[date.getMonth()], "&client_id=dda88c275d8df29539976c1d2daef60cbafb230b82e8e71793e4af7e4b11a79b"));
    const {
      urls
    } = await req;
    document.getElementsByClassName('main')[0].style.background = "url(".concat(urls.regular, ") center center / cover no-repeat");
  } catch (err) {
    return err;
  }

  return date;
}

function createPage() {
  const main = document.createElement('main');
  main.classList.add('main');
  document.body.append(main);
  create(BODY, 'main');
  create(MAIN_SECTION1, 'main__section1');
  create(MAIN_SECTION1_BOX, 'main__section1__box');
  create(MAIN_SECTION1_SWITCH_TEMPERATURE, 'main__section1__switch-temperature');
  create(MAIN_SECTION1_SEARCH, 'main__section1__search');
  createButton();
  createSearch();
  create(MAIN_WRAPPER, 'main__wrapper');
  create(MAIN_BOX, 'main__box');
  create(MAIN_SECTION2, 'main__section2');
  createTemperature();
  create(MAIN_SECTION2__TEMPERATURE_DESCRIPTION, 'main__section2__temperature-description');
  create(MAIN_SECTION3, 'main__section3');
  create(MAIN_SECTION3_WEATHER, 'main__section3__weather');
  createWeather();
  getTown();
  createMap();
  addImg();
  addTemperature();
  switchLang();
  addInfo();
  document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Search city';
  addLoc();
  timeNow();
  weatherOnWeek();
  setTimeout(backgroundImg, 1000);
}