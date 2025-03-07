const inputBox = document.querySelector(".input-box");
const weather_img = document.querySelector(".Weather-img");
const temp = document.querySelector(".temp");
const des = document.querySelector(".description");
const searchBtn = document.getElementById("searchBtn");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const notFound = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const body = document.querySelector("body");
const video = document.querySelector(".background-vid");
const container = document.querySelector(".container");


function handlerSrh(){
    if(inputBox.value==""){
        alert("Please enter city first");
        return;
    }
    
    checkWeather(inputBox.value);
    container.style.backgroundColor="#fff";
    video.style.display="none";
}

searchBtn.addEventListener("click",handlerSrh);

inputBox.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        handlerSrh();
    }
});

async function checkWeather(city){
    const api_key = "dff54037d0d74612f63dcc00cc02dca9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`)
    .then( (response) =>response.json());

    if(weather_data.cod === '404'){
        notFound.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }else{
        weather_body.style.display = "flex";
    }
    
    temp.innerHTML = `${Math.round(weather_data.main.temp -273.15)}°C`;

    des.innerHTML = `${weather_data.weather[0].description}`;

    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    switch(weather_data.weather[0].main){
        case 'Clouds':weather_img.src="./assets/cloud.png";
        break;
        case 'Clear':weather_img.src="./assets/clear.png";
        break;
        case 'Rain':weather_img.src="./assets/rain.png";
        break;
        case 'Mist':weather_img.src="./assets/mist.png";
        break;
        case 'Snow':weather_img.src="./assets/snow.png";
        break;
    }
    console.log(weather_data);
}