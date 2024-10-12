let reportAcudits : Array<{joke: String, score: Number, date: String}> = [] ;
let currentJoke = '';
let currentWeather;
let counter = 0;


function showRandomJoke() {

    if(counter % 2 === 0) {
        showRandomChuckNorrisJoke();
        counter++;
    } else {
        showRandomDadJoke();
        counter++;
    }
}


function showWeather() : void {
    const weatherP = document.getElementById('weather-temperature') 
    const weatherIcon = document.getElementById('weather-icon')

    const apiURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barcelona,ES/today?key=7VP4W48VEUSM3PFTTSAXLLNHD'

    fetch(apiURL)
        .then((res : Response) => {
            if(!res.ok) {
                throw new Error("Something went wrong and we couldn't retrieve the weather forecast")
            }
            return res.json()
         }) 
        .then((data : Object) => {
            currentWeather = data;
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

function fahrenheitToCelsius(fahrenheitTemp : Number ) : Number  {
    let celsius = (fahrenheitTemp - 32) * 5 / 9;
    return celsius;
  }

function showRandomDadJoke() {

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
                throw new Error("Something went wrong and it couldn't retrieve a dad joke.... And that's not fun :-(")
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


function showRandomChuckNorrisJoke() {
    
    const apiURL = 'https://api.chucknorris.io/jokes/random';

    const jokeP = document.getElementById('random-joke')

    
    fetch(apiURL)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong and it couldn't retrieve a Chuck Norris joke.... And that's not fun :-(")
            }
            return res.json()
        })
        .then((data) => {
            currentJoke = data.value
            jokeP.innerText = currentJoke
            
            if(!reportAcudits.some((joke) => joke.joke === currentJoke)) {
                reportAcudits.push({
                    joke: data.value,
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
