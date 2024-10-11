var reportAcudits = [];
var currentJoke = '';
var options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};
var apiURL = 'https://icanhazdadjoke.com/';
function showRandomJoke() {
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
        showVoteModal(); // Muestra el modal al votar
    }
}
function showVoteModal() {
    var modal = document.getElementById('vote-modal');
    modal === null || modal === void 0 ? void 0 : modal.classList.add('show'); // Muestra el modal
    setTimeout(function () {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove('show'); // Lo oculta después de 1.5 segundos
    }, 1500);
}
