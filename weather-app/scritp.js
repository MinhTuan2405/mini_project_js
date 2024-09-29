const config = {
    API_KEY: 'fb56ad8d12641a7a3a1abef164151f23'
}


const getData = (location) => {
    return new Promise ((resolve, reject) => {
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.API_KEY}`)
        .then (res => res.json ())
        .then (res => resolve(res))
        .catch (error => reject (error))
    })
}

document.querySelector ('.search-box button').addEventListener ('click', () => {

    let location = document.querySelector ('input').value
    location = location.replace (/[ ]+/g, "")

    // if nothing is entered
    if (location == '')
        return;


    // get the data
    getData (location)
    .then ((response) => {
        const city = document.querySelector ('.city')
        const container = document.querySelector ('.container')
        const weatherBox = document.querySelector ('.weather-box')  
        const weatherDetail = document.querySelector ('.weather-detail')
        const errorNotFoud = document.querySelector ('.not-found')
        if (response.cod == '404' || response.cod == '400') {
            city.textContent = location
            container.style.height = '400px'
            weatherBox.classList.remove('active')
            weatherDetail.classList.remove ('active')
            errorNotFoud.classList.add ('active')
            return;
        }

        if (city.textContent == location) {
            return;
        }else{
            city.textContent = location

            container.style.height = '555px'
            weatherBox.classList.add ('active')
            weatherDetail.classList.add ('active')
            errorNotFoud.classList.remove ('active')
            container.classList.add ('active')

            // setTimeout(() => {
            //     container.classList.remove ('active')
            // }, 2500);

            const image = document.querySelector ('.weather-box img')

            switch (response.weather[0].main) {
                case 'Clear':
                    image.scr = './images/clear.png'
                    break
    
                case 'Rain':
                    image.src = './images/rain.png'
                    break
    
                case 'Snow':
                    image.src = './images/snow.png'
                    break
    
                case 'Clouds':
                    image.src = './images/cloud.png'
                    break
    
                case 'Mist':
                case 'Haze':
                    image.src = './images/mist.png'
                    break
                
                default:
                    image.src = './images/cloud.png'
                    break
    
            }
            document.querySelector ('.weather-box .temperature')
            .innerHTML = `${parseInt (response.main.temp) - 273}<span>•C</span>`
    
            document.querySelector ('.weather-box .description')
            .innerHTML = `${response.weather[0].description}`
    
            document.querySelector ('.weather-detail .humidity span')
            .innerHTML = `${response.main.humidity}%`
    
            document.querySelector ('.weather-detail .wind span')
            .innerHTML = `${parseInt (response.wind.speed)}km/h`


            // const infoWeather = document.querySelector ('.info-weather')
            // const infoHumidity = document.querySelector ('.info-humindity')
            // const infoWind = document.querySelector ('.info-wind')

            // const elementCloneWeather = infoWeather.cloneNode (true)
            // const elementCloneHumidity = infoHumidity.cloneNode (true)
            // const elementCloneWind = infoWind.cloneNode (true)


            // elementCloneWeather.id = 'clone-info-weather'
            // elementCloneWeather.classList.add ('active-clone')

            // elementCloneHumidity.id = 'clone-info-humidity'
            // elementCloneHumidity.classList.add ('active-clone')

            // elementCloneWind.id = 'clone-info-wind'
            // elementCloneWind.classList.add ('active-clone')


            // setTimeout(() => {
            //     infoWeather.insertAdjacentElement ("afterend", elementCloneWeather)
            //     infoHumidity.insertAdjacentElement ("afterend", elementCloneHumidity)
            //     infoWind.insertAdjacentElement ("afterend", elementCloneWind)
            // }, 2200);

            // const cloneInfoWeather = document.querySelectorAll ('.info-weather.active-clone')
            // const totalCloneWeather = cloneInfoWeather.length
            // const FcloneInforWeather = cloneInfoWeather[0]

            // const cloneInfoHumidity = document.querySelectorAll ('.info-humidity.active-clone')
            // const totalCloneHumidity = cloneInfoHumidity.length
            // const FcloneInforHUmidity = cloneInfoHumidity[0]


            // const cloneInfoWind = document.querySelectorAll ('.info-wind.active-clone')
            // const totalCloneWind = cloneInfoWind.length
            // const FcloneInforWind = cloneInfoWind[0]


            // if (totalCloneWeather > 0) {
            //     FcloneInforWeather.classList.remove ('active-clone')
            //     FcloneInforHumidity.classList.remove ('active-clone')
            //     FcloneInforWind.classList.remove ('active-clone')

            //     setTimeout(() => {
            //         FcloneInforWeather.remove ()
            //         FcloneInforHUmidity,remove ()
            //         FcloneInforWind.remove ()
            //     }, 2200);
            // }
        }

       
    })

})


