function showRandomJoke() {
    var jokeP = document.getElementById('random-joke');
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    var apiUrl = 'https://icanhazdadjoke.com/';
    fetch(apiUrl, options)
        .then(function (res) {
        if (!res.ok) {
            throw new Error("Something went wrong and it couldn't retrieve the joke.... And that's not fun :-(");
        }
        console.log(typeof res);
        return res.json();
    })
        .then(function (data) {
        jokeP === null || jokeP === void 0 ? void 0 : jokeP.innerText = data.joke;
    })["catch"](function (e) { return console.log(e); });
}
