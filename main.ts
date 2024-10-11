let reportAcudits : Array<{joke: String, score: Number, date: String}> = [] ;
let currentJoke = '';

const options : Object = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

const apiURL = 'https://icanhazdadjoke.com/';

function showRandomJoke() {

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
        showVoteModal(); // Muestra el modal al votar
    }
}


function showVoteModal() {
    const modal = document.getElementById('vote-modal');
    modal?.classList.add('show'); // Muestra el modal
    setTimeout(() => {
        modal?.classList.remove('show'); // Lo oculta después de 1.5 segundos
    }, 1500);
}
