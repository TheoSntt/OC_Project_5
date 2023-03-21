// From a movie's information (from the API) passed as arg, this function displays the information within the modal window
export function populateModalWindow(movie) {
	// Create the image element
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

// Handle the creation of the title and the year of release elements
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

// Handle the creation of the genre and the country of origin elements
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

// Handle the creation of the Rated, IMDB score and box office results elements
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

// Handle the creation of the Director and movie duration elements
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

// Handle the creation of the description element
function populateDescription(movie) {
	// Description
	const descriptionElement = document.createElement("p");
	descriptionElement.innerText = movie.long_description ?? "Pas de description disponible.";
	// Adding it to the grid element to populate
	let description = document.querySelector(".infoWindow__details__leftBlock");
	description.appendChild(descriptionElement);
}

// Handle the creation of the actors element
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