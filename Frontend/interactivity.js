
// Les div à remplir par les images de films que l'on va retrieve via l'API OC-Movies, en effectuant
// des query via fetch() qui nous retourneront l'url de ces images
let divBestMovieId = 'bestMovieList'
let divBestAdventureId = 'bestAdventureList'
let divBestHistoryId = 'bestHistoryList'
let divBestComedyId = 'bestComedyList'
let divFirstMovieId = 'BestMovie'
let divTitleToChange = 'BestMovieTitle'

// Le nombre de films à retourner par catégorie
const NumMoviesToShow = 7


// Fonction permettant de fetch les img des 7 meilleurs films ou les 7 meilleurs films d'une cat. 
// avec l'id des film dans une dive de les insérer 

let fetch_movies = function(url, div, numberOfMovies, genre='', pageNumber = 1) {
    
        retrieveFirst5Movies(url, div, genre);
        // ici le setTimeout juste en-dessous sert à décaler légèrement le fetch des deux images
        // restantes afin d'être sûr qu'elles seront rajoutées à la fin et pas au début de la div
        setTimeout(() => retrieveRestOfMovies(div, numberOfMovies, genre), 100);
    }


// Fonction permettant de fetch les 5 premiers films 
let retrieveFirst5Movies = function (url, div, genre='') {
    console.log("retieveFIrst5Movies is called");
    divToChange = document.getElementById(div)
        fetch(url + genre, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                }
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                for (let counter = 0; counter < 5; counter++) {
                    let movie_id = data.results[counter].id
                    let img_url = data.results[counter].image_url
                    let new_img = document.createElement("img")
                    new_img.setAttribute("id", movie_id)
                    new_img.setAttribute("src", img_url)
                    divToChange.appendChild(new_img)
                }
                
            })
            .catch((err) => {
                console.log("there is an error")
                console.log(err)
            })
}

// Fonction permettant de fetch les deux films après les 5 premiers, étant donné que l'API OC-Movies
// ne peut renvoyer les informations de seulement 5 films par page.
let retrieveRestOfMovies = function(div, numberOfMovies, genre='', pageNumber = 1) {
    console.log("retieveRestOfMovies is called");
    divToChange = document.getElementById(div)  
    movieLeftToRetrieve = numberOfMovies % 5
    fetch('http://localhost:8000/api/v1/titles/?page=' + (pageNumber+1).toString() + '&sort_by=-imdb_score' + genre, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        for (let counter = 0; counter < movieLeftToRetrieve; counter++) {
            let movie_id = data.results[counter].id
            let img_url = data.results[counter].image_url
            let new_img = document.createElement("img")
            new_img.setAttribute("id", movie_id)
            new_img.setAttribute("src", img_url)
            divToChange.appendChild(new_img)
        }
    })
    .catch((err) => {
        console.log("there is an error")
        console.log(err)
    })
}

// Fonction permettant de fetch un seul film
let retrieveFirstMovie = function (url, div, genre='') {
    console.log("retrieveFirstMovie");
    divToChange = document.getElementById(div)
        fetch(url + genre, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                }
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                let movie_id = data.results[0].id
                let movie_title = data.results[0].title
                titleToChange = document.getElementsByClassName(divTitleToChange)
                console.log(titleToChange)
                console.log(titleToChange.innerHTML)
                titleToChange.innerHTML = movie_title
                console.log(titleToChange)
                console.log(titleToChange.innerHTML)
                let img_url = data.results[0].image_url
                let new_img = document.createElement("img")
                new_img.setAttribute("id", movie_id)
                new_img.setAttribute("src", img_url)
                new_img.setAttribute("width", '300px')
                divToChange.appendChild(new_img)
            })
            .catch((err) => {
                console.log("there is an error")
                console.log(err)
            })
}


// Un Event Listener qui permet d'effectuer les fonctions fetch()(qui vont créer des img à
// l'intérieur des div spécifiées en haut de ce programme) et ce, dès le chargement du DOM.

document.addEventListener("DOMContentLoaded", function() {

    // Ici setTimeout() est utilisé pour décaler les fonctions asynchrones fetch() afin qu'elles ne
    // s'effectuent pas en même temps, ce qui peut faire bugger le programme ou faire apparaître 
    // certaines images dans de mauvaises catégories.
    setTimeout(() => retrieveFirstMovie('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divFirstMovieId), 200)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestMovieId, NumMoviesToShow), 1000)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestAdventureId, NumMoviesToShow, '&genre=Adventure'), 1500)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestHistoryId, NumMoviesToShow, '&genre=History'), 2000)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestComedyId, NumMoviesToShow, '&genre=Comedy'), 2500)
    
})


