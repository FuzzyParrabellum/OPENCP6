

let divBestMovieId = 'bestMovieList'
let divBestAdventureId = 'bestAdventureList'
let divBestHistoryId = 'bestHistoryList'
let divBestComedyId = 'bestComedy'

const NumMoviesToShow = 7

// Fonction permettant de fetch les img des 7 meilleurs films ou les 7 meilleurs films d'une cat. et de les insérer 
// avec l'id des film dans une div

document.addEventListener("DOMContentLoaded", function() {

    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestMovieId, NumMoviesToShow), 1000)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestAdventureId, NumMoviesToShow, '&genre=Adventure'), 1000)
    // setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestHistoryId, NumMoviesToShow, '&genre=History'), 1000)
    // setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestComedyId, NumMoviesToShow, '&genre=Comedy'), 1000)
    
})



let fetch_movies = function(url, div, numberOfMovies, genre='', pageNumber = 1) {
    
        divToChange = document.getElementById(div)
        fetch(url + genre, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                }
            })
            .then(res => {
                console.log(genre)
                console.log(divToChange)
                return res.json()
            })
            .then(data => {
                movieLeftToRetrieve = numberOfMovies % 5
                if (movieLeftToRetrieve == 0) {
                    for (let counter = 0; counter < 5; counter++) {
                        let movie_id = data.results[counter].id
                        let img_url = data.results[counter].image_url
                        let new_img = document.createElement("img")
                        new_img.setAttribute("id", movie_id)
                        new_img.setAttribute("src", img_url)
                        divToChange.appendChild(new_img)
                    }
                } else {
                    for (let counter = 0; counter < 5; counter++) {
                        let movie_id = data.results[counter].id
                        let img_url = data.results[counter].image_url
                        let new_img = document.createElement("img")
                        new_img.setAttribute("id", movie_id)
                        new_img.setAttribute("src", img_url)
                        divToChange.appendChild(new_img)
                    }

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
            })
            .catch((err) => {
                console.log("there is an error")
                console.log(err)
            })
    }


// se rappeler de quand met un genre, doit marque &genre=Thriller par exemple




