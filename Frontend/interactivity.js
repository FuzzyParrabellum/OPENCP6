
// Les div à remplir par les images de films que l'on va retrieve via l'API OC-Movies, en effectuant



// des query via fetch() qui nous retourneront l'url de ces images
let divBestMovieId = 'bestMovieList'
let divBestAdventureId = 'bestAdventureList'
let divBestHistoryId = 'bestHistoryList'
let divBestComedyId = 'bestComedyList'
let divFirstMovieId = 'BestMovie'
let divTitleToChange = 'titleToReplace'

// Les div sur lesquelles l'utilisateur va cliquer
let divBestMovieLeftArrow = ''
let divBestMovieRightArrow = "BestRatedAR";
let divAdventureLeftArrow = ''
let divAdventureRightArrow = ''
let divHistoryLeftArrow = ''
let divHistoryRightArrow = ''
let divComedyLeftArrow = ''
let divComedyRightArrow = ''


let BestRA = document.getElementById(divBestMovieRightArrow)

// Le numéro de page sur lequel on est en fonction de chaque catégorie
let BestRatedPage = 0
let AdventurePage = 0
let HistoryPage = 0
let ComedyPage = 0


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
let retrieveFirst5Movies = function (url, div, genre='', pageNumber = 1) {
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
                titleToChange = document.getElementById(divTitleToChange)
                titleToChange.innerHTML = movie_title
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

// On ajoute des event Listener pour chaque flèche permettant de faire défiler les films
BestRA.addEventListener("click", async function() {
    // il faut ici trouver un moyen de savoir sur quel page number on est
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '', 1)
    console.log('movies_idx35 is ' + movies_idx35)
    console.log("its type is " + (typeof movies_idx35))
    // Dans un 1er temps, déplier la liste pour mettre les 35 films côte à côte genre de 0-34
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    // let page_6
    // let page_7
    let full_movie_index = []
    for (Fivemovie in movies_idx35) {
        for (movie in Fivemovie) {
            full_movie_index.push(movie)
        }
    }
    console.log("full_movie_index is " + full_movie_index)
    console.log("page1 is " + page_1)
    console.log("page_1[0] is " + page_1[0])
    console.log('le type de page_1 est ' + (typeof page_1))
    console.log("page_2 is " + page_2)
    if (BestRatedPage === 0) {
        console.log("le if marche")
        // boucle for pour les 7 img a retrieve (peut être comprise dans une fonction0)
        for (img_id in full_movie_index.slice(0, 7)) {
            
            // IMPORTANT ne pas oublier de mettre un try / catch
            // fonction1 permettant de fetch les url d'une img en fonction de son id
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            // fonction 2 permettant de remplacer les attributs de chaque img d'une div par un autre attribut, càd une
            // url par une autre
            console.log(img_url)
        }
        
    } else if (BestRatedPage === 1) {

    } else if (BestRatedPage === 2) {

    } else if (BestRatedPage === 3) {

    } else if (BestRatedPage === 4) {

    }
    // En fonction de la page où on est, on affiche les bonnes images dans les div en remplaçant les url qui y sont déjà
    // par les url qu'on va aller chercher avec les id que l'on a récupéré dans l'ordre







    
    // suivant le page Number, on va prendre un bout de cette liste, qui va constituer les 7 images à afficher
    // pour chacune des 7 images affichées actuellement, càd chaque div, enfant de la div principale dans laquelle on opère,
    // on va changer deux attributs à l'image, son url et son id
    // Donc boucle for qui compare chaque div avec chaque nouvelle image et qui change les propriétés

})

// // Fonction permettant de fetch de nouveaux films après qu'on ai click sur une flèche
// let fetch_movies_onClick = function(url, genre='', pageNumber = 1) {

//     full_list_of_img = []
//     for (let counter = 0; counter < 7; counter++) {
//         list_of_img = setTimeout(() => retrieve35Movies(url, genre, pageNumber), 500);
//         console.log("the list of img is " + list_of_img)
//         full_list_of_img.push(list_of_img)
//         pageNumber++;
//     }
//     // console.log(full_list_of_img[0])
//     // console.log(full_list_of_img[0][0])
    
// }

// Il faudrait que cette version de la fonction marche pour que retrieve35Movies soit appellée de la bonne façon
// Cette version est sensée appeler retrieve35 movies 7 fois, une fois par page de 5 résultats, ce qui va donner
// 35 résultats en tout.
let fetch_movies_onClick = async function(url, genre='', pageNumber = 1) {

    full_list_of_img = []
    for (let counter = 0; counter < 7; counter++) {
        list_of_img = await retrieve35Movies(url, genre, pageNumber);
        full_list_of_img.push(list_of_img)
        pageNumber++;
    }
    return full_list_of_img
    
}


// Fonction permettant de fetch 5 autres films après un clic sur une flèche sur le coté d'une catégorie
let retrieve35Movies = async function (url, genre='', pageNumber = 1) {
    console.log("retieve35Movies is called");
    var url = url + "?page=" + pageNumber + "&sort_by=-imdb_score" + genre
    let fetching = await fetch(url, {
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
            let movies_img = [];
            for (let counter = 0; counter < 5; counter++) {
                let movie_id = data.results[counter].id
                movies_img.push(movie_id);
            }
            
            return movies_img
        })
        .catch((err) => {
            console.log("there is an error")
            console.log(err)
        })
        return fetching
}


// Le Code pour ouvrir une fenêtre modale pour le meilleur film
var modal = document.getElementById("modalBestMovie");

var btn = document.getElementById("BMPlayButton");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
  }

span.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

