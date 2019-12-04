import { createPage, backgroundImg, getTown, timeNow } from './init';
import requestItem from './request';
import { COUNTRY } from './country'

let input = '';
let temp;

createPage();
setInterval(timeNow,60000);


document.getElementsByClassName('main__section1__switch-photo')[0].addEventListener('click',function swapBg(){
    backgroundImg()
})

document.getElementsByClassName('main__section1__switch-temperature')[0].addEventListener('click',async function swapTemperature(event){
    let target = event.target;
    document.getElementsByClassName('switch-temperature-item-C')[0].classList.remove('active');
    document.getElementsByClassName('switch-temperature-item-F')[0].classList.remove('active');
    target.classList.add('active')
    let town;
    let countryName;
    let [city,country] = document.getElementsByClassName('main__section2__town')[0].innerHTML.split(', ');
    town = city;
    countryName = country;
    target.classList.contains('switch-temperature-item-C') ? temp = 'units=M' : temp = 'units=I'
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town},${countryName}&key=e5207f4c184148099e553f8f485fb73e&${temp}`);
    try{
        let weatherNow = await reqWeather;
        weatherNow = weatherNow.data[0]
        document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(weatherNow.app_temp)}°`;
        }
    catch(err){
        return err;
    }   
    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town},${countryName}&key=e5207f4c184148099e553f8f485fb73e&${temp}&days=4`);
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

document.getElementsByClassName('main__section1__search-input')[0].addEventListener('focusout',function(){
    input = document.getElementsByClassName('main__section1__search-input')[0].value;
})

document.getElementsByClassName('main__section1__search-button')[0].addEventListener('click',async function search(){
    let town = input;
    let long;
    let lat;
    let reqWeather = requestItem(`https://api.weatherbit.io/v2.0/current?city=${town}&key=e5207f4c184148099e553f8f485fb73e&${temp}`);
    try{
        let weatherNow = await reqWeather;
        weatherNow = weatherNow.data[0];
        lat = weatherNow.lat;
        long = weatherNow.lon;
        document.getElementsByClassName('main__section2__town')[0].textContent = `${weatherNow.city_name}, ${COUNTRY[weatherNow.country_code]}`;
        document.getElementsByClassName('main__section2__temperature-now')[0].firstChild.textContent = Math.round(weatherNow.temp);
        document.getElementsByClassName('main__section2__element')[0].innerHTML = weatherNow.weather.description;
        document.getElementsByClassName('main__section2__element')[1].innerHTML = `Feels like: ${Math.round(weatherNow.app_temp)}°`;
        document.getElementsByClassName('main__section2__element')[2].innerHTML = `WIND: ${Math.round(weatherNow.wind_spd)}M/S`;
        document.getElementsByClassName('main__section2__element')[3].innerHTML = `HUMIDITY: ${weatherNow.rh}%`;
        }
    catch(err){
        return err;
    }
    let req = requestItem(`https://api.weatherbit.io/v2.0/forecast/daily?city=${town}&key=e5207f4c184148099e553f8f485fb73e&${temp}&days=4`);
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

    document.getElementsByClassName('main__section4-text')[0].innerHTML = `Latitude: ${lat}`;
    document.getElementsByClassName('main__section4-text')[1].innerHTML = `Longitude: ${long}`;

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
})
