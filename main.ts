function showRandomJoke() {

    const jokeP = document.getElementById('random-joke')

    const options : Object = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    const apiUrl = 'https://icanhazdadjoke.com/';
    fetch(apiUrl, options)
        .then((res) => {
            if (!res.ok) {

                throw new Error("Something went wrong and it couldn't retrieve the joke.... And that's not fun :-(")
            }
            return res.json()
        })
        .then((data) => {
            jokeP?.innerText = data.joke
        })
        .catch((e) => console.log(e))

    
}
