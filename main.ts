let reportAcudits : Array<{joke: String, score: Number, date: String}> = [] ;
let currentJoke = '';
let currentWeather;



function showWeather() {
    const weatherP = document.getElementById('weather-temperature') 
    const weatherIcon = document.getElementById('weather-icon')

    const apiURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barcelona,ES/today?key=7VP4W48VEUSM3PFTTSAXLLNHD'

    fetch(apiURL)
        .then((res) => {
            if(!res.ok) {
                throw new Error("Something went wrong and we couldn't retrieve the weather forecast")
            }
            return res.json()
         }) 
        .then((data) => {
            currentWeather = data;
            console.log(data)
            weatherP?.textContent = parseInt(fahrenheitToCelsius(data.days[0].temp)) + 'ºC'
            if(data.days[0].conditions.includes('Rain')) {
                weatherIcon.src = './public/heavy-rain.png'
            }
            if(data.days[0].conditions.includes('Partially')) {
                weatherIcon.src = './public/partially-cloud.png'
            }
            if(data.days[0].conditions.includes('Clear')) {
                weatherIcon.src = './public/sunny.png'
            }
        })
}

function fahrenheitToCelsius(fahrenheitTemp : Number ) {
    let celsius = (fahrenheitTemp - 32) * 5 / 9;
    return celsius;
  }

function showRandomJoke() {

    const options : Object = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    
    const apiURL = 'https://icanhazdadjoke.com/';

    const jokeP = document.getElementById('random-joke')

    
    fetch(apiURL, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong and it couldn't retrieve the joke.... And that's not fun :-(")
            }
            return res.json()
        })
        .then((data) => {
            currentJoke = data.joke
            jokeP.innerText = currentJoke
            
            if(!reportAcudits.some((joke) => joke.joke === currentJoke)) {
                reportAcudits.push({
                    joke: data.joke,
                    score: 0,
                    date: new Date().toISOString()
                })
            }
        })
        .catch((e) => console.log(e))
}


function rateJoke(points: Number) {
    const jokeToRate = reportAcudits.find(joke => {
        return joke.joke === currentJoke;
    });

    if (jokeToRate) {
        jokeToRate.score = points;
        console.log(reportAcudits);
        showVoteModal();
    }
}


function showVoteModal() {
    const modal = document.getElementById('vote-modal');
    modal?.classList.add('show'); 
    setTimeout(() => {
        modal?.classList.remove('show');
    }, 1500);
}
