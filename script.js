const apiKey = "ae29c7eba1badfe0e77913e1c472fa0c"

const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit", (e)=>{
    e.preventDefault()
    // console.log(cityNameEle.value);
    const cityValue = cityNameEle.value

    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try{
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response is not ok!")
        }

        const data = await response.json()
        // console.log(data);

        const temprature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
           return `<div>${detail}</div>`
        }).join("")

    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"

    }

}