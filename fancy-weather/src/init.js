import requestItem from './request';
import { COUNTRY } from './country'

const BODY = ['main__section1','main__wrapper']
const MAIN_SECTION1 = ['main__section1__box','main__section1__search']
const MAIN_SECTION1_BOX = ['main__section1__switch-photo','main__section1__switch-lang','main__section1__switch-temperature']
const MAIN_SECTION1_SWITCH_TEMPERATURE = ['switch-temperature-item-C','switch-temperature-item-F'];
const MAIN_SECTION1_SEARCH = ['main__section1__search-flex'];
const MAIN_WRAPPER = ['main__box','main__section4'];
const MAIN_BOX = ['main__section2','main__section3'];
const MAIN_SECTION2 = ['main__section2__town','main__section2__day','main__section2__temperature'];
const MAIN_SECTION2__TEMPERATURE_DESCRIPTION = ['main__section2__element','main__section2__element','main__section2__element','main__section2__element'];
const MAIN_SECTION3 = ['main__section3__weather','main__section3__weather','main__section3__weather']
const MAIN_SECTION3_WEATHER = ['main__section3__weather-day','main__section3__weather-temperature']

const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const DAY_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let lat;
let long;

function createPage(){
    let main = document.createElement('main');
    main.classList.add('main');
    document.body.append(main);
    create(BODY,'main');
    create(MAIN_SECTION1,'main__section1');
    create(MAIN_SECTION1_BOX,'main__section1__box');
    create(MAIN_SECTION1_SWITCH_TEMPERATURE,'main__section1__switch-temperature');
    create(MAIN_SECTION1_SEARCH,'main__section1__search');
    createButton();
    createSearch();
    create(MAIN_WRAPPER,'main__wrapper');
    create(MAIN_BOX,'main__box');
    create(MAIN_SECTION2,'main__section2');
    createTemperature();
    create(MAIN_SECTION2__TEMPERATURE_DESCRIPTION,'main__section2__temperature-description')
    create(MAIN_SECTION3,'main__section3');
    create(MAIN_SECTION3_WEATHER,'main__section3__weather');
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
    setTimeout(backgroundImg,1000);
}

async function addLoc(){
    let location = requestItem('https://ipinfo.io/json?token=fa763d842192af');
    try{
        const { loc } = await location;
        const [latitude,longitude ] = loc.split(',');
        lat = latitude;
        long = longitude;
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${latitude}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${longitude}`;
        return [].push(lat,long);
        }
    catch(err){
        return err;
    }
}

function createSearch(){
    let input = document.createElement('input');
    let div = document.createElement('div');
    let img = document.createElement('img');

    img.src = '../dist/assets/images/search.png'
    input.classList.add(`main__section1__search-input`);
    div.classList.add(`search-flex-item`);

    div.append(img);
    document.getElementsByClassName(`main__section1__search-flex`)[0].append(input);
    document.getElementsByClassName(`main__section1__search-flex`)[0].append(div);
}

function createButton(){
    let button = document.createElement('button'); 
    button.classList.add(`main__section1__search-button`);
    button.innerHTML = 'search'
    document.getElementsByClassName(`main__section1__search`)[0].append(button);
}

async function timeNow(){
    let [ city,country,timezone ] = await getTown()   
    let date = new Date().toLocaleString('en-EN',{timeZone: `${timezone}`})
    date = new Date(date);
    let minute = date.getMinutes();
    if(minute < 10){
        minute = '0' + date.getMinutes();
    }
    document.getElementsByClassName('main__section2__day')[0].innerHTML = 
    `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
}

async function weatherOnWeek(){
    let countDay = 7;
    let [ city,country,timezone ] = await getTown()   
    let date = new Date().toLocaleString('en-EN',{timeZone: `${timezone}`})
    date = new Date(date);
    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = `${DAY_FULL[(+date.getDay() + 1) % countDay]}`;
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = `${DAY_FULL[(+date.getDay() + 2) % countDay]}`;
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = `${DAY_FULL[(+date.getDay() + 3) % countDay]}`;
}

async function getTown(){
    let location = requestItem('https://ipinfo.io/json?token=fa763d842192af');
    try{
        const { city,country,timezone } = await location;
        document.getElementsByClassName('main__section2__town')[0].innerHTML = `${city}, ${COUNTRY[country]}`;
        return [city,country,timezone];
        }
    catch(err){
        return err;
    }
}

async function createTemperature(){

    let divFirst = document.createElement('div');
    let img = document.createElement('img');
    let divSecond = document.createElement('div')
    let span = document.createElement('span');
    let divFirstImage = document.createElement('img');

    divFirst.classList.add('main__section2__temperature-now');
    img.classList.add('main__section2__temperature-img');
    divSecond.classList.add('main__section2__temperature-description');
    divFirstImage.classList.add('temperature-now-img');


    divFirstImage.src = '../dist/assets/images/circle.png'

    divFirst.append(span);
    divFirst.append(divFirstImage);

    document.getElementsByClassName('main__section2__temperature')[0].append(divFirst)
    document.getElementsByClassName('main__section2__temperature')[0].append(img)
    document.getElementsByClassName('main__section2__temperature')[0].append(divSecond)

    let town;
    let countryName;
    try{
    let [city, country] = await getTown();
    town = city;
    countryName = country;
    }
    catch(err){
        return err;
    }

    let req = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town},${countryName}&key=753dbcf8ea7448dca74e39bf78586244`);
    try{
        let weatherNow = await req;
        weatherNow = weatherNow.data[0]
        span.innerHTML = Math.round(weatherNow.temp);
        img.src = `../dist/assets/images/weather/${weatherNow.weather.icon}.png`
        }
    catch(err){
        return err;
    }
}

async function createWeather(){    
    let town;
    let countryName;
    let [city, country] = await getTown();
    town = city;
    countryName = country;
    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town},${countryName}&key=753dbcf8ea7448dca74e39bf78586244&days=4`);
    for(let i = 0; i < 3; i++){
        let img = document.createElement('img');
        let span = document.createElement('span');
        img.classList.add('main__section3__weather-img');
        try{
            let weatherNow = await req;
            weatherNow = weatherNow.data[i + 1];
            span.innerHTML = Math.round(weatherNow.temp) + '°';
            img.src = `../dist/assets/images/weather/${weatherNow.weather.icon}.png`;
            img.style.width = '68px'
            }
        catch(err){
            return err;
        }
        document.getElementsByClassName('main__section3__weather-temperature')[i].append(span);
        document.getElementsByClassName('main__section3__weather-temperature')[i].append(img);
    }
}


