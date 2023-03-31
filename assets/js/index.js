const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Weather = {
    container: $(".container"),
    search: $(".search-box button"),
    weatherBox: $(".weather-box"),
    weatherDetails: $(".weather-details"),
    error : $(".not-found"),

    start: function(){
        this.handleShow();
    },
    handleShow: function(){
        this.search.addEventListener('click',()=>{

            const APIKey = 'f68e56cb97171404f5884a1bcb3ae81e'
            const city = $(".search-box input").value

            if(city === '') return

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
                .then(response => response.json())
                .then(json =>{

                    if(json.cod === '404'){
                        this.container.style.height = '400px'
                        this.weatherBox.style.display = 'none'
                        this.weatherDetails.style.display = 'none'
                        this.error.style.display = 'block'
                        this.error.classList.add('fadeIn')
                        return
                    }
                    this.error.style.display = 'none'
                    this.error.classList.remove('fadeIn')

                    const image = $(".weather-box img")
                    const temperature = $(".weather-box .temperature")
                    const description = $(".weather-box .description")
                    const humidity = $(".weather-details .humidity span")
                    const wind = $(".weather-details .wind span")

                    switch(json.weather[0].main){
                        case 'Clear':
                            image.src = './assets/imgs/clear.png'
                            break;
                        case 'Rain':
                            image.src = './assets/imgs/rain.png'
                            break;
                        case 'Snow':
                            image.src = './assets/imgs/snow.png'
                            break;
                        case 'Clouds':
                            image.src = './assets/imgs/cloud.png'
                            break;
                        case 'Haze':
                            image.src = './assets/imgs/mist.png'
                            break;
                        default:
                            image.src = ''
                    }
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C<span>`
                    description.innerHTML = `${json.weather[0].description}`
                    humidity.innerHTML = `${json.main.humidity}%`
                    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

                    this.weatherBox.style.display = ''
                    this.weatherDetails.style.display = ''
                    this.weatherBox.classList.add('fadeIn')
                    this.weatherDetails.classList.add('fadeIn')
                    this.container.style.height = '590px'
                })
        })
    }
}

Weather.start();