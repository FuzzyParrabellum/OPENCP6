
// Les div à remplir par les images de films que l'on va retrieve via l'API OC-Movies, en effectuant
// des query via fetch() qui nous retourneront l'url de ces images et leur id
let divBestMovieId = 'bestMovieList';
let divBestAdventureId = 'bestAdventureList';
let divBestHistoryId = 'bestHistoryList';
let divBestComedyId = 'bestComedyList';
let divFirstMovieId = 'BestMovie';
let divTitleToChange = 'titleToReplace';


// Les id des div sur lesquelles l'utilisateur va cliquer quand il voudra faire défiler les listes de meilleurs films
// d'une catégorie
let divBestMovieLeftArrow = 'BestRatedAL';
let divBestMovieRightArrow = 'BestRatedAR';
let divAdventureLeftArrow = 'BestAdventureAL';
let divAdventureRightArrow = 'BestAdventureAR';
let divHistoryLeftArrow = 'BestHistoryAL'
let divHistoryRightArrow = 'BestHistoryAR'
let divComedyLeftArrow = 'BestComedyAL'
let divComedyRightArrow = 'BestComedyAR'

// On utile ces id pour trouver les div correspondantes, on leur rajoutera ensuite des EventListener onclick
let BestRA = document.getElementById(divBestMovieRightArrow);
let BestLA = document.getElementById(divBestMovieLeftArrow);
let AdventureRA = document.getElementById(divAdventureRightArrow);
let AdventureLA = document.getElementById(divAdventureLeftArrow);
let HistoryRA = document.getElementById(divHistoryRightArrow);
let HistoryLA = document.getElementById(divHistoryLeftArrow);
let ComedyRA = document.getElementById(divComedyRightArrow);
let ComedyLA = document.getElementById(divComedyLeftArrow);

// Le numéro de page sur lequel on est en fonction de chaque catégorie de film
let BestRatedPage = 0;
let AdventurePage = 0;
let HistoryPage = 0;
let ComedyPage = 0;


// Le nombre de films à retourner par catégorie
const NumMoviesToShow = 7


// Fonction permettant de fetch les img des 7 meilleurs films ou les 7 meilleurs films d'une cat. 
// avec l'id des films ajouté en attribut de ces img.
// On y utilise retrieveFirst5Movies pour obtenir les 5 premiers films du fetch, puis la fonction retrieveRestOfMovies
// pour retrieve les 2 films suivants. Cela permet d'afficher 7 films par page.

let fetch_movies = function(url, div, numberOfMovies, genre='', pageNumber = 1) {
    
        retrieveFirst5Movies(url, div, genre);
        // ici le setTimeout juste en-dessous sert à décaler légèrement le fetch des deux images
        // restantes afin d'être sûr qu'elles seront rajoutées à la fin et pas au début de la div
        setTimeout(() => retrieveRestOfMovies(div, numberOfMovies, genre), 100);
    }


// Fonction permettant de fetch les img des 5 meilleurs films d'une catégorie, le paramètre div indique dans quelle
// div append ces img 
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

