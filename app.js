const weatherApi = {
    key: "5996e13b1e10029c5ef8e107cdeab9b3",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => weather.json())
        .then(showWeatherReport)
        .catch(error => console.error('Error:', error));
}

// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    updateBackgroundImage(weatherType.textContent);
}

// Update Background Image based on weather type
function updateBackgroundImage(weatherType) {
    if (weatherType === 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weatherType === 'Clouds' || weatherType === 'Haze') {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    } else if (weatherType === 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    } else if (weatherType === 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if (weatherType === 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } 
}

// Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

// Toggle Theme
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Update current time
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Initial call to update time and set interval to update every second
updateTime();
setInterval(updateTime, 1000);
