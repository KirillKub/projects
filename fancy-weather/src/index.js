import { createPage, backgroundImg, getTown, timeNow } from './init';
import requestItem from './request';
import { COUNTRY } from './country'

let input = '';
let temp;
let town;
let language = {
    lang: 'EN',
};


const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_RUS = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
const DAY_BLR = ['Няд','Пнд','Аўт','Сер','Чцв','Пят','Суб',]
const DAY_FULL_RUS = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const DAY_FULL_BLR = ['Нядзеля','Панядзелак','Аўторак','Серада','Чацвер','Пятніца','Субота'];
const DAY_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_RUS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTH_BLR = ['Студзень','Люты','Сакавік','Красавік','Травень','Чэрвень','Ліпень','Жнівень','Верасень','Кастрычнік','Лістапад','Снежань']
   
createPage();
setInterval(time,60000);

async function time(){
    let [town,country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=753dbcf8ea7448dca74e39bf78586244`);
    try{
        let weatherNow = await reqWeather;
        weatherNow = weatherNow.data[0];
        let timezone = weatherNow.timezone;
        let date = new Date().toLocaleString('en-EN',{timeZone: `${timezone}`})
        date = new Date(date);
        let minute = date.getMinutes();
        if(minute < 10){
            minute = '0' + date.getMinutes();
        }
        if(language.lang === 'EN')
        document.getElementsByClassName('main__section2__day')[0].innerHTML = 
        `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
        if(language.lang === 'RU')
        document.getElementsByClassName('main__section2__day')[0].innerHTML = 
        `${DAY_RUS[date.getDay()]} ${date.getDate()} ${MONTH_RUS[date.getMonth()]}, ${date.getHours()}:${minute}`;
        if(language.lang === 'BY')
        document.getElementsByClassName('main__section2__day')[0].innerHTML = 
        `${DAY_BLR[date.getDay()]} ${date.getDate()} ${MONTH_BLR[date.getMonth()]}, ${date.getHours()}:${minute}`;
    }
    catch(err){
        return err;
    }
}


document.getElementsByClassName('main__section1__switch-photo')[0].addEventListener('click',function swapBg(){
    backgroundImg()
})

