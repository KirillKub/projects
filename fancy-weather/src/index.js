import {
  createPage, getBackgroundImg, ENG, addMap, URLS,
} from './init';
import makeRequest from './request';
import COUNTRY from './country';
import IMG_DOWN from '../dist/assets/images/down.png';

let input = '';
let temp = 'units=M';
let town;
const language = {
  lang: 'EN',
};

const RUS = {
  DAY: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  DAY_FULL: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  MONTH: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
};

const BLR = {
  DAY: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
  DAY_FULL: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
  MONTH: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
};

createPage();

async function tempInit() {
  const daysCount = 3;
  document.getElementsByClassName('switch-temperature-item-C')[0].classList.remove('active');
  document.getElementsByClassName('switch-temperature-item-F')[0].classList.add('active');
  const [city] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  town = city;
  temp = 'units=I';
  const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${town}&key=${process.env.KEY_WEATHERBIT}&${temp}`);
  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    const feelsLike = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(':')[0];
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(data.temp);
    document.getElementsByClassName('main__section2__element')[1].textContent = `${feelsLike}: ${Math.round(data.app_temp)}°`;
  } catch (err) {
    return alert('Something went wrong,try again');
  }
  const req = makeRequest(`${URLS.WEATHER}/forecast/daily?city=${town}&key=${process.env.KEY_WEATHERBIT}&${temp}&days=4`);
  try {
    const weather = await req;
    for (let i = 0; i < daysCount; i += 1) {
      const weatherNow = weather.data[i + 1];
      document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = `${Math.round(weatherNow.temp)}°`;
    }
  } catch (err) {
    return alert('Something went wrong,try again');
  }
}

async function langInit() {
  let firstDay = document.getElementsByClassName('main__section3__weather-day')[0].textContent;
  let secondDay = document.getElementsByClassName('main__section3__weather-day')[1].textContent;
  let thirdDay = document.getElementsByClassName('main__section3__weather-day')[2].textContent;
  const dateNow = document.getElementsByClassName('main__section2__day')[0].innerHTML.split(' ');
  if (RUS.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = RUS.DAY_FULL.indexOf(firstDay);
  } else if (BLR.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = BLR.DAY_FULL.indexOf(firstDay);
  } else if (ENG.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = ENG.DAY_FULL.indexOf(firstDay);
  }

  if (RUS.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = RUS.DAY_FULL.indexOf(secondDay);
  } else if (BLR.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = BLR.DAY_FULL.indexOf(secondDay);
  } else if (ENG.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = ENG.DAY_FULL.indexOf(secondDay);
  }

  if (RUS.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = RUS.DAY_FULL.indexOf(thirdDay);
  } else if (BLR.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = BLR.DAY_FULL.indexOf(thirdDay);
  } else if (ENG.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = ENG.DAY_FULL.indexOf(thirdDay);
  }
  const [TOWN] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let lang = localStorage.getItem('lang');
  let langNow = localStorage.getItem('lang');
  if (langNow === 'BY') {
    langNow = 'be';
  }
  let desc;
  if (lang === 'BY') {
    lang = 'be';
  }
  const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${TOWN}&key=${process.env.KEY_WEATHERBIT}&lang=${langNow}`);
  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    desc = data.weather.description;
  } catch (err) {
    return alert('Something went wrong,try again');
  }
  if (langNow === 'RU') {
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Поиск города';
    document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'поиск';
    const lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1];
    const long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Широта: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Долгота: ${long}`;

    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Ощущается как: ${feels}`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Ветер: ${wind}`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Влажность: ${humidity}`;

    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = RUS.DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = RUS.DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = RUS.DAY_FULL[thirdDay];

    dateNow[0] = RUS.DAY[ENG.DAY.indexOf(dateNow[0])] || RUS.DAY[RUS.DAY.indexOf(dateNow[0])]
          || RUS.DAY[BLR.DAY.indexOf(dateNow[0])];
    dateNow[2] = RUS.MONTH[ENG.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || RUS.MONTH[RUS.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || RUS.MONTH[BLR.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const TRANSLATE = makeRequest(`${URLS.YANDEX}en-ru&key=${process.env.KEY_YANDEX}&text=${text}`);
    try {
      const newText = await TRANSLATE;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return alert('Something went wrong,try again');
    }
    language.lang = 'RU';
  }
  if (langNow === 'be') {
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Пошук горада';
    document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'пошук';
    const lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1];
    const long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Шырота: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Даўгата: ${long}`;

    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Адчувае, як: ${feels}`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Вецер: ${wind}`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Вільготнасць: ${humidity}`;

    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = BLR.DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = BLR.DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = BLR.DAY_FULL[thirdDay];

    dateNow[0] = BLR.DAY[ENG.DAY.indexOf(dateNow[0])] || BLR.DAY[RUS.DAY.indexOf(dateNow[0])]
          || BLR.DAY[BLR.DAY.indexOf(dateNow[0])];
    dateNow[2] = BLR.MONTH[ENG.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || BLR.MONTH[RUS.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || BLR.MONTH[BLR.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const TRANSLATE = makeRequest(`${URLS.YANDEX}en-be&key=${process.env.KEY_YANDEX}&text=${text}`);
    try {
      const newText = await TRANSLATE;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return alert('Something went wrong,try again');
    }
    language.lang = 'BY';
  }
  const img = document.createElement('img');
  img.src = IMG_DOWN;
  document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = localStorage.getItem('lang');
  document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
}

if (localStorage.getItem('lang') === 'RU' || localStorage.getItem('lang') === 'BY') {
  setTimeout(langInit, 3000);
  language.lang = localStorage.getItem('lang');
}

if (localStorage.getItem('temperature') === 'units=I') {
  setTimeout(tempInit, 1000);
  temp = 'units=I';
}

async function time() {
  const [TOWN] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let townNow = TOWN;
  if (language.lang === 'BY') {
    const TRANSLATE = makeRequest(`${URLS.YANDEX}be-en&key=${process.env.KEY_YANDEX}&text=${TOWN}`);
    try {
      const newTown = await TRANSLATE;
      // eslint-disable-next-line
      townNow = newTown.text[0];
    } catch (e) { return alert('Something went wrong,try again'); }
  }
  let [, country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  if (country === 'Беларусь' || country === 'Belarus') {
    country = 'BY';
  } else {
    country = '';
  }
  const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${townNow},${country}&key=${process.env.KEY_WEATHERBIT}`);
  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    const { timezone } = data;
    let date = new Date().toLocaleString('en-EN', { timeZone: `${timezone}` });
    date = new Date(date);
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${date.getMinutes()}`;
    }
    if (language.lang === 'EN') {
      document.getElementsByClassName('main__section2__day')[0].innerHTML = `${ENG.DAY[date.getDay()]} ${date.getDate()} ${ENG.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    }
    if (language.lang === 'RU') { document.getElementsByClassName('main__section2__day')[0].innerHTML = `${RUS.DAY[date.getDay()]} ${date.getDate()} ${RUS.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`; }
    if (language.lang === 'BY') {
      document.getElementsByClassName('main__section2__day')[0].innerHTML = `${BLR.DAY[date.getDay()]} ${date.getDate()} ${BLR.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    }
    return date;
  } catch (err) {
    return alert('Something went wrong,try again');
  }
}

setInterval(time, 60000);

function swapBg() {
  document.getElementsByClassName('loading')[0].style.display = 'block';
  document.body.style.visibility = 'hidden';
  getBackgroundImg();
}

async function swapTemperature(event) {
  const daysCount = 3;
  const { target } = event;
  document.getElementsByClassName('switch-temperature-item-C')[0].classList.remove('active');
  document.getElementsByClassName('switch-temperature-item-F')[0].classList.remove('active');
  target.classList.add('active');
  const [city] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let townNow = city;
  if (language.lang === 'BY') {
    const TRANSLATE = makeRequest(`${URLS.YANDEX}be-en&key=${process.env.KEY_YANDEX}&text=${city}`);
    try {
      const newTown = await TRANSLATE;
      // eslint-disable-next-line
      townNow = newTown.text[0];
    } catch (e) { return alert('Something went wrong,try again'); }
  }
  if (target.classList.contains('switch-temperature-item-C'))temp = 'units=M';
  else temp = 'units=I';
  const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${townNow}&key=${process.env.KEY_WEATHERBIT}&${temp}`);
  try {
    const weatherNow = await reqWeather;
    const data = weatherNow.data[0];
    let feelsLike = '';
    if (language.lang === 'RU') feelsLike = 'ОЩУЩАЕТСЯ КАК';
    if (language.lang === 'EN') feelsLike = 'FEELS LIKE';
    if (language.lang === 'BY') feelsLike = 'АДЧУВАЕ, ЯК:';
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(data.temp);
    document.getElementsByClassName('main__section2__element')[1].textContent = `${feelsLike}: ${Math.round(data.app_temp)}°`;
  } catch (err) {
    return alert('Something went wrong,try again');
  }
  const req = makeRequest(`${URLS.WEATHER}/forecast/daily?city=${townNow}&key=${process.env.KEY_WEATHERBIT}&${temp}&days=4`);
  try {
    const weather = await req;
    for (let i = 0; i < daysCount; i += 1) {
      const weatherNow = weather.data[i + 1];
      document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = `${Math.round(weatherNow.temp)}°`;
    }
  } catch (err) {
    return alert('Something went wrong,try again');
  }
}

function focusOut() {
  input = document.getElementsByClassName('main__section1__search-input')[0].value;
}

function pressEnter(event) {
  const target = event.code;
  if (target === 'Enter') {
    input = document.getElementsByClassName('main__section1__search-input')[0].value;
    // eslint-disable-next-line
      search();
  }
}

document.getElementsByClassName('main__section1__switch-photo')[0].addEventListener('click', swapBg);

document.getElementsByClassName('main__section1__switch-temperature')[0].addEventListener('click', swapTemperature);

document.getElementsByClassName('main__section1__search-input')[0].addEventListener('focusout', focusOut);

document.getElementsByClassName('main__section1__search-input')[0].addEventListener('keydown', pressEnter);

async function search() {
  const ERROR = 'Unexpected end of JSON input';
  const daysCount = 3;
  document.getElementsByClassName('loading')[0].style.display = 'block';
  document.body.style.visibility = 'hidden';
  town = input;
  let long;
  let lat;
  let timezone;
  let date;
  let { lang } = language;
  let weatherNow;
  let minute;
  let text;
  let dataCopy;
  if (lang === 'BY') {
    lang = 'be';
  }
  const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${town}&key=${process.env.KEY_WEATHERBIT}&${temp}&lang=${lang}`);
  try {
    weatherNow = await reqWeather;
    if (weatherNow.message === ERROR) {
      document.body.style.visibility = 'visible';
      document.getElementsByClassName('loading')[0].style.display = 'none';
      document.getElementsByClassName('main__section1__search-input')[0].value = 'i don\'t know this city,sorry(';
      return '';
    }
    const data = weatherNow.data[0];
    document.getElementsByClassName('main__section2__temperature-img')[0].src = `${URLS.PHOTO}${data.weather.icon}.png`;
    dataCopy = data;
    timezone = data.timezone;
    lat = data.lat;
    long = data.lon;
    const city = data.city_name;
    const country = COUNTRY[data.country_code];
    text = `${city}, ${country}`;
    date = new Date().toLocaleString('en-EN', { timeZone: `${timezone}` });
    date = new Date(date);
    minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${date.getMinutes()}`;
    }
  } catch (err) {
    document.body.style.visibility = 'visible';
    document.getElementsByClassName('loading')[0].style.display = 'none';
    document.getElementsByClassName('main__section1__search-input')[0].value = 'i don\'t know this city,sorry(';
    return '';
  }
  const TRANSLATE = makeRequest(`${URLS.YANDEX}en-${lang.toLowerCase()}&key=${process.env.KEY_YANDEX}&text=${text}`);
  try {
    const newText = await TRANSLATE;
    text = newText.text.join('');
    document.getElementsByClassName('main__section2__town')[0].textContent = text;
  } catch (err) {
    return alert('Something went wrong,try again');
  }
  lat = lat.toString();
  long = long.toString();
  if (language.lang === 'EN') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = `${ENG.DAY[date.getDay()]} ${date.getDate()} ${ENG.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(dataCopy.app_temp)}°`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `WIND: ${Math.round(dataCopy.wind_spd)}M/S`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${dataCopy.rh}%`;
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${lat.split('.')[0]}°${lat.split('.')[1].substr(0, 2)}'`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${long.split('.')[0]}°${long.split('.')[1].substr(0, 2)}'`;
  }
  if (language.lang === 'RU') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = `${RUS.DAY[date.getDay()]} ${date.getDate()} ${RUS.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Ощущается как: ${Math.round(dataCopy.app_temp)}°`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Ветер: ${Math.round(dataCopy.wind_spd)}M/S`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Влажность: ${dataCopy.rh}%`;
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Широта: ${lat.split('.')[0]}°${lat.split('.')[1].substr(0, 2)}'`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Долгота: ${long.split('.')[0]}°${long.split('.')[1].substr(0, 2)}'`;
  }
  if (language.lang === 'BY') {
    document.getElementsByClassName('main__section2__day')[0].innerHTML = `${BLR.DAY[date.getDay()]} ${date.getDate()} ${BLR.MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(dataCopy.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = dataCopy.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Адчувае, як: ${Math.round(dataCopy.app_temp)}°`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Вецер: ${Math.round(dataCopy.wind_spd)}M/S`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Вільготнасць: ${dataCopy.rh}%`;
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Шырота: ${lat.split('.')[0]}°${lat.split('.')[1].substr(0, 2)}'`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Даўгата: ${long.split('.')[0]}°${long.split('.')[1].substr(0, 2)}'`;
  }

  const req = makeRequest(`${URLS.WEATHER}/forecast/daily?city=${town}&key=${process.env.KEY_WEATHERBIT}&${temp}&days=4`);
  try {
    const weather = await req;
    for (let i = 0; i < daysCount; i += 1) {
      weatherNow = weather.data[i + 1];
      document.getElementsByClassName('main__section3__weather-img')[i].src = `${URLS.PHOTO}${weatherNow.weather.icon}.png`;
      if (language.lang === 'EN') document.getElementsByClassName('main__section3__weather-day')[i].textContent = ENG.DAY_FULL[new Date(+date + 24 * 60 * 60 * (1000 * (i + 1))).getDay()];
      if (language.lang === 'RU') document.getElementsByClassName('main__section3__weather-day')[i].textContent = RUS.DAY_FULL[new Date(+date + 24 * 60 * 60 * (1000 * (i + 1))).getDay()];
      if (language.lang === 'BY') document.getElementsByClassName('main__section3__weather-day')[i].textContent = BLR.DAY_FULL[new Date(+date + 24 * 60 * 60 * (1000 * (i + 1))).getDay()];
      document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = `${Math.round(weatherNow.temp)}°`;
    }
  } catch (err) {
    return alert('Something went wrong,try again');
  }
  addMap(long,lat);
  document.getElementsByClassName('main__section1__search-input')[0].value = input;
  getBackgroundImg(language.lang);
}


function translate() {
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
}

function translateHelper() {
  const img = document.createElement('img');
  img.src = IMG_DOWN;
  document.getElementsByClassName('main__section1__switch-lang')[0].style.height = '44px';
  document.getElementsByClassName('main__section1__switch-lang')[0].style.display = 'flex';
  document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = language.lang;
  document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
}

document.getElementsByClassName('main__section1__search-button')[0].addEventListener('click', search);

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click', translate);

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('mouseleave', translateHelper);

async function changeLang(event) {
  const { target } = event;
  let firstDay = document.getElementsByClassName('main__section3__weather-day')[0].textContent;
  let secondDay = document.getElementsByClassName('main__section3__weather-day')[1].textContent;
  let thirdDay = document.getElementsByClassName('main__section3__weather-day')[2].textContent;
  const dateNow = document.getElementsByClassName('main__section2__day')[0].innerHTML.split(' ');
  if (RUS.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = RUS.DAY_FULL.indexOf(firstDay);
  } else if (BLR.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = BLR.DAY_FULL.indexOf(firstDay);
  } else if (ENG.DAY_FULL.indexOf(firstDay) !== -1) {
    firstDay = ENG.DAY_FULL.indexOf(firstDay);
  }

  if (RUS.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = RUS.DAY_FULL.indexOf(secondDay);
  } else if (BLR.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = BLR.DAY_FULL.indexOf(secondDay);
  } else if (ENG.DAY_FULL.indexOf(secondDay) !== -1) {
    secondDay = ENG.DAY_FULL.indexOf(secondDay);
  }

  if (RUS.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = RUS.DAY_FULL.indexOf(thirdDay);
  } else if (BLR.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = BLR.DAY_FULL.indexOf(thirdDay);
  } else if (ENG.DAY_FULL.indexOf(thirdDay) !== -1) {
    thirdDay = ENG.DAY_FULL.indexOf(thirdDay);
  }
  const [TOWN] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
  let city = TOWN;
  if (language.lang === 'BY') {
    const TRANSLATE = makeRequest(`${URLS.YANDEX}be-en&key=${process.env.KEY_YANDEX}&text=${TOWN}`);
    try {
      const newCity = await TRANSLATE;
      // eslint-disable-next-line
      city = newCity.text[0];
    } catch (err) {
      return alert('Something went wrong,try again');
    }
  }
  let { lang } = language;
  let langNow = target.innerHTML;
  if (langNow === 'BY') {
    langNow = 'be';
  }
  let desc;
  if (lang === 'BY') {
    lang = 'be';
  }
  if (event.target.classList.contains('lang-EN') || event.target.classList.contains('lang-RU') || event.target.classList.contains('lang-BY')) {
    const reqWeather = makeRequest(`${URLS.WEATHER}/current?city=${city}&key=${process.env.KEY_WEATHERBIT}&lang=${langNow}`);
    try {
      const weatherNow = await reqWeather;
      const data = weatherNow.data[0];
      desc = data.weather.description;
    } catch (err) {
      return alert('Something went wrong,try again');
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
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${long}`;

    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `FEELS LIKE: ${feels}`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Wind: ${wind}`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${humidity}`;

    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = ENG.DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = ENG.DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = ENG.DAY_FULL[thirdDay];

    dateNow[0] = ENG.DAY[ENG.DAY.indexOf(dateNow[0])] || ENG.DAY[RUS.DAY.indexOf(dateNow[0])]
          || ENG.DAY[BLR.DAY.indexOf(dateNow[0])];
    dateNow[2] = ENG.MONTH[ENG.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || ENG.MONTH[RUS.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || ENG.MONTH[BLR.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const TRANSLATE = makeRequest(`${URLS.YANDEX}${lang.toLowerCase()}-en&key=${process.env.KEY_YANDEX}&text=${text}`);
    try {
      const newText = await TRANSLATE;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return alert('Something went wrong,try again');
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
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Широта: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Долгота: ${long}`;

    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Ощущается как: ${feels}`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Ветер: ${wind}`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Влажность: ${humidity}`;

    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = RUS.DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = RUS.DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = RUS.DAY_FULL[thirdDay];

    dateNow[0] = RUS.DAY[ENG.DAY.indexOf(dateNow[0])] || RUS.DAY[RUS.DAY.indexOf(dateNow[0])]
          || RUS.DAY[BLR.DAY.indexOf(dateNow[0])];
    dateNow[2] = RUS.MONTH[ENG.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || RUS.MONTH[RUS.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || RUS.MONTH[BLR.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const TRANSLATE = makeRequest(`${URLS.YANDEX}${lang.toLowerCase()}-ru&key=${process.env.KEY_YANDEX}&text=${text}`);
    try {
      const newText = await TRANSLATE;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return alert('Something went wrong,try again');
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
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Шырота: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Даўгата: ${long}`;

    const feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
    const wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
    const humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
    document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Адчувае, як: ${feels}`;
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Вецер: ${wind}`;
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Вільготнасць: ${humidity}`;

    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = BLR.DAY_FULL[firstDay];
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = BLR.DAY_FULL[secondDay];
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = BLR.DAY_FULL[thirdDay];

    dateNow[0] = BLR.DAY[ENG.DAY.indexOf(dateNow[0])] || BLR.DAY[RUS.DAY.indexOf(dateNow[0])]
          || BLR.DAY[BLR.DAY.indexOf(dateNow[0])];
    dateNow[2] = BLR.MONTH[ENG.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || BLR.MONTH[RUS.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))]
          || BLR.MONTH[BLR.MONTH.indexOf(dateNow[2].substr(0, dateNow[2].length - 1))];
    dateNow[2] += ',';
    document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

    const text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
    const TRANSLATE = makeRequest(`${URLS.YANDEX}${lang.toLowerCase()}-be&key=${process.env.KEY_YANDEX}&text=${text}`);
    try {
      const newText = await TRANSLATE;
      document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
    } catch (err) {
      return alert('Something went wrong,try again');
    }
    language.lang = 'BY';
  }
}

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click', changeLang);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// eslint-disable-next-line
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
let transcript;

recognition.addEventListener('result', (e) => {
  transcript = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript);
  input = transcript;
});

recognition.addEventListener('speechend', () => {
  search();
});

async function searchWithVoice() {
  recognition.start();
}

document.getElementsByClassName('search-flex-item')[0].addEventListener('click', searchWithVoice);

window.onunload = () => {
  localStorage.setItem('lang', language.lang);
  localStorage.setItem('temperature', temp);
};
