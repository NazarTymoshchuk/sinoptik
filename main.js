const API_KEY = "35fb68b7709beb3e39a474e03949e3cd"
const API_REQUEST = `https://api.openweathermap.org/data/2.5/weather?q=Rivne&appid=${API_KEY}&units=metric&lang=ua`


const mainTemp = document.querySelector("#main-temp")
const mainDescription = document.querySelector("#main-description")
const mainCity = document.querySelector("#main-city")
const windSpeed = document.querySelector("#wind-speed")
const humidity = document.querySelector("#humidity")
const pressure = document.querySelector("#pressure")
const visibility = document.querySelector("#visibility")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const date = document.querySelector("#date")

const coordCity = document.querySelector("#city-coord-name")
const coordTemp = document.querySelector("#coord-temp")

const coordCity2 = document.querySelector("#city-coord-name2")
const coordTemp2 = document.querySelector("#coord-temp2")

async function sendRequest() {
    const response = await fetch(API_REQUEST)
    const data = await response.json()
    console.log(data);

    

    mainTemp.innerHTML = `${Math.round(data.main.temp)}°C`
    mainDescription.innerHTML = `${data.weather[0].main}`
    mainCity.innerHTML = `${data.name}`
    windSpeed.innerHTML = `${data.wind.speed} km/h`
    humidity.innerHTML = `${data.main.humidity} %`
    pressure.innerHTML = `${data.main.pressure}`
    visibility.innerHTML = `${data.visibility / 1000} km`

    const UNIXsunrise = data.sys.sunrise * 1000
    const sunriseTime = new Date(UNIXsunrise)

    const UNIXsunset = data.sys.sunset * 1000
    const sunsetTime = new Date(UNIXsunset)

    sunrise.innerHTML = sunriseTime.toLocaleTimeString()
    sunset.innerHTML = sunsetTime.toLocaleTimeString()

    const UNIXdate = data.dt * 1000
    const dateTime = new Date(UNIXdate)

    date.innerHTML = dateTime.toDateString()


    const LAT = data.coord.lat
    const LON = data.coord.lon

    // Other Cities
// hello
    const API_REQUEST_COORD = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT + 0.3}&lon=${LON - 0.3}&appid=${API_KEY}&units=metric&lang=ua`;
    const response_coord = await fetch(API_REQUEST_COORD)
    const data_coord = await response_coord.json()
    console.log(data_coord);

    coordCity.innerHTML = `${data_coord.name}`
    coordTemp.innerHTML = `${Math.round(data_coord.main.temp)}°C`

    const API_REQUEST_COORD2 = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT - 0.3}&lon=${LON + 0.3}&appid=${API_KEY}&units=metric&lang=ua`;
    const response_coord2 = await fetch(API_REQUEST_COORD2)
    const data_coord2 = await response_coord2.json()
    console.log(data_coord2);

    coordCity2.innerHTML = `${data_coord2.name}`
    coordTemp2.innerHTML = `${Math.round(data_coord2.main.temp)}°C`

    changeBackgroundImage(data.weather[0].main)
}

const body = document.querySelector("body")

function changeBackgroundImage(description)
{
    if (description == "Clouds")
    {
        body.style.backgroundImage = `url("./images/Clouds.png")`
    }
    else if (description == "Clear")
    {
        body.style.backgroundImage = `url("./images/Sunny.png")`
    }
}

sendRequest()