"use strict";

require("core-js/modules/es6.regexp.split");

var _init = require("./init");

var _request = _interopRequireDefault(require("./request"));

var _country = _interopRequireDefault(require("./country"));

var _down = _interopRequireDefault(require("../dist/assets/images/down.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let input = '';
let temp = 'units=M';
let town;
const language = {
  lang: 'EN'
};
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_RUS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const DAY_BLR = ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'];
const DAY_FULL_RUS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const DAY_FULL_BLR = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_RUS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTH_BLR = ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'];
(0, _init.createPage)();

async function time() {
  const [TOWN] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let [, country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');

  if (country === 'Беларусь' || country === 'Belarus') {
    country = 'BY';
  } else {
    country = '';
  }

  const reqWeather = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(TOWN, ",").concat(country, "&key=1231c4541af04c7ea7f7b23e65949802"));

  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    const {
      timezone
    } = data;
    let date = new Date().toLocaleString('en-EN', {
      timeZone: "".concat(timezone)
    });
    date = new Date(date);
    let minute = date.getMinutes();

    if (minute < 10) {
      minute = "0".concat(date.getMinutes());
    }

    if (language.lang === 'EN') {
      document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    }

    if (language.lang === 'RU') {
      document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY_RUS[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH_RUS[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    }

    if (language.lang === 'BY') {
      document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY_BLR[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH_BLR[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    }

    return date;
  } catch (err) {
    return err;
  }
}

setInterval(time, 60000);
document.getElementsByClassName('main__section1__switch-photo')[0].addEventListener('click', function swapBg() {
  (0, _init.backgroundImg)();
});
document.getElementsByClassName('main__section1__switch-temperature')[0].addEventListener('click', async function swapTemperature(event) {
  const {
    target
  } = event;
  document.getElementsByClassName('switch-temperature-item-C')[0].classList.remove('active');
  document.getElementsByClassName('switch-temperature-item-F')[0].classList.remove('active');
  target.classList.add('active');
  const [city] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  town = city;
  if (target.classList.contains('switch-temperature-item-C')) temp = 'units=M';else temp = 'units=I';
  const reqWeather = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(town, "&key=1231c4541af04c7ea7f7b23e65949802&").concat(temp));

  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    const feelsLike = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(':')[0];
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(data.temp);
    document.getElementsByClassName('main__section2__element')[1].textContent = "".concat(feelsLike, ": ").concat(Math.round(data.app_temp), "\xB0");
  } catch (err) {
    return err;
  }

  const req = (0, _request.default)("https://api.weatherbit.io/v2.0/forecast/daily?city=".concat(town, "&key=1231c4541af04c7ea7f7b23e65949802&").concat(temp, "&days=4"));

  for (let i = 0; i < 3; i += 1) {
    try {
      let weatherNow = await req;
      weatherNow = weatherNow.data[i + 1];
      document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = "".concat(Math.round(weatherNow.temp), "\xB0");
    } catch (err) {
      return err;
    }
  }

  return '';
});
document.getElementsByClassName('main__section1__search-input')[0].addEventListener('focusout', function out() {
  input = document.getElementsByClassName('main__section1__search-input')[0].value;
});

async function search() {
  town = input;
  let long;
  let lat;
  let timezone;
  let date;
  let {
    lang
  } = language;
  let weatherNow;
  let minute;
  let text;
  let dataCopy;

  if (lang === 'BY') {
    lang = 'be';
  }

  const reqWeather = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(town, "&key=1231c4541af04c7ea7f7b23e65949802&").concat(temp, "&lang=").concat(lang));

  try {
    weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    dataCopy = data;
    timezone = data.timezone;
    lat = data.lat;
    long = data.lon;
    const city = data.city_name;
    const country = _country.default[data.country_code];
    text = "".concat(city, ", ").concat(country);
    date = new Date().toLocaleString('en-EN', {
      timeZone: "".concat(timezone)
    });
    date = new Date(date);
    minute = date.getMinutes();

    if (minute < 10) {
      minute = "0".concat(date.getMinutes());
    }
  } catch (err) {
    return err;
  }

  const translate = (0, _request.default)("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-".concat(lang.toLowerCase(), "&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=").concat(text));

  try {
    const newText = await translate;
    text = newText.text.join('');
    document.getElementsByClassName('main__section2__town')[0].textContent = text;
  } catch (err) {
    return err;
  }

  if (language.lang === 'EN') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "Feels like: ".concat(Math.round(dataCopy.app_temp), "\xB0");
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "WIND: ".concat(Math.round(dataCopy.wind_spd), "M/S");
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "HUMIDITY: ".concat(dataCopy.rh, "%");
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "Latitude: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "Longitude: ".concat(long);
  }

  if (language.lang === 'RU') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY_RUS[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH_RUS[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "\u041E\u0449\u0443\u0449\u0430\u0435\u0442\u0441\u044F \u043A\u0430\u043A: ".concat(Math.round(dataCopy.app_temp), "\xB0");
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "\u0412\u0435\u0442\u0435\u0440: ".concat(Math.round(dataCopy.wind_spd), "M/S");
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C: ".concat(dataCopy.rh, "%");
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "\u0428\u0438\u0440\u043E\u0442\u0430: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "\u0414\u043E\u043B\u0433\u043E\u0442\u0430: ".concat(long);
  }

  if (language.lang === 'BY') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = "".concat(DAY[date.getDay()], " ").concat(date.getDate(), " ").concat(MONTH[date.getMonth()], ", ").concat(date.getHours(), ":").concat(minute);
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "\u0410\u0434\u0447\u0443\u0432\u0430\u0435, \u044F\u043A: ".concat(Math.round(dataCopy.app_temp), "\xB0");
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "\u0412\u0435\u0446\u0435\u0440: ".concat(Math.round(dataCopy.wind_spd), "M/S");
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "\u0412\u0456\u043B\u044C\u0433\u043E\u0442\u043D\u0430\u0441\u0446\u044C: ".concat(dataCopy.rh, "%");
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "\u0428\u044B\u0440\u043E\u0442\u0430: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "\u0414\u0430\u045E\u0433\u0430\u0442\u0430: ".concat(long);
  }

  const req = (0, _request.default)("https://api.weatherbit.io/v2.0/forecast/daily?city=".concat(town, "&key=1231c4541af04c7ea7f7b23e65949802&").concat(temp, "&days=4"));

  for (let i = 0; i < 3; i += 1) {
    try {
      let weather = await req;
      weather = weather.data[i + 1];
      document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = "".concat(Math.round(weather.temp), "\xB0");
    } catch (err) {
      return err;
    }
  }
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
  }).send().then(function res(response) {
    if (response && response.body && response.body.features && response.body.features.length) {
      const feature = response.body.features[0];
      feature.center = [long, lat]; // longitude,latitude
      // eslint-disable-next-line

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: feature.center,
        zoom: 10
      }); // eslint-disable-next-line

      new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    }
  });
  (0, _init.backgroundImg)();
  return '';
}