async function createMap(){
    let divMap = document.createElement('div');
    let divFirst = document.createElement('div');
    let divSecond = document.createElement('div')

    divFirst.classList.add('main__section4-text');
    divSecond.classList.add('main__section4-text');
    divMap.id = 'map'

    document.getElementsByClassName('main__section4')[0].append(divMap);
    document.getElementsByClassName('main__section4')[0].append(divFirst);
    document.getElementsByClassName('main__section4')[0].append(divSecond);

    document.getElementById('map').style.width = '400px';
    document.getElementById('map').style.height = '375px';

    await addLoc();

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsa3ViIiwiYSI6ImNrM2tqd2IyZTAzdDEza240OHE0NGZvMWwifQ.u4ePMf5LJIEOrcLdPByj2g';
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding.forwardGeocode({
        query: 'Wellington, New Zealand',
        autocomplete: false,
        limit: 1
    })
    .send()
    .then(function (response) {
        if (response && response.body && response.body.features && response.body.features.length) {
        var feature = response.body.features[0];
        feature.center = [long,lat] //longitude,latitude
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: feature.center,
            zoom: 10
        });
        new mapboxgl.Marker()
        .setLngLat(feature.center)
        .addTo(map);
        }
    });
}

function create(mas,className){
    if(document.getElementsByClassName(`${className}`).length === 1){
        for(let i = 0; i < mas.length; i++){
            let div = document.createElement('div');
            div.classList.add(`${mas[i]}`);
            document.getElementsByClassName(`${className}`)[0].append(div);
        }
    }
    else{
        for(let j = 0; j < document.getElementsByClassName(`${className}`).length; j++){
            for(let z = 0; z < mas.length; z++){
                let div = document.createElement('div');
                div.classList.add(`${mas[z]}`);
                document.getElementsByClassName(`${className}`)[j].append(div);
            }
        }
    }
}

function addImg(){
    let img = document.createElement('img');
    img.src = '../dist/assets/images/switch.png';
    document.getElementsByClassName('main__section1__switch-photo')[0].append(img);
}

function addTemperature(){
    document.getElementsByClassName('switch-temperature-item-F')[0].innerHTML = '°F';
    document.getElementsByClassName('switch-temperature-item-C')[0].innerHTML = '°C';
    document.getElementsByClassName('switch-temperature-item-C')[0].classList.add('active');
}

function switchLang(){
    let img = document.createElement('img');
    img.src = '../dist/assets/images/down.png'; 
    document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = 'EN';
    document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
}

async function addInfo(){
    let town;
    let countryName;
    let [city, country] = await getTown();
    town = city;
    countryName = country
    let req = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town},${countryName}&key=753dbcf8ea7448dca74e39bf78586244`);
    try{
        let weatherNow = await req;
        weatherNow = weatherNow.data[0]
        document.getElementsByClassName('main__section2__element')[0].innerHTML = weatherNow.weather.description;
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(weatherNow.app_temp)}°`;
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `WIND: ${Math.round(weatherNow.wind_spd)}M/S`;
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${weatherNow.rh}%`;
        }
    catch(err){
        return err;
    }
}

async function backgroundImg(){
    const SEASON = ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'];
    let time;
    let weather;
    let date;
    let [town,country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town},${country}&key=753dbcf8ea7448dca74e39bf78586244`);
    console.log()
    try{
    let weatherNow = await reqWeather;
    weatherNow = weatherNow.data[0];
    let timezone = weatherNow.timezone;
    weather = weatherNow.weather.description;
    date = new Date().toLocaleString('en-EN',{timeZone: `${timezone}`})
    date = new Date(date);
    }
    catch(err){
        return err;
    }
    if(date.getHours() > 6 && date.getHours() < 18)
        time = 'day'
    else time = 'night';
    try{
    let req = requestItem(`https://api.unsplash.com/photos/random?query=${SEASON[date.getMonth()]},${time},${weather}&client_id=ac0b1211b12e78e6cac4831942dc71d2af196faa332462c746a0a3d213383c23`)
    let { urls } = await req;
    document.getElementsByClassName('main')[0].style.background = `url(${urls.small}) center center / cover no-repeat`;
        }
    catch(err){
        return err;
    }
}

export { createPage,backgroundImg,getTown,timeNow }