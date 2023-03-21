// export function addListenerShowDetails(element) {
// 	element.addEventListener("click", async function (event) {

// 		const id = event.target.dataset.id;
// 		const reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
// 		const filmInfo = await reponse.json();
// 		// displayOverlayAndModal(filmInfo);
// 	});
// }

export async function getMovieDetails(event) {
	const id = event.target.dataset.id;
	const reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
	const filmInfo = await reponse.json();
	return filmInfo

}

export async function fetchMovieDescription(movie) {
	const reponse = await fetch("http://localhost:8000/api/v1/titles/" + movie.id);
	const filmInfo = await reponse.json();
	const sectionDescr = document.querySelector(".frontPageMovie__rightBlock__line3");
	const descrElement = document.createElement("p");
	descrElement.innerText = filmInfo.long_description ?? "Pas de description disponible.";
	sectionDescr.appendChild(descrElement);
}



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
	let sevenBestFilms = topFilms.results
	// Sending request to get page 2 of results
	reponse = await fetch(topFilms.next);
	topFilms = await reponse.json();
	if (genre === null){
		for (let i = 0; i < 3; i++){
			sevenBestFilms.push(topFilms.results[i])
		}
		// createFrontPageMovie(sevenBestFilms.shift())
		return sevenBestFilms
	}
	else {
		for (let i = 0; i < 2; i++){
			sevenBestFilms.push(topFilms.results[i])
		}
	}
	// createSection(sevenBestFilms, genre)
	return sevenBestFilms
}


