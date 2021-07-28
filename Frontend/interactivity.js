

document.addEventListener("DOMContentLoaded", function() {
    // 1) récupérer l'id dans laquelle afficher les films
    let divBestMovie = document.getElementById('bestMovieList')
    // 2) récupérer les films du serveur
    
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', {
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
            img_url = data.results[0].image_url
            new_img = document.createElement("img")
            divBestMovie.appendChild(new_img)
            let bestMovieImg = document.querySelector("#bestMovieList img")
            bestMovieImg.setAttribute("src", img_url)
        })
        .catch((err) => {
            console.log("there is an error")
            console.log(err)
        })
    
    

    // 3) parser le json obtenu et l'afficher sur la page html
    
})