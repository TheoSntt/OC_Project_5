// From a click on a movie miniature (or the see more button), fire an API request to retrieve the movie details
export async function getMovieDetails(event) {
	let id = event.target.dataset.id;
	let reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
	let filmInfo = await reponse.json();
	return filmInfo

}

// Called 4 times at the loading of the site. Retrieves the best IMDB rated movie for a given genre.
export async function getBestRatedMovies(genre=null) {
	if (genre === null){
		var url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
	}
	else {
		var url = "http://localhost:8000/api/v1/titles/?genre=" + genre + "&sort_by=-imdb_score"
	}
	// Sending request to get the 5 best rated films (API only returns 5 items ...)
	let reponse = await fetch(url);
	let topFilms = await reponse.json();
	let bestFilms = topFilms.results
	// Sending request to get page 2 of results
	reponse = await fetch(topFilms.next);
	topFilms = await reponse.json();
	if (genre === null){
		// If no genre is specified, retrieves a total of 8 movies : first one for front page, 7 following for first carousel.
		for (let i = 0; i < 3; i++){
			bestFilms.push(topFilms.results[i])
		}
		return bestFilms
	}
	else {
		// If a genre is specified, retrieves a total of 7 movies
		for (let i = 0; i < 2; i++){
			bestFilms.push(topFilms.results[i])
		}
	}
	return bestFilms
}

// In the process of creating the front page movie section, fire an API request to retrieve more information (the description) about the movie
export async function fetchMovieDescription(movie) {
	let reponse = await fetch("http://localhost:8000/api/v1/titles/" + movie.id);
	let filmInfo = await reponse.json();
	let sectionDescr = document.querySelector(".frontPageMovie__rightBlock__line3");
	let descrElement = document.createElement("p");
	descrElement.innerText = filmInfo.long_description ?? "Pas de description disponible.";
	sectionDescr.appendChild(descrElement);
}
