

"si a le temps, fichier pouvant servir à séparer la logique de interactivity.js "


// // Fonction permettant de fetch de nouveaux films après qu'on ai click sur une flèche
// let fetch_movies_onClick = function(url, genre='', pageNumber = 1) {

//     full_list_of_img = []
//     for (let counter = 0; counter < 7; counter++) {
//         list_of_img = setTimeout(() => retrieve35Movies(url, genre, pageNumber), 200);
//         full_list_of_img.push(list_of_img)
//         pageNumber++;
//     }
//     console.log(full_list_of_img)
    
// }


// // Fonction permettant de fetch 5 autres films après un clic sur une flèche sur le coté d'une catégorie
// let retrieve35Movies = function (url, genre='', pageNumber = 1) {
//     console.log("retieveOther7Movies is called");
//     divToChange = document.getElementById(div)
//         fetch(url + genre, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//                 }
//             })
//             .then(res => {
//                 return res.json()
//             })
//             .then(data => {
//                 let movies_img = [];
//                 for (let counter = 0; counter < 5; counter++) {
//                     let movie_components = []
//                     let movie_id = data.results[counter].id
//                     let img_url = data.results[counter].image_url
//                     movie_components = [movie_id, img_url]
//                     movies_img.push(movie_components)
//                 }
//                 return movies_img
//             })
//             .catch((err) => {
//                 console.log("there is an error")
//                 console.log(err)
//             })
// }




// let arrowClick = function() {
//     let new_movie_img = fetch_movies_onClick('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', '', 1)
//         // Dans un 1er temps, déplier la liste pour mettre les 35 films côte à côte genre de 0-34
//         all_movie_img = []
//         for (list_of_5_movies in new_movie_img) {
//             for (movie in list_of_5_movies) {
//                 all_movie_img.push(movie)
//             }
//         }
//         console.log(all_movie_img)
// }

export {arrowClick};

// // On ajoute des event Listener pour chaque flèche permettant de faire défiler les films
// BestRA.addEventListener("click", function() {
//         // il faut ici trouver un moyen de savoir sur quel page number on est
//         let new_movie_img = fetch_movies_onClick('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', '', 1)
//         // Dans un 1er temps, déplier la liste pour mettre les 35 films côte à côte genre de 0-34
//         all_movie_img = []
//         for (list_of_5_movies in new_movie_img) {
//             for (movie in list_of_5_movies) {
//                 all_movie_img.push(movie)
//             }
//         }
//         console.log(all_movie_img)
//         // suivant le page Number, on va prendre un bout de cette liste, qui va constituer les 7 images à afficher
//         // pour chacune des 7 images affichées actuellement, càd chaque div, enfant de la div principale dans laquelle on opère,
//         // on va changer deux attributs à l'image, son url et son id
//         // Donc boucle for qui compare chaque div avec chaque nouvelle image et qui change les propriétés

// })