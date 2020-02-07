
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
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    if (BestRatedPage === 0) {
        console.log("le if marche")
        // boucle for pour les 7 img a retrieve (peut être comprise dans une fonction0)
        for (index = 0; index < other_full_movies.slice(0, 7).length; index++) {
            
            img_id = other_full_movies.slice(8, 15)[index]
            // IMPORTANT ne pas oublier de mettre un try / catch
            // fonction1 permettant de fetch les url d'une img en fonction de son id
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            // fonction 2 permettant de remplacer les attributs de chaque img d'une div par un autre attribut, càd une
            // url par une autre
            console.log(img_url)
            let current_imgs = document.querySelectorAll('#' +divBestMovieId+' img')
            let current_img_id = current_imgs[index].id
            console.log("current_img_id est: " + current_img_id)
            console.log("img_id est avant chgmt: " + img_id)
            // doit maintenant remplacer les attributs existants par les nouveaux
            document.getElementById(current_img_id).src=`${img_url}`
            document.getElementById(current_img_id).id=`${img_id}`

            
            console.log("son nouvel id est " + current_imgs[index].id)
            
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

// conseils Arsène : créer modale avec visibility hidden
// après le fetch, remplir la modale puis changer la visibility en true 

// Le Code pour ouvrir une fenêtre modale du meilleur film en cliquant sur le bouton play
// var modal = document.getElementById("modalBestMovie");

// var btn = document.getElementById("BMPlayButton");

// var spanClose = document.getElementsByClassName("close")[0];

// btn.onclick = function() {
//     modal.style.display = "block";
//   }

// spanClose.onclick = function() {
//     modal.style.display = "none";
//   }

// window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }


let fillModalWindow = function(divToFill, img, title, genre, release_date, rated, imdb, director, 
                               actor, time, country, box_office, description) {
    // prendre l'id du film dans les attributs du film qu'on va getElementById
    // fetch les infos du films demandées : année, score imdb, acteurs, réal, etc.
    // afficher ces infos dans la fenêtre modale
    let show_img = document.createElement("img");
    let show_title = document.createElement("p");
    let show_genre = document.createElement("p");
    let show_release = document.createElement("p");
    let show_rated = document.createElement("p");
    let show_imdb = document.createElement("p");
    let show_director = document.createElement("p");
    let show_actor = document.createElement("p");
    let show_time = document.createElement("p");
    let show_country = document.createElement("p");
    let show_box_office = document.createElement("p");
    let show_description = document.createElement("p");

    show_img.setAttribute("src", img);
    show_img.setAttribute("class", "modal_img")
    show_title.setAttribute("class", "modal_title")
    show_title.innerHTML = title.toUpperCase();
    show_genre.innerHTML = "Genre(s): " + genre;
    show_release.innerHTML = "Release: " + release_date;
    show_rated.innerHTML = "Rated: " + rated;
    show_imdb.innerHTML = "Imdb_score: " + imdb;
    show_director.innerHTML = "Director(s): " + director;
    show_actor.innerHTML = "Actor(s): " + actor;
    show_time.innerHTML = "Duration: " + time + " min";
    show_country.innerHTML = "Countr(y)(ies): " + country;
    show_box_office.innerHTML = "Box-office: " + box_office;
    show_description.innerHTML = "Description: " + description;

    let infoDiv = document.createElement("div")
    infoDiv.setAttribute("class", "infoText")
    divToFill.appendChild(show_title);
    divToFill.appendChild(show_img);
    divToFill.appendChild(infoDiv)
    infoDiv.appendChild(show_genre);
    infoDiv.appendChild(show_release);
    infoDiv.appendChild(show_rated);
    infoDiv.appendChild(show_imdb);
    infoDiv.appendChild(show_director);
    infoDiv.appendChild(show_actor);
    infoDiv.appendChild(show_time);
    infoDiv.appendChild(show_country);
    infoDiv.appendChild(show_box_office);
    infoDiv.appendChild(show_description);
    // divToFill.appendChild(show_genre);
    // divToFill.appendChild(show_release);
    // divToFill.appendChild(show_rated);
    // divToFill.appendChild(show_imdb);
    // divToFill.appendChild(show_director);
    // divToFill.appendChild(show_actor);
    // divToFill.appendChild(show_time);
    // divToFill.appendChild(show_country);
    // divToFill.appendChild(show_box_office);
    // divToFill.appendChild(show_description);
}


// Event listener permettant d'effectuer une action quand une l'img d'un film est cliquée
document.addEventListener("click", ImgClickListener);

async function ImgClickListener(event) {
    var element = event.target;
    if (element.tagName == "IMG"){
        img_id = element.getAttribute("id");
        // il faut ici trouver la position de l'image pour pouvoir afficher une fenêtre modale 
        // dessus je pense
        // position = element.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        console.log(img_id)
        // appeler ensuite une fonction fetch asynchrone pour récupérer les différentes infos 
        // demandées par openclassroom 
        res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`)
        data = await res.json()
        //infos img de la pochette du film, titre du film, genre complet, date de sortie,
        //son Rated, son score Imdb, son réalisateur, la liste des acteurs, sa durée, le pays d'origine,
        //le résultat au box-office, le résumé du film
        let img_to_show_url = data.image_url
        let title = data.original_title
        let genre = data.genres
        let release_date = data.date_published
        let the_rated = data.rated
        let imdb = data.imdb_score
        let director = data.directors
        let actor_list = data.actors
        let time = data.duration
        let country = data.countries
        let box_office = data.worldwide_gross_income
        let short_description = data.description

        // Créer une fenêtre modale avec ces différentes infos
        // je pense qu'a l'intérieur de la div avec la classe modale, il faut ensuite créer un div
        // avec la classe modalContent
        let new_modal = document.createElement("div")
        new_modal.setAttribute("class", "modal")
        let modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modalContent")
        new_modal.appendChild(modal_content)

        // ici petit test pour voir si une fenêtre modale s'ouvre bien et peut se fermer dès
        // qu'on clique sur une image
        let modal_test1 = document.createElement("span")
        modal_test1.setAttribute("class", "close")
        modal_test1.innerHTML = "&times;"
        let modal_test2 = document.createElement("p")
        modal_test2.innerHTML = ""
        modal_content.appendChild(modal_test1)
        modal_content.appendChild(modal_test2)
        let test_div = document.getElementById(divBestMovieId)
        test_div.appendChild(new_modal)

        // On remplit la fenêtre modale avec les informations du film
        fillModalWindow(modal_content, img_to_show_url, title, genre, release_date, the_rated, imdb, 
            director, actor_list, time, country, box_office, short_description)
        // pour réaliser le test il faut encore faire du code javascript pr faire apparaitre 
        // et disparaître modale (voir au-dessus)
        new_modal.style.display = "block"; // apparement cette ligne n'est pas nécessaire
        modal_test1.onclick = function() {
            new_modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == new_modal) {
              new_modal.style.display = "none";
            }
          } 
    // La condition suivante permet d'afficher une fenêtre modale pour le meilleur film quand on
    // clique sur le bouton "Play"
    } else if (element.innerHTML == "Play") {
        console.log("button was pressed")
        let BestMovieImg = document.querySelector("#BestMovie img")
        img_id = BestMovieImg.getAttribute("id")
        console.log(img_id)
        res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`)
        data = await res.json()
        //infos img de la pochette du film, titre du film, genre complet, date de sortie,
        //son Rated, son score Imdb, son réalisateur, la liste des acteurs, sa durée, le pays d'origine,
        //le résultat au box-office, le résumé du film
        let img_to_show_url = data.image_url
        let title = data.original_title
        let genre = data.genres
        let release_date = data.date_published
        let the_rated = data.rated
        let imdb = data.imdb_score
        let director = data.directors
        let actor_list = data.actors
        let time = data.duration
        let country = data.countries
        let box_office = data.worldwide_gross_income
        let short_description = data.description

        // Créer une fenêtre modale avec ces différentes infos
        // je pense qu'a l'intérieur de la div avec la classe modale, il faut ensuite créer un div
        // avec la classe modalContent
        let new_modal = document.createElement("div")
        new_modal.setAttribute("class", "modal")
        let modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modalContent")
        new_modal.appendChild(modal_content)

        // ici petit test pour voir si une fenêtre modale s'ouvre bien et peut se fermer dès
        // qu'on clique sur une image
        let modal_test1 = document.createElement("span")
        modal_test1.setAttribute("class", "close")
        modal_test1.innerHTML = "&times;"
        let modal_test2 = document.createElement("p")
        modal_test2.innerHTML = ""
        modal_content.appendChild(modal_test1)
        modal_content.appendChild(modal_test2)
        let test_div = document.getElementById(divBestMovieId)
        test_div.appendChild(new_modal)

        // On remplit la fenêtre modale avec les informations du film
        fillModalWindow(modal_content, img_to_show_url, title, genre, release_date, the_rated, imdb, 
            director, actor_list, time, country, box_office, short_description)
        // pour réaliser le test il faut encore faire du code javascript pr faire apparaitre 
        // et disparaître modale (voir au-dessus)
        new_modal.style.display = "block";
        modal_test1.onclick = function() {
            new_modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == new_modal) {
              new_modal.style.display = "none";
            }
          } 
        
    } 
}