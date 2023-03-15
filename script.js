function addListenerShowDetails(element) {
	element.addEventListener("click", async function (event) {

		const id = event.target.dataset.id;
		const reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
		const filmInfo = await reponse.json();
		generateInfoWindow(filmInfo)
	});
}

function generateInfoWindow(movie) {
	// Displaying the overlay
	var overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
	// Event listener to close the overlay
	overlay.addEventListener("click", function(event) {
		var overlay = document.querySelector(".overlay");
		// overlay.innerHTML = "";
		overlay.style.display = "none";
	})
}

function generateInfoWindowVrai(movie) {
	console.log(movie)
	// Displaying the overlay
	var overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
	// Creating the Window itself
	var infoWindow = document.createElement("div");
	infoWindow.className = "infoWindow";
	// Creation of title, release date, genres, country, and placing them in a grid element
	var gridTitleElement = document.createElement("div");
	gridTitleElement.className = ("infoWindow__title")
	// Title of the movie
	var title = document.createElement("h3");
	if (movie.original_title){
		title.innerText = movie.original_title;
	}
	else {
		title.innerText = movie.title;
	}
	// Genre
	const genreElement = document.createElement("p");
	let genreStr = "";
	for (let genre of movie.genres){
		genreStr += genre + " / ";
	}
	genreStr = genreStr.slice(0,-3)
	genreElement.innerText = genreStr;
	// Release Year
	const yearElement = document.createElement("p");
	yearElement.innerText = movie.year ?? "Date de sortie inconnue.";
	// Country
	const countryElement = document.createElement("p");
	let countryStr = "";
	for (let country of movie.countries){
		countryStr += country + " / ";
	}
	countryStr = countryStr.slice(0,-3)
	countryElement.innerText = countryStr;
	// Adding all four element to the grid element
	gridTitleElement.appendChild(title);
	gridTitleElement.appendChild(yearElement);
	gridTitleElement.appendChild(genreElement);
	gridTitleElement.appendChild(countryElement);


	
	// Image
	const imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	imageElement.className = "infoWindow__img"
	
	// Rated
	const ratedElement = document.createElement("p");
	ratedElement.innerText = movie.rated ?? "Rated non disponible.";
	// IMDB Score
	const scoreElement = document.createElement("p");
	scoreElement.innerText = movie.imdb_score ?? "Score ImDB inconnu.";
	// Director(s)
	const directorElement = document.createElement("p");
	let directorStr = "";
	for (let director of movie.directors){
		directorStr += director + " / ";
	}
	directorStr = directorStr.slice(0,-3)
	directorElement.innerText = directorStr;
	// Actors
	const actorElement = document.createElement("p");
	let actorStr = "";
	for (let actor of movie.actors){
		actorStr += actor + " / ";
	}
	actorStr = actorStr.slice(0,-3)
	actorElement.innerText = actorStr;
	// Duration
	const durationElement = document.createElement("p");
	durationElement.innerText = movie.duration + " minutes" ?? "Durée inconnue.";
	
	// Box office results
	const boxofficeElement = document.createElement("p");
	boxofficeElement.innerText = movie.worldwide_gross_income + "$"  ?? "Résultats au box office inconnus.";
	// Description
	const descriptionElement = document.createElement("p");
	descriptionElement.innerText = movie.description ?? "Pas de description disponible.";
	// Adding all elements to the window
	// infoWindow.appendChild(title)
	infoWindow.appendChild(imageElement);
	infoWindow.appendChild(gridTitleElement);
	// infoWindow.appendChild(genreElement);
	// infoWindow.appendChild(yearElement);
	infoWindow.appendChild(ratedElement);
	infoWindow.appendChild(scoreElement);
	infoWindow.appendChild(directorElement);
	infoWindow.appendChild(actorElement);
	infoWindow.appendChild(durationElement)
	// infoWindow.appendChild(countryElement);
	infoWindow.appendChild(boxofficeElement);
	infoWindow.appendChild(descriptionElement);
	// Adding the window to the page
	overlay.appendChild(infoWindow);
	// Event listener to close the overlay
	overlay.addEventListener("click", function(event) {
		var overlay = document.querySelector(".overlay");
		overlay.innerHTML = "";
		overlay.style.display = "none";
	})

	// document.body.classList.remove("stop-scrolling");
	
}

// async function recupererSuperFilms() {
// 	//Récupération des pièces eventuellement stockées dans le localStorage
// 	let topFilms = window.localStorage.getItem("topFilms");

