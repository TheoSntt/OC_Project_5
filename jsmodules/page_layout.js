import { getMovieDetails, fetchMovieDescription} from "./api_requests.js";
import {populateModalWindow} from "./modal_window.js";

export function createFrontPageMovie(movie) {
	fetchMovieDescription(movie);
	var sectionImg = document.querySelector(".frontPageMovie__leftBlock");
	var sectionTitle = document.querySelector(".frontPageMovie__rightBlock__line1");
	var sectionBtn = document.querySelector(".frontPageMovie__rightBlock__line2");
	const nomElement = document.createElement("h1");
	nomElement.innerText = movie.title;
	const imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	imageElement.className = "frontPageMovie__leftBlock__img"
	const seeMoreButton = document.createElement("button");
	seeMoreButton.className = "frontPageMovie__rightBlock__line2__btn"
	seeMoreButton.dataset.id = movie.id;
	seeMoreButton.textContent = "Plus d'infos";
	seeMoreButton.addEventListener("click", function(event){
		getMovieDetails(event).then(function(movieData){
			displayOverlayAndModal(movieData);
		})
	});

	// On rattache la balise film a la section
	sectionImg.appendChild(imageElement);
	sectionTitle.appendChild(nomElement);
	sectionBtn.appendChild(seeMoreButton);

}

export function createSection(filmList, genre){
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
		// addListenerShowDetails(imageElement)
		imageElement.addEventListener("click", function(event){
			getMovieDetails(event).then(function(movieData){
				displayOverlayAndModal(movieData);
			})
		});
		
		
		// On rattache la balise film a la section
		
		section.appendChild(filmElement);
		// filmElement.appendChild(nomElement);
		// filmElement.appendChild(noteElement);
		filmElement.appendChild(imageElement);
		// filmElement.appendChild(nomElement);
	}

}

function displayOverlayAndModal(movie) {
	//Calling the function to populate the modal window with the movie information
	populateModalWindow(movie);
	// Displaying the overlay
	let overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
	// Event listener to close the overlay
	let btnClose = document.querySelector(".infoWindow__closebtndiv__btn");
	btnClose.addEventListener("click", removeOverlayAndModal);
}

function removeOverlayAndModal() {
	let overlay = document.querySelector(".overlay");
	let window = document.querySelector(".infoWindow");
	//TODO : change to empty all containers within the window and not the window itself
	window.innerHTML = "<div class='infoWindow__closebtndiv'><button class='infoWindow__closebtndiv__btn'>+</button></div><div class='infoWindow__title'><div class='infoWindow__title__line1'></div><div class='infoWindow__title__line2'></div></div><div class='infoWindow__informations'><div class='infoWindow__informations__line1'></div><div class='infoWindow__informations__line2'></div></div><div class='infoWindow__details'><div class='infoWindow__details__leftBlock'></div><div class='infoWindow__details__rightBlock'></div></div>";
	overlay.style.display = "none";
}