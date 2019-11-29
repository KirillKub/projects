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

export default function createPage(){
    let main = document.createElement('main');
    main.classList.add('main');
    document.body.append(main);
    create(BODY,'main');
    create(MAIN_SECTION1,'main__section1');
    create(MAIN_SECTION1_BOX,'main__section1__box');
    create(MAIN_SECTION1_SWITCH_TEMPERATURE,'main__section1__switch-temperature');
    create(MAIN_SECTION1_SEARCH,'main__section1__search');
    createSearch();
    create(MAIN_WRAPPER,'main__wrapper');
    create(MAIN_BOX,'main__box');
    create(MAIN_SECTION2,'main__section2');
    createTemperature();
    create(MAIN_SECTION2__TEMPERATURE_DESCRIPTION,'main__section2__temperature-description')
    create(MAIN_SECTION3,'main__section3');
    create(MAIN_SECTION3_WEATHER,'main__section3__weather');
    createWeather();
    createMap();
    addImg();
    addTemperature();
    switchLang();
    addInfo();
    document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Search city or ZIP';
    addLoc();
}
let test = requestItem('https://ipinfo.io/json?token=fa763d842192af');

async function addLoc(){
    try{
        const { loc } = await test;
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
    let divButton = document.createElement('div');
    let img = document.createElement('img');
    let button = document.createElement('button'); 

    img.src = '../dist/assets/images/search.png'
    input.classList.add(`main__section1__search-input`);
    div.classList.add(`search-flex-item`);
    divButton.classList.add(`main__section1__search-button`);
    button.classList.add('main__section1__search-button')
    button.innerHTML = 'search'

    div.append(img);
    divButton.append(button);
    document.getElementsByClassName(`main__section1__search-flex`)[0].append(input);
    document.getElementsByClassName(`main__section1__search-flex`)[0].append(div);
    document.getElementsByClassName(`main__section1__search-flex`)[0].append(divButton);
}

function createTemperature(){
    let divFirst = document.createElement('div');
    let img = document.createElement('img');
    let divSecond = document.createElement('div')
    let span = document.createElement('span');
    let divFirstImage = document.createElement('img');

    divFirst.classList.add('main__section2__temperature-now');
    img.classList.add('main__section2__temperature-img');
    divSecond.classList.add('main__section2__temperature-description');
    divFirstImage.classList.add('temperature-now-img');

    img.src = '../dist/assets/images/weather.png'
    divFirstImage.src = '../dist/assets/images/circle.png'
    span.innerHTML = 10;
    divFirst.append(span);
    divFirst.append(divFirstImage);

    document.getElementsByClassName('main__section2__temperature')[0].append(divFirst)
    document.getElementsByClassName('main__section2__temperature')[0].append(img)
    document.getElementsByClassName('main__section2__temperature')[0].append(divSecond)
}

function createWeather(){
    for(let i = 0; i < 3 ; i++){
    let img = document.createElement('img');
    let span = document.createElement('span');

    img.classList.add('main__section3__weather-img');
    img.src = '../dist/assets/images/weather2.png'

    document.getElementsByClassName('main__section3__weather-temperature')[i].append(span);
    document.getElementsByClassName('main__section3__weather-temperature')[i].append(img);
    }
}

function createMap(){
    let img = document.createElement('img');
    let divFirst = document.createElement('div');
    let divSecond = document.createElement('div')

    divFirst.classList.add('main__section4-text');
    divSecond.classList.add('main__section4-text');
    img.src = '../dist/assets/images/google.png'
    img.classList.add('main__section4-map');

    document.getElementsByClassName('main__section4')[0].append(img);
    document.getElementsByClassName('main__section4')[0].append(divFirst);
    document.getElementsByClassName('main__section4')[0].append(divSecond);
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

function addInfo(){
    document.getElementsByClassName('main__section2__element')[0]
    document.getElementsByClassName('main__section2__element')[1].innerHTML = 'Feels like:'
    document.getElementsByClassName('main__section2__element')[2].innerHTML = 'WIND:'
    document.getElementsByClassName('main__section2__element')[3].innerHTML = 'HUMIDITY:'
}