// Fonction permettant de fetch le meilleur film, affiché en haut de la page web, avec son titre à coté.
let retrieveFirstMovie = async function (url, div, genre='') {
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

// Un Event Listener qui permet d'utiliser les différentes fonctions fetch() développées plus haut (qui vont créer des
// img à l'intérieur des div spécifiées en haut de ce programme) et ce, dès le chargement de la page et donc du DOM.

document.addEventListener("DOMContentLoaded", async function() {

    // Ici setTimeout() est utilisé pour décaler les fonctions asynchrones fetch() afin qu'elles ne
    // s'effectuent pas en même temps, ce qui peut faire bugger le programme ou faire apparaître 
    // certaines images dans de mauvaises catégories.
    setTimeout(() => retrieveFirstMovie('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divFirstMovieId), 200)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestMovieId, NumMoviesToShow), 1000)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestAdventureId, NumMoviesToShow, '&genre=Adventure'), 1500)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestHistoryId, NumMoviesToShow, '&genre=History'), 2000)
    setTimeout(() => fetch_movies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', divBestComedyId, NumMoviesToShow, '&genre=Comedy'), 2500)
    
})


// Event listener permettant d'afficher une fenêtre modale quand une l'img d'un film est cliquée, ou quand le bouton 
// "Play" en haut de la page web est cliqué 

document.addEventListener("click", ImgClickListener);

async function ImgClickListener(event) {
    var element = event.target;
    if (element.tagName == "IMG"){
        img_id = element.getAttribute("id");
        // Après avoir récupéré l'attribut "id" d'une img de film, on va ensuite appeler une fonction fetch asynchrone
        // pour récupérer les différentes infos demandées pour le projet. 
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

        // On crée ensuite une fenêtre modale à l'endroit de l'img, avec une div modal_content qui va contenir le 
        // contenu de toutes les informations que la fenêtre modale affichera quand elle sera révélée
        let new_modal = document.createElement("div")
        new_modal.setAttribute("class", "modal")
        let modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modalContent")
        new_modal.appendChild(modal_content)

        let modal_test1 = document.createElement("span")
        modal_test1.setAttribute("class", "close")
        modal_test1.innerHTML = "&times;"
        let modal_test2 = document.createElement("p")
        modal_test2.innerHTML = ""
        modal_content.appendChild(modal_test1)
        modal_content.appendChild(modal_test2)
        let parent_of_modal = element.parentElement
        parent_of_modal.appendChild(new_modal)

        // On remplit la fenêtre modale avec les informations du film
        fillModalWindow(modal_content, img_to_show_url, title, genre, release_date, the_rated, imdb, 
            director, actor_list, time, country, box_office, short_description)

        // On affiche maintenant la fenêtre modale et on la cache quand l'utilisateur clique au-dehors de celle-ci
        // ou sur la croix indiquant la fermeture.
        new_modal.style.display = "block"; 
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
        let BestMovieImg = document.querySelector("#BestMovie img")
        img_id = BestMovieImg.getAttribute("id")
        res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`)
        data = await res.json()
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


        let new_modal = document.createElement("div")
        new_modal.setAttribute("class", "modal")
        let modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modalContent")
        new_modal.appendChild(modal_content)

        let modal_test1 = document.createElement("span")
        modal_test1.setAttribute("class", "close")
        modal_test1.innerHTML = "&times;"
        let modal_test2 = document.createElement("p")
        modal_test2.innerHTML = ""
        modal_content.appendChild(modal_test1)
        modal_content.appendChild(modal_test2)
        let parent_of_modal = element.parentElement
        parent_of_modal.appendChild(new_modal)

        // On remplit la fenêtre modale avec les informations du film
        fillModalWindow(modal_content, img_to_show_url, title, genre, release_date, the_rated, imdb, 
            director, actor_list, time, country, box_office, short_description)

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

// à partir du résultat json d'un fetch, on a déclaré des variables concernant toutes les informations intéressantes,
// on crée ensuite des div pour chaque information, on les ordonne et on les remanie un peu, puis on les append
// à la div désignée par le paramètre divToFill.
let fillModalWindow = function(divToFill, img, title, genre, release_date, rated, imdb, director, 
    actor, time, country, box_office, description) {

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
}

// On ajoute ensuite des event Listener pour chaque flèche sur les cotés de la page web permettant de faire défiler 
// les films d'une catégorie
BestRA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_right_click(other_full_movies, BestRatedPage, divBestMovieId);
    BestRatedPage++; 
})

BestLA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_left_click(other_full_movies, BestRatedPage, divBestMovieId);
    BestRatedPage--; 
})

AdventureRA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=Adventure', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_right_click(other_full_movies, AdventurePage, divBestAdventureId);
    AdventurePage++; 
})

AdventureLA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=Adventure', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_left_click(other_full_movies, AdventurePage, divBestAdventureId);
    AdventurePage--; 
})

HistoryRA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=History', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_right_click(other_full_movies, HistoryPage, divBestHistoryId);
    HistoryPage++; 
})

HistoryLA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=History', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_left_click(other_full_movies, HistoryPage, divBestHistoryId);
    HistoryPage--; 
})

ComedyRA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=Comedy', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_right_click(other_full_movies, ComedyPage, divBestComedyId);
    ComedyPage++; 
})

ComedyLA.addEventListener("click", async function() {
    let movies_idx35 = await fetch_movies_onClick('http://localhost:8000/api/v1/titles/', '&genre=Comedy', 1)
    
    let page_1 = movies_idx35[0];
    let page_2 = movies_idx35[1];
    let page_3 = movies_idx35[2];
    let page_4 = movies_idx35[3];
    let page_5 = movies_idx35[4];
    let page_6 = movies_idx35[5];
    let page_7 = movies_idx35[6];
    let other_full_movies = [...page_1, ...page_2, ...page_3, ...page_4,
                            ...page_5, ...page_6, ...page_7]

    change_img_on_left_click(other_full_movies, ComedyPage, divBestComedyId);
    ComedyPage--; 
})

let change_img_on_right_click = async function(movies_list, pageCountDiv, divToAlterImgs) {
    if (pageCountDiv === 0) {
        console.log("le if marche")
        // boucle for pour les 7 img a retrieve (peut être comprise dans une fonction0)
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(7, 14)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }

    } else if (pageCountDiv === 1) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(14, 21)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
        
    } else if (pageCountDiv === 2) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(21, 28)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        

    } else if (pageCountDiv === 3) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(28, 35)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
    } else if (pageCountDiv === 4) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(0, 7)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
    }
}

let change_img_on_left_click = async function(movies_list, pageCountDiv, divToAlterImgs) {
    if (pageCountDiv === 0) {
        console.log("le if marche")
        // boucle for pour les 7 img a retrieve (peut être comprise dans une fonction0)
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(28, 35)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }

    } else if (pageCountDiv === 1) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(0, 7)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
        
    } else if (pageCountDiv === 2) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(7, 14)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        

    } else if (pageCountDiv === 3) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(14, 21)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
    } else if (pageCountDiv === 4) {
        for (index = 0; index < movies_list.slice(0, 7).length; index++) {
            
            let img_id = movies_list.slice(21, 28)[index]
            
            const img_url_res = await fetch(`http://localhost:8000/api/v1/titles/${img_id}`);
            const img_url_json = await img_url_res.json();
            const img_url = img_url_json.image_url
            
            let current_imgs = document.querySelectorAll('#' +divToAlterImgs+' img')
            current_imgs[index].src=`${img_url}`
            current_imgs[index].id=`${img_id}`
        }
        
    }
}
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
