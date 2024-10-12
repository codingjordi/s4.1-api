var reportAcudits = [];
var currentJoke = '';
var currentWeather;
function showWeather() {
    var weatherP = document.getElementById('weather-temperature');
    var weatherIcon = document.getElementById('weather-icon');
    var apiURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barcelona,ES/today?key=7VP4W48VEUSM3PFTTSAXLLNHD';
    fetch(apiURL)
        .then(function (res) {
        if (!res.ok) {
            throw new Error("Something went wrong and we couldn't retrieve the weather forecast");
        }
        return res.json();
    })
        .then(function (data) {
        currentWeather = data;
        console.log(data);
        weatherP === null || weatherP === void 0 ? void 0 : weatherP.textContent = parseInt(fahrenheitToCelsius(data.days[0].temp)) + 'ºC';
        if (data.days[0].conditions.includes('Rain')) {
            weatherIcon.src = './public/heavy-rain.png';
        }
        if (data.days[0].conditions.includes('Partially')) {
            weatherIcon.src = './public/partially-cloud.png';
        }
        if (data.days[0].conditions.includes('Clear')) {
            weatherIcon.src = './public/sunny.png';
        }
    });
}
function fahrenheitToCelsius(fahrenheitTemp) {
    var celsius = (fahrenheitTemp - 32) * 5 / 9;
    return celsius;
}
function showRandomJoke() {
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    var apiURL = 'https://icanhazdadjoke.com/';
    var jokeP = document.getElementById('random-joke');
    fetch(apiURL, options)
        .then(function (res) {
        if (!res.ok) {
            throw new Error("Something went wrong and it couldn't retrieve the joke.... And that's not fun :-(");
        }
        return res.json();
    })
        .then(function (data) {
        currentJoke = data.joke;
        jokeP.innerText = currentJoke;
        if (!reportAcudits.some(function (joke) { return joke.joke === currentJoke; })) {
            reportAcudits.push({
                joke: data.joke,
                score: 0,
                date: new Date().toISOString()
            });
        }
    })["catch"](function (e) { return console.log(e); });
}
function rateJoke(points) {
    var jokeToRate = reportAcudits.find(function (joke) {
        return joke.joke === currentJoke;
    });
    if (jokeToRate) {
        jokeToRate.score = points;
        console.log(reportAcudits);
        showVoteModal();
    }
}
function showVoteModal() {
    var modal = document.getElementById('vote-modal');
    modal === null || modal === void 0 ? void 0 : modal.classList.add('show');
    setTimeout(function () {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove('show');
    }, 1500);
}