document.getElementsByClassName('main__section1__search-button')[0].addEventListener('click', search);
document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click', function translate() {
  document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = '';
  document.getElementsByClassName('main__section1__switch-lang')[0].style.height = '90px';
  document.getElementsByClassName('main__section1__switch-lang')[0].style.display = 'block';
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  div1.classList.add('lang-EN');
  div2.classList.add('lang-RU');
  div3.classList.add('lang-BY');
  div1.innerHTML = 'EN';
  div2.innerHTML = 'RU';
  div3.innerHTML = 'BY';
  document.getElementsByClassName('main__section1__switch-lang')[0].append(div1);
  document.getElementsByClassName('main__section1__switch-lang')[0].append(div2);
  document.getElementsByClassName('main__section1__switch-lang')[0].append(div3);
});
document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('mouseleave', function translateHelper() {
  const img = document.createElement('img');
  img.src = _down.default;
  document.getElementsByClassName('main__section1__switch-lang')[0].style.height = '44px';
  document.getElementsByClassName('main__section1__switch-lang')[0].style.display = 'flex';
  document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = language.lang;
  document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
});
document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click', async function changeLang(event) {
  const {
    target
  } = event;
  let firstDay = document.getElementsByClassName('main__section3__weather-day')[0].textContent;
  let secondDay = document.getElementsByClassName('main__section3__weather-day')[1].textContent;
  let thirdDay = document.getElementsByClassName('main__section3__weather-day')[2].textContent;
  const dateNow = document.getElementsByClassName('main__section2__day')[0].innerHTML.split(' ');

  if (DAY_FULL_RUS.indexOf(firstDay) !== -1) {
    firstDay = DAY_FULL_RUS.indexOf(firstDay);
  } else if (DAY_FULL_BLR.indexOf(firstDay) !== -1) {
    firstDay = DAY_FULL_BLR.indexOf(firstDay);
  } else if (DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = DAY_FULL.indexOf(firstDay);
  }

  if (DAY_FULL_RUS.indexOf(secondDay) !== -1) {
    secondDay = DAY_FULL_RUS.indexOf(secondDay);
  } else if (DAY_FULL_BLR.indexOf(secondDay) !== -1) {
    secondDay = DAY_FULL_BLR.indexOf(secondDay);
  } else if (DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = DAY_FULL.indexOf(secondDay);
  }

  if (DAY_FULL_RUS.indexOf(thirdDay) !== -1) {
    thirdDay = DAY_FULL_RUS.indexOf(thirdDay);
  } else if (DAY_FULL_BLR.indexOf(thirdDay) !== -1) {
    thirdDay = DAY_FULL_BLR.indexOf(thirdDay);
  } else if (DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = DAY_FULL.indexOf(thirdDay);
  }

  const [TOWN] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let {
    lang
  } = language;
  let langNow = target.innerHTML;

  if (langNow === 'BY') {
    langNow = 'be';
  }

  let desc;

  if (lang === 'BY') {
    lang = 'be';
  }

  if (event.target.classList.contains('lang-EN') || event.target.classList.contains('lang-RU') || event.target.classList.contains('lang-BY')) {
    const reqWeather = (0, _request.default)("https://api.weatherbit.io/v2.0/current?city=".concat(TOWN, "&key=1231c4541af04c7ea7f7b23e65949802&lang=").concat(langNow));

    try {
      const weatherNow = await reqWeather;
      const data = weatherNow.data[0];
      desc = data.weather.description;
    } catch (err) {
      return err;
    }
  }

  if (target.classList.contains('lang-EN')) {
    document.getElementsByClassName('lang-EN')[0].classList.add('active-lang');
    document.getElementsByClassName('lang-RU')[0].classList.remove('active-lang');
    document.getElementsByClassName('lang-BY')[0].classList.remove('active-lang');
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Search city';
    document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'search';
    const lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1];
    const long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "Latitude: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "Longitude: ".concat(long);
    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = "".concat(desc);
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "FEELS LIKE: ".concat(feels);
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "Wind: ".concat(wind);
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "HUMIDITY: ".concat(humidity);
    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL[thirdDay];
    dateNow[0] = DAY[DAY.indexOf(dateNow[0])] || DAY[DAY_RUS.indexOf(dateNow[0])] || DAY[DAY_BLR.indexOf(dateNow[0])];
    dateNow[2] = MONTH[MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH[MONTH_RUS.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH[MONTH_BLR.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');
    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const translate = (0, _request.default)("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=".concat(lang.toLowerCase(), "-en&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=").concat(text));

    try {
      const newText = await translate;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return err;
    }

    language.lang = 'EN';
  }

  if (target.classList.contains('lang-RU')) {
    document.getElementsByClassName('lang-RU')[0].classList.add('active-lang');
    document.getElementsByClassName('lang-EN')[0].classList.remove('active-lang');
    document.getElementsByClassName('lang-BY')[0].classList.remove('active-lang');
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Поиск города';
    document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'поиск';
    const lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1];
    const long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "\u0428\u0438\u0440\u043E\u0442\u0430: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "\u0414\u043E\u043B\u0433\u043E\u0442\u0430: ".concat(long);
    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = "".concat(desc);
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "\u041E\u0449\u0443\u0449\u0430\u0435\u0442\u0441\u044F \u043A\u0430\u043A: ".concat(feels);
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "\u0412\u0435\u0442\u0435\u0440: ".concat(wind);
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C: ".concat(humidity);
    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL_RUS[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL_RUS[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL_RUS[thirdDay];
    dateNow[0] = DAY_RUS[DAY.indexOf(dateNow[0])] || DAY_RUS[DAY_RUS.indexOf(dateNow[0])] || DAY_RUS[DAY_BLR.indexOf(dateNow[0])];
    dateNow[2] = MONTH_RUS[MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH_RUS[MONTH_RUS.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH_RUS[MONTH_BLR.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');
    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const translate = (0, _request.default)("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=".concat(lang.toLowerCase(), "-ru&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=").concat(text));

    try {
      const newText = await translate;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return err;
    }

    language.lang = 'RU';
  }

  if (target.classList.contains('lang-BY')) {
    document.getElementsByClassName('lang-BY')[0].classList.add('active-lang');
    document.getElementsByClassName('lang-EN')[0].classList.remove('active-lang');
    document.getElementsByClassName('lang-RU')[0].classList.remove('active-lang');
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Пошук горада';
    document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'пошук';
    const lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1];
    const long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section4-text')[0].innerHTML = "\u0428\u044B\u0440\u043E\u0442\u0430: ".concat(lat);
    document.getElementsByClassName('main__section4-text')[1].innerHTML = "\u0414\u0430\u045E\u0433\u0430\u0442\u0430: ".concat(long);
    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = "".concat(desc);
    document.getElementsByClassName('main__section2__element')[1].innerHTML = "\u0410\u0434\u0447\u0443\u0432\u0430\u0435, \u044F\u043A: ".concat(feels);
    document.getElementsByClassName('main__section2__element')[2].innerHTML = "\u0412\u0435\u0446\u0435\u0440: ".concat(wind);
    document.getElementsByClassName('main__section2__element')[3].innerHTML = "\u0412\u0456\u043B\u044C\u0433\u043E\u0442\u043D\u0430\u0441\u0446\u044C: ".concat(humidity);
    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL_BLR[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL_BLR[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL_BLR[thirdDay];
    dateNow[0] = DAY_BLR[DAY.indexOf(dateNow[0])] || DAY_BLR[DAY_RUS.indexOf(dateNow[0])] || DAY_BLR[DAY_BLR.indexOf(dateNow[0])];
    dateNow[2] = MONTH_BLR[MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH_BLR[MONTH_RUS.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))] || MONTH_BLR[MONTH_BLR.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');
    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const translate = (0, _request.default)("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=".concat(lang.toLowerCase(), "-be&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=").concat(text));

    try {
      const newText = await translate;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return err;
    }

    language.lang = 'BY';
  }

  return '';
});
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // eslint-disable-next-line

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
let transcript;
recognition.addEventListener('result', e => {
  transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript);
  input = transcript;
  setTimeout(search, 1000);
});
document.getElementsByClassName('search-flex-item')[0].addEventListener('click', async function searchWithVoice() {
  recognition.start();
});