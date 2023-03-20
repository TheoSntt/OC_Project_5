function addListenerShowDetails(element) {
	element.addEventListener("click", async function (event) {

		const id = event.target.dataset.id;
		const reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
		const filmInfo = await reponse.json();
		displayOverlayAndModal(filmInfo);
	});
}

function displayOverlayAndModal(movie) {
	//Calling the function to populate the modal window with the movie information
	populateModalWindow(movie);
	// Displaying the overlay
	let overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
	// Event listener to close the overlay
	overlay.addEventListener("click", removeOverlayAndModal)
}

function removeOverlayAndModal() {
	let overlay = document.querySelector(".overlay");
	let window = document.querySelector(".infoWindow");
	//TODO : change to empty all containers within the window and not the window itself
	window.innerHTML = "<div class='infoWindow__title'><div class='infoWindow__title__line1'></div><div class='infoWindow__title__line2'></div></div><div class='infoWindow__informations'><div class='infoWindow__informations__line1'></div><div class='infoWindow__informations__line2'></div></div><div class='infoWindow__details'><div class='infoWindow__details__leftBlock'></div><div class='infoWindow__details__rightBlock'></div></div>";
	overlay.style.display = "none";
}

function populateModalWindow(movie) {
	// Image
	let imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	imageElement.className = "infoWindow__img";
	let window = document.querySelector(".infoWindow");
	window.appendChild(imageElement);
	// Title and Date element
	populateTitleAndDate(movie);
	// Genre and Country element
	populateGenreAndCountry(movie);
	// Scores and Box Office element
	populateScoresAndBoxoffice(movie);
	// Director and duration element
	populateDirectorAndDuration(movie);
	// Description element
	populateDescription(movie);
	// Actors element
	populateActors(movie);
}

function populateTitleAndDate(movie) {
	// Populating the first line with title and Date
	let titleAndDate = document.querySelector(".infoWindow__title__line1");
	// Creating the title element
	let titleElement = document.createElement("h2");
	if (movie.original_title){
		titleElement.innerText = movie.original_title;
	}
	else {
		titleElement.innerText = movie.title;
	}
	// Adding it to the grid element to populate
	titleAndDate.appendChild(titleElement);
	// Creating the release year element
	const yearElement = document.createElement("p");
	yearElement.innerText = movie.year ?? "Date de sortie inconnue.";
	// Adding it to the grid element to populate
	titleAndDate.appendChild(yearElement);
}

function populateGenreAndCountry(movie) {
	// Populating the first line with title and Date
	let genreAndCountry = document.querySelector(".infoWindow__title__line2");
	// Creating the genre element
	const genreElement = document.createElement("p");
	let genreStr = "";
	for (let genre of movie.genres){
		genreStr += genre + " / ";
	}
	genreStr = genreStr.slice(0,-3)
	genreElement.innerText = "Genre : " + genreStr;
	// Adding it to the grid element to populate
	genreAndCountry.appendChild(genreElement);
	// Creating the release year element
	const countryElement = document.createElement("p");
	let countryStr = "";
	for (let country of movie.countries){
		countryStr += country + " / ";
	}
	countryStr = countryStr.slice(0,-3)
	countryElement.innerText = "Pays : " + countryStr;
	// Adding it to the grid element to populate
	genreAndCountry.appendChild(countryElement);
}

function populateScoresAndBoxoffice(movie) {
	let scoresandBoxoffice = document.querySelector(".infoWindow__informations__line1");
	// Rated
	const ratedElement = document.createElement("p");
	if (movie.rated == null || movie.rated === "Not rated or unkown rating"){
		ratedElement.innerText = "Rated non disponible.";
	}
	else {
		ratedElement.innerText = movie.rated + "/20";
	}
	
	// IMDB Score
	const scoreElement = document.createElement("p");
	if (movie.imdb_score == null){
		scoreElement.innerText = "Score ImDB inconnu.";
	}
	else {
		scoreElement.innerHTML = '<div class="Stars tooltip" style="--rating: '+ movie.imdb_score/2 + ';"><span class="tooltiptext">Score ImDB : ' + movie.imdb_score + '/10</span></div>';
	}
	
	// Box office results
	const boxofficeElement = document.createElement("p");
	if (movie.worldwide_gross_income == null){
		//pass
	}
	else {
		boxofficeElement.innerText = movie.worldwide_gross_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " $";
	}
	// Adding all three to the grid element to populate
	scoresandBoxoffice.appendChild(ratedElement);
	scoresandBoxoffice.appendChild(scoreElement);
	if (movie.worldwide_gross_income !== null){
		scoresandBoxoffice.appendChild(boxofficeElement);
	}
	
}

function populateDirectorAndDuration(movie) {
	let directorAndDuration = document.querySelector(".infoWindow__informations__line2");
	// Director(s)
	const directorElement = document.createElement("p");
	let directorStr = "";
	for (let director of movie.directors){
		directorStr += director + " / ";
	}
	directorStr = directorStr.slice(0,-3)
	directorElement.innerText = "Réalisateur : " + directorStr;
	// Duration
	const durationElement = document.createElement("p");
	durationElement.innerText = movie.duration + " minutes" ?? "Durée inconnue.";
	// Adding both to the grid element to populate
	directorAndDuration.appendChild(directorElement);
	directorAndDuration.appendChild(durationElement);
}

function populateDescription(movie) {
	// Description
	const descriptionElement = document.createElement("p");
	descriptionElement.innerText = movie.long_description ?? "Pas de description disponible.";
	// Adding it to the grid element to populate
	let description = document.querySelector(".infoWindow__details__leftBlock");
	description.appendChild(descriptionElement);
}

function populateActors(movie) {
	// Actors
	const actorElement = document.createElement("p");
	let actorStr = "";
	for (let actor of movie.actors){
		actorStr += actor + " / ";
	}
	actorStr = actorStr.slice(0,-3)
	actorElement.innerText = actorStr;
	// Adding it to the grid element to populate
	let actors = document.querySelector(".infoWindow__details__rightBlock");
	actors.appendChild(actorElement);
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

async function fetchMovieDescription(movie) {
	const reponse = await fetch("http://localhost:8000/api/v1/titles/" + movie.id);
	const filmInfo = await reponse.json();
	const sectionDescr = document.querySelector(".frontPageMovie__rightBlock__line3");
	const descrElement = document.createElement("p");
	console.log(filmInfo);
	descrElement.innerText = filmInfo.long_description ?? "Pas de description disponible.";
	sectionDescr.appendChild(descrElement);
}

function createFrontPageMovie(movie) {
	fetchMovieDescription(movie);
	var sectionImg = document.querySelector(".frontPageMovie__leftBlock");
	var sectionTitle = document.querySelector(".frontPageMovie__rightBlock__line1");
	var sectionBtn = document.querySelector(".frontPageMovie__rightBlock__line2");
	var sectionDescr = document.querySelector(".frontPageMovie__rightBlock__line3");
	// const filmElement = document.createElement("div");
	// filmElement.className = "highlightMovie";
	// filmElement.dataset.id = movie.id;
	const nomElement = document.createElement("h1");
	nomElement.innerText = movie.title;
	const imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	imageElement.className = "frontPageMovie__leftBlock__img"
	const seeMoreButton = document.createElement("button");
	seeMoreButton.className = "frontPageMovie__rightBlock__line2__btn"
	seeMoreButton.dataset.id = movie.id;
	seeMoreButton.textContent = "Plus d'infos";
	addListenerShowDetails(seeMoreButton)

	// On rattache la balise film a la section
	sectionImg.appendChild(imageElement);
	sectionTitle.appendChild(nomElement);
	sectionBtn.appendChild(seeMoreButton);

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
var mesBtn = document.querySelectorAll(".btn");
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


// function star(rate) {
// 	var starHTML = '';
// 	var intPart = Math.floor(rate);
// 	var decimalPart = rate - intPart;
	
// 	var increment = 0;
// 	var max = 5; // maximum rating

// 	while(increment < intPart) {
// 		starHTML += '<i class="material-icons orange">grade</i>';
// 		increment++;
// 	}
// 	starHTML += '<i class="material-icons" style="color: linear-gradient(90deg, orange 60%, grey 60%);">grade</i>';
// 	max--;

// 	while(max > intPart) {
// 		starHTML += '<i class="material-icons gray">grade</i>';
// 		max--;
// 	}
// 	return starHTML;
// }