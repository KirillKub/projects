import requestItem from './request';

const BODY = ['main__section1','main__wrapper']
const MAIN_SECTION1 = ['main__section1__box','main__section1__search']
const MAIN_SECTION1_BOX = ['main__section1__switch-photo','main__section1__switch-lang','main__section1__switch-temperature']
const MAIN_SECTION1_SWITCH_TEMPERATURE = ['switch-temperature-item','switch-temperature-item'];
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

let town;

export default function createPage(){
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
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Search city or ZIP';
    addLoc();
    timeNow();
    weatherOnWeek();
}

async function addLoc(){
    let location = requestItem('https://ipinfo.io/json?token=fa763d842192af');
    try{
        const { loc } = await location;
        const [latitude,longitude ] = loc.split(',');
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${latitude}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${longitude}`;
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

function timeNow(){
    let date = new Date();
    let minute = date.getMinutes().toLocaleString();
    if(minute.length < 2){
        minute = '0' + date.getMinutes().toLocaleString();
    }
    document.getElementsByClassName('main__section2__day')[0].innerHTML = 
    `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getHours().toLocaleString()}:${minute}`;
}

async function weatherOnWeek(){
    let date = new Date()
    let countDay = 7;
    document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = `${DAY_FULL[(+date.getDay().toLocaleString() + 1) % countDay]}`;
    document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = `${DAY_FULL[(+date.getDay().toLocaleString() + 2) % countDay]}`;
    document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = `${DAY_FULL[(+date.getDay().toLocaleString() + 3) % countDay]}`;
}

async function getTown(){
    let location = requestItem('https://ipinfo.io/json?token=fa763d842192af');
    try{
        const { city,country } = await location;
        document.getElementsByClassName('main__section2__town')[0].innerHTML = `${city}, ${country}`;
        return city;
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
    try{
    town = await getTown();
    }
    catch(err){
        return err;
    }

    let req = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=ee871320653643dfb606e06d1fc619f5`);
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

// function createWeather(){
//     for(let i = 0; i < 3 ; i++){
//     let img = document.createElement('img');
//     let span = document.createElement('span');
//     img.classList.add('main__section3__weather-img');
//     document.getElementsByClassName('main__section3__weather-temperature')[i].append(span);
//     document.getElementsByClassName('main__section3__weather-temperature')[i].append(img);
//     }
// }

async function createWeather(){
    
    let town;
    try{
    town = await getTown();
    }
    catch(err){
        return err;
    }
    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town}&key=ee871320653643dfb606e06d1fc619f5&days=3`);
    for(let i = 0; i < 3; i++){
        let img = document.createElement('img');
        let span = document.createElement('span');
        img.classList.add('main__section3__weather-img');
        try{
            let weatherNow = await req;
            weatherNow = weatherNow.data[i];
            console.log(weatherNow)
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


function createMap(){
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
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsa3ViIiwiYSI6ImNrM2tqd2IyZTAzdDEza240OHE0NGZvMWwifQ.u4ePMf5LJIEOrcLdPByj2g';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [27.5667, 53.9000], // starting position [lng, lat]
        zoom: 1 // starting zoom
    })
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
    document.getElementsByClassName('switch-temperature-item')[0].innerHTML = '°F';
    document.getElementsByClassName('switch-temperature-item')[1].innerHTML = '°C';
    document.getElementsByClassName('switch-temperature-item')[1].classList.add('active');
}

function switchLang(){
    let img = document.createElement('img');
    img.src = '../dist/assets/images/down.png'; 
    document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = 'EN';
    document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
}

async function addInfo(){
    let town
    try{
    town = await getTown();
    }
    catch(err){
        return err;
    }
    let req = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=ee871320653643dfb606e06d1fc619f5`);
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