// 	if (topFilms === null) {
// 		// Récupération des pièces depuis l'API
// 		const reponse = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
// 		topFilms = await reponse.json();
// 		// Transformation des pièces en JSON
// 		const valeurFilms = JSON.stringify(topFilms);
// 		// Stockage des informations dans le localStorage
// 		window.localStorage.setItem("topFilms", valeurFilms);
// 	} else {
// 		topFilms = JSON.parse(topFilms);
// 	}
// 	for (let film of topFilms.results){
// 		console.log(film.title)
// 	}
// }

function createFrontPageMovie(movie) {
	var section = document.querySelector("#frontPageMovie");

	const filmElement = document.createElement("div");
	filmElement.className = "highlightMovie";
	// filmElement.dataset.id = movie.id;
	const nomElement = document.createElement("h2");
	nomElement.innerText = movie.title;
	const noteElement = document.createElement("p");
	noteElement.innerText = movie.imdb_score ?? "(Pas de note IMDB)";
	const imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	const seeMoreButton = document.createElement("button");
	seeMoreButton.dataset.id = movie.id;
	seeMoreButton.textContent = "Afficher les informations";
	addListenerShowDetails(seeMoreButton)
	// On rattache la balise film a la section
	
	section.appendChild(filmElement);
	filmElement.appendChild(nomElement);
	filmElement.appendChild(noteElement);
	filmElement.appendChild(imageElement);
	filmElement.appendChild(seeMoreButton);
}

async function recupererSuperFilms(genre=null) {

	if (genre === null){
		var url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
	}
	else {
		var url = "http://localhost:8000/api/v1/titles/?genre=" + genre + "&sort_by=-imdb_score"
	}
	

	// Sending request to get the 5 best rated films (API only returns 5 items ...)
	let reponse = await fetch(url);
	let topFilms = await reponse.json();
	let sevenBestFilms = topFilms.results
	// Sending request to get page 2 of results
	reponse = await fetch(topFilms.next);
	topFilms = await reponse.json();
	if (genre === null){
		for (let i = 0; i < 3; i++){
			sevenBestFilms.push(topFilms.results[i])
		}
		createFrontPageMovie(sevenBestFilms.shift())
	}
	else {
		for (let i = 0; i < 2; i++){
			sevenBestFilms.push(topFilms.results[i])
		}
	}

	console.log(sevenBestFilms.length)
	createSection(sevenBestFilms, genre)
}

function createSection(filmList, genre){

	
	if (genre === null){
		var section = document.querySelector("#Best__caroussel");
		var sectionTitle = document.createElement("p");
		sectionTitle.innerText = "Meilleurs films (toutes catégories)";
	}
	else {
		var section = document.querySelector("#" + genre + "__caroussel");
		var sectionTitle = document.createElement("p");
		sectionTitle.innerText = genre;
	}
	
	// section.appendChild(sectionTitle);
	for (let film of filmList){
		const filmElement = document.createElement("div");
		filmElement.className = "movieMiniature";
		
		// const nomElement = document.createElement("span");
		// nomElement.innerText = film.title;
		// const noteElement = document.createElement("p");
		// noteElement.innerText = film.imdb_score ?? "(Pas de note IMDB)";
		const imageElement = document.createElement("img");
		// imageElement.className = "item-image";
		imageElement.src = film.image_url;
		imageElement.dataset.id = film.id;
		addListenerShowDetails(imageElement)
		
		
		// On rattache la balise film a la section
		
		section.appendChild(filmElement);
		// filmElement.appendChild(nomElement);
		// filmElement.appendChild(noteElement);
		filmElement.appendChild(imageElement);
		// filmElement.appendChild(nomElement);
	}

}


//gestion des bouttons 
// const boutonCool = document.querySelector(".btn-cool");
// boutonCool.addEventListener("click", recupererSuperFilms);

// Appel de fonctions au chargement de la page
recupererSuperFilms()
recupererSuperFilms("Action")
recupererSuperFilms("Comedy")
recupererSuperFilms("Sci-Fi")



// Add listener to left and right scroll buttons for caroussels
var mesBtn = document.querySelectorAll(".scrollBtn");
for (let btn of mesBtn){
	btn.addEventListener("click", function(event) {
		let btnName = this.id;
		let genre = btnName.split("__")[0];
		let direction = btnName.split("__")[2].split("_")[0];
		var scrollArea = document.querySelector("#" + genre + "__caroussel__scroll");
		if (direction === "right"){
			scrollArea.scroll({
				top: 0,
				left: scrollArea.scrollLeft + 420,
				behavior: 'smooth'
			});
		}
		else {
			scrollArea.scroll({
				top: 0,
				left: scrollArea.scrollLeft - 420,
				behavior: 'smooth'
			});
		}

	})
}