document.getElementsByClassName('main__section1__switch-temperature')[0].addEventListener('click',async function swapTemperature(event){
    let target = event.target;
    document.getElementsByClassName('switch-temperature-item-C')[0].classList.remove('active');
    document.getElementsByClassName('switch-temperature-item-F')[0].classList.remove('active');
    target.classList.add('active')
    let countryName;
    let [city,country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
    town = city;
    countryName = country;
    target.classList.contains('switch-temperature-item-C') ? temp = 'units=M' : temp = 'units=I'
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=753dbcf8ea7448dca74e39bf78586244&${temp}`);
    try{
        let weatherNow = await reqWeather;
        weatherNow = weatherNow.data[0]
        document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(weatherNow.app_temp)}°`;
        }
    catch(err){
        return err;
    }   
    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town},${countryName}&key=753dbcf8ea7448dca74e39bf78586244&${temp}&days=4`);
    for(let i = 0; i < 3; i++){
        try{
            let weatherNow = await req;
            weatherNow = weatherNow.data[i + 1];
            document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = Math.round(weatherNow.temp) + '°';
            }
        catch(err){
            return err;
        }
    }
})

document.getElementsByClassName('main__section1__search-input')[0].addEventListener('focusout',function out(){
    input = document.getElementsByClassName('main__section1__search-input')[0].value;
})

document.getElementsByClassName('main__section1__search-button')[0].addEventListener('click',async function search(){
    town = input;
    let long;
    let lat;
    let timezone;
    let date;
    let lang = language.lang;
    let weatherNow;
    let minute;
    let text;
    if(lang === 'BY'){
        lang = 'be'
    }
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=753dbcf8ea7448dca74e39bf78586244&${temp}&lang=${lang}`);
    try{
        weatherNow = await reqWeather;
        weatherNow = weatherNow.data[0];
        timezone = weatherNow.timezone;
        lat = weatherNow.lat;
        long = weatherNow.lon;
        let city = weatherNow.city_name;
        let country = COUNTRY[weatherNow.country_code];
        text = `${city}, ${country}`
        date = new Date().toLocaleString('en-EN',{timeZone: `${timezone}`})
        date = new Date(date);
        minute = date.getMinutes();
        if(minute < 10){
            minute = '0' + date.getMinutes();
        }
    }
    catch(err){
            return err;
    }
    let translate = requestItem(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-${lang.toLowerCase()}&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=${text}`)
    try{
        let newText = await translate
        text  = newText.text.join('');
        document.getElementsByClassName('main__section2__town')[0].textContent = text;
    }   
    catch(err){
        return err;
    }     
    if(language.lang === 'EN'){
        document.getElementsByClassName('main__section2__day')[0].innerHTML = 
        `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
        document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
        document.getElementsByClassName('main__section2__element')[0].innerHTML = weatherNow.weather.description;
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(weatherNow.app_temp)}°`;
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `WIND: ${Math.round(weatherNow.wind_spd)}M/S`;
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${weatherNow.rh}%`;
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${lat}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${long}`;
        }
    if(language.lang === 'RU'){
    document.getElementsByClassName('main__section2__day')[0].innerHTML = 
    `${DAY_RUS[date.getDay()]} ${date.getDate()} ${MONTH_RUS[date.getMonth()]}, ${date.getHours()}:${minute}`;
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = weatherNow.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Ощущается как: ${Math.round(weatherNow.app_temp)}°`
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Ветер: ${Math.round(weatherNow.wind_spd)}M/S`
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Влажность: ${weatherNow.rh}%`
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Широта: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Долгота: ${long}`;
    }
    if(language.lang === 'BY'){
    document.getElementsByClassName('main__section2__day')[0].innerHTML = 
    `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getHours()}:${minute}`;
    document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
    document.getElementsByClassName('main__section2__element')[0].innerHTML = weatherNow.weather.description;
    document.getElementsByClassName('main__section2__element')[1].innerHTML = `Адчувае, як: ${Math.round(weatherNow.app_temp)}°`
    document.getElementsByClassName('main__section2__element')[2].innerHTML = `Вецер: ${Math.round(weatherNow.wind_spd)}M/S`
    document.getElementsByClassName('main__section2__element')[3].innerHTML = `Вільготнасць: ${weatherNow.rh}%`
    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Шырота: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Даўгата: ${long}`;
    }

    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town}&key=753dbcf8ea7448dca74e39bf78586244&${temp}&days=4`);
    for(let i = 0; i < 3; i++){
        try{
            let weatherNow = await req;
            weatherNow = weatherNow.data[i + 1];
            document.getElementsByClassName('main__section3__weather-temperature')[i].firstChild.textContent = Math.round(weatherNow.temp) + '°';
            }
        catch(err){
            return err;
        }
    }

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
            zoom: 10,
        });
        new mapboxgl.Marker()
        .setLngLat(feature.center)
        .addTo(map);
        }
    });
})

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click', function translate(){
    let lang = language.lang;
    document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = '';
    document.getElementsByClassName('main__section1__switch-lang')[0].style.height = '90px'
    document.getElementsByClassName('main__section1__switch-lang')[0].style.display = 'block'
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div'); 
    div1.classList.add('lang-EN');
    div2.classList.add('lang-RU');
    div3.classList.add('lang-BY');
    div1.innerHTML = 'EN';
    div2.innerHTML = 'RU';
    div3.innerHTML = 'BY';
    document.getElementsByClassName('main__section1__switch-lang')[0].append(div1);
    document.getElementsByClassName('main__section1__switch-lang')[0].append(div2);
    document.getElementsByClassName('main__section1__switch-lang')[0].append(div3);
})

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('mouseleave', function translateHelper(){
    let img = document.createElement('img');
    img.src = '../dist/assets/images/down.png';
    document.getElementsByClassName('main__section1__switch-lang')[0].style.height = '44px'
    document.getElementsByClassName('main__section1__switch-lang')[0].style.display = 'flex'
    document.getElementsByClassName('main__section1__switch-lang')[0].innerHTML = language.lang;
    document.getElementsByClassName('main__section1__switch-lang')[0].append(img);
})

document.getElementsByClassName('main__section1__switch-lang')[0].addEventListener('click',async function changeLang(event){
    let target = event.target;
    let firstDay = document.getElementsByClassName('main__section3__weather-day')[0].textContent;
    let secondDay = document.getElementsByClassName('main__section3__weather-day')[1].textContent;
    let thirdDay = document.getElementsByClassName('main__section3__weather-day')[2].textContent;
    let dateNow = document.getElementsByClassName('main__section2__day')[0].innerHTML.split(' ');
    if(DAY_FULL_RUS.indexOf(firstDay) !== -1){
        firstDay = DAY_FULL_RUS.indexOf(firstDay)
    } 
    else if(DAY_FULL_BLR.indexOf(firstDay) !== -1){
        firstDay = DAY_FULL_BLR.indexOf(firstDay) 
    }
    else if(DAY_FULL.indexOf(firstDay) !== -1){
        firstDay = DAY_FULL.indexOf(firstDay) 
    }
    
    if(DAY_FULL_RUS.indexOf(secondDay) !== -1){
        secondDay = DAY_FULL_RUS.indexOf(secondDay)
    } 
    else if(DAY_FULL_BLR.indexOf(secondDay) !== -1){
        secondDay = DAY_FULL_BLR.indexOf(secondDay) 
    }
    else if(DAY_FULL.indexOf(secondDay) !== -1){
        secondDay = DAY_FULL.indexOf(secondDay) 
    }
    
    if(DAY_FULL_RUS.indexOf(thirdDay) !== -1){
        thirdDay = DAY_FULL_RUS.indexOf(thirdDay)
    } 
    else if(DAY_FULL_BLR.indexOf(thirdDay) !== -1){
        thirdDay = DAY_FULL_BLR.indexOf(thirdDay) 
    }
    else if(DAY_FULL.indexOf(thirdDay) !== -1){
        thirdDay = DAY_FULL.indexOf(thirdDay) 
    }
    let [town,country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
    let lang = language.lang;
    let langNow = target.innerHTML;
    if(langNow === 'BY'){
        langNow = 'be'
    }
    let desc;
    if(lang === 'BY'){
        lang = 'be';
    }
    if(event.target.classList.contains('lang-EN') || event.target.classList.contains('lang-RU') || event.target.classList.contains('lang-BY')){
        let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=753dbcf8ea7448dca74e39bf78586244&lang=${langNow}`);
        try{
            let weatherNow = await reqWeather;
            weatherNow = weatherNow.data[0];
            desc = weatherNow.weather.description;
            }
        catch(err){
            return err;
        }
    }
    if(target.classList.contains('lang-EN')){
        document.getElementsByClassName('lang-EN')[0].classList.add('active-lang');
        document.getElementsByClassName('lang-RU')[0].classList.remove('active-lang');
        document.getElementsByClassName('lang-BY')[0].classList.remove('active-lang');

        document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Search city';
        document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'search'
        let lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1]
        let long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1]
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${lat}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${long}`;

        let feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
        let wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
        let humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
        document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `FEELS LIKE: ${feels}`
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `Wind: ${wind}`
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${humidity}`

        document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL[firstDay]; 
        document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL[secondDay];
        document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL[thirdDay];

        dateNow[0] = DAY[DAY.indexOf(dateNow[0])] || DAY[DAY_RUS.indexOf(dateNow[0])] || DAY[DAY_BLR.indexOf(dateNow[0])]
        dateNow[2] = MONTH[MONTH.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH[MONTH_RUS.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH[MONTH_BLR.indexOf(dateNow[2].substr(0,dateNow[2].length-1))];
        dateNow[2] += ','
        document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

        let text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
        let translate = requestItem(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang.toLowerCase()}-en&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=${text}`)
        try{
            let newText = await translate
            document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
        }
        catch(err){
            return err;
        }
        language.lang = 'EN';
    }
    if(target.classList.contains('lang-RU')){
        document.getElementsByClassName('lang-RU')[0].classList.add('active-lang');
        document.getElementsByClassName('lang-EN')[0].classList.remove('active-lang');
        document.getElementsByClassName('lang-BY')[0].classList.remove('active-lang');
        document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Поиск города';
        document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'поиск'

        let lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1]
        let long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1]
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Широта: ${lat}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Долгота: ${long}`;

        let feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
        let wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
        let humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
        document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Ощущается как: ${feels}`
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `Ветер: ${wind}`
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `Влажность: ${humidity}`

        document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL_RUS[firstDay];  
        document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL_RUS[secondDay];
        document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL_RUS[thirdDay]; 

        dateNow[0] = DAY_RUS[DAY.indexOf(dateNow[0])] || DAY_RUS[DAY_RUS.indexOf(dateNow[0])] || DAY_RUS[DAY_BLR.indexOf(dateNow[0])]
        dateNow[2] = MONTH_RUS[MONTH.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH_RUS[MONTH_RUS.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH_RUS[MONTH_BLR.indexOf(dateNow[2].substr(0,dateNow[2].length-1))];
        dateNow[2] += ','
        document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

        let text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
        let translate = requestItem(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang.toLowerCase()}-ru&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=${text}`)
        try{
            let newText = await translate
            document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
        }
        catch(err){
            return err;
        }
        language.lang = 'RU';
    }
    if(target.classList.contains('lang-BY')){
        document.getElementsByClassName('lang-BY')[0].classList.add('active-lang');
        document.getElementsByClassName('lang-EN')[0].classList.remove('active-lang');
        document.getElementsByClassName('lang-RU')[0].classList.remove('active-lang');

        document.getElementsByClassName('main__section1__search-input')[0].placeholder = 'Пошук горада';
        document.getElementsByClassName('main__section1__search-button')[0].innerHTML = 'пошук'
        let lat = document.getElementsByClassName('main__section4-text')[0].innerHTML.split(': ')[1]
        let long = document.getElementsByClassName('main__section4-text')[1].innerHTML.split(': ')[1]
        document.getElementsByClassName('main__section4-text')[0].innerHTML = `Шырота: ${lat}`;
        document.getElementsByClassName('main__section4-text')[1].innerHTML = `Даўгата: ${long}`;

        let feels = document.getElementsByClassName('main__section2__element')[1].innerHTML.split(': ')[1];
        let wind = document.getElementsByClassName('main__section2__element')[2].innerHTML.split(': ')[1];
        let humidity = document.getElementsByClassName('main__section2__element')[3].innerHTML.split(': ')[1];
        document.getElementsByClassName('main__section2__element')[0].innerHTML = `${desc}`
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Адчувае, як: ${feels}`
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `Вецер: ${wind}`
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `Вільготнасць: ${humidity}`

        document.getElementsByClassName('main__section3__weather-day')[0].innerHTML = DAY_FULL_BLR[firstDay]; 
        document.getElementsByClassName('main__section3__weather-day')[1].innerHTML = DAY_FULL_BLR[secondDay];
        document.getElementsByClassName('main__section3__weather-day')[2].innerHTML = DAY_FULL_BLR[thirdDay];

        dateNow[0] = DAY_BLR[DAY.indexOf(dateNow[0])] || DAY_BLR[DAY_RUS.indexOf(dateNow[0])] || DAY_BLR[DAY_BLR.indexOf(dateNow[0])]
        dateNow[2] = MONTH_BLR[MONTH.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH_BLR[MONTH_RUS.indexOf(dateNow[2].substr(0,dateNow[2].length-1))] || 
        MONTH_BLR[MONTH_BLR.indexOf(dateNow[2].substr(0,dateNow[2].length-1))];
        dateNow[2] += ','
        document.getElementsByClassName('main__section2__day')[0].innerHTML = dateNow.join(' ');

        let text = document.getElementsByClassName('main__section2__town')[0].innerHTML;
        let translate = requestItem(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang.toLowerCase()}-be&key=trnsl.1.1.20191205T163757Z.c3d6ab6ae7596250.cc4958ec8ec058568342d356b7fd47f45f281462&text=${text}`)
        try{
            let newText = await translate
            document.getElementsByClassName('main__section2__town')[0].innerHTML = newText.text.join('');
        }
        catch(err){
            return err;
        }
        language.lang = 'BY';
    }
})

