// Actions au chargement de la page ?
console.log("Foo bar");


async function recupererSuperFilms() {
	//Récupération des pièces eventuellement stockées dans le localStorage
	let films = window.localStorage.getItem("films");

	if (films === null) {
		// Récupération des pièces depuis l'API
		const reponse = await fetch("http://127.0.0.1:8000/api/v1/titles/?imdb_score_min=9.2");
		films = await reponse.json();
		// Transformation des pièces en JSON
		const valeurFilms = JSON.stringify(films);
		// Stockage des informations dans le localStorage
		window.localStorage.setItem("films", valeurFilms);
	} else {
		films = JSON.parse(films);
	}
	for (let film of films.results){
		console.log(film.title)
	}
}


//gestion des bouttons 
const boutonCool = document.querySelector(".btn-cool");

boutonCool.addEventListener("click", recupererSuperFilms);


