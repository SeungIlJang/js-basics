const weather = document.querySelector(".js-weather");
const API_KEY="000bdedbb8304073bdfb92be949e5b48";
const COORDS = 'coords';


function getWeather(lat,lon) {
    console.log(lat,lon);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML=`${temperature} @ ${place}`;
    });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));

}
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError() {
    console.log("Can access geo location");

}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);

}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    // console.log(loadedCoords);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }

}

function init() {
    loadCoords();
}

init();
