import { getMovieDetails, fetchMovieDescription} from "./api_requests.js";
import {populateModalWindow} from "./modal_window.js";

// From a movie's information (from the API) passed as arg, this function create the "front page movie" section of the page
export function createFrontPageMovie(movie) {
	// Send a request to the API to retrieve the movie description and add it to the corresponding div
	fetchMovieDescription(movie).then(function(movieData){
		let sectionDescr = document.querySelector(".frontPageMovie__rightBlock__line3");
		let descrElement = document.createElement("p");
		descrElement.innerText = movieData.long_description ?? "Pas de description disponible.";
		sectionDescr.appendChild(descrElement);
	});
	// Retrieving all the container div from the HTML
	let sectionImg = document.querySelector(".frontPageMovie__leftBlock");
	let sectionTitle = document.querySelector(".frontPageMovie__rightBlock__line1");
	let sectionBtn = document.querySelector(".frontPageMovie__rightBlock__line2");
	// Creating the title div
	let nomElement = document.createElement("h1");
	nomElement.innerText = movie.title;
	// Creating img div
	let imageElement = document.createElement("img");
	imageElement.src = movie.image_url;
	imageElement.className = "frontPageMovie__leftBlock__img"
	// Creating the button
	let seeMoreButton = document.createElement("button");
	seeMoreButton.className = "frontPageMovie__rightBlock__line2__btn"
	seeMoreButton.dataset.id = movie.id;
	seeMoreButton.textContent = "Plus d'infos";
	// Setting an event listener on click : opens the modal window for the film
	seeMoreButton.addEventListener("click", function(event){
		getMovieDetails(event).then(function(movieData){
			displayOverlayAndModal(movieData);
		})
	});
	// Appends all the created element to the HTML container elements
	sectionImg.appendChild(imageElement);
	sectionTitle.appendChild(nomElement);
	sectionBtn.appendChild(seeMoreButton);

}

// From a list of movies' information (from the API) passed as arg, this function create a carousel section
export function createSection(filmList, genre){
	// Getting the carousel concerned from the HTML and placing the title
	if (genre === null){
		// If no genre is passed to the function, it means the carousel concerned is the "best movies across all category" one
		var section = document.querySelector("#Best__carousel");
		let sectionTitle = document.createElement("p");
		sectionTitle.innerText = "Meilleurs films (toutes catégories)";
	}
	else {
		// If a genre is passed, it designates which carousel is concerned and the title to give the section
		var section = document.querySelector("#" + genre + "__carousel");
		let sectionTitle = document.createElement("p");
		sectionTitle.innerText = genre;
	}
	// Now the bulk of the function : for each film, place it in the carousel
	for (let film of filmList){
		// Create a div
		let filmElement = document.createElement("div");
		filmElement.className = "movieMiniature";
		// Create an img from the movie img URL
		let imageElement = document.createElement("img");
		imageElement.src = film.image_url;
		imageElement.dataset.id = film.id;
		// Adds the click event listener on the image : opens the modal window for the movie
		imageElement.addEventListener("click", function(event){
			getMovieDetails(event).then(function(movieData){
				displayOverlayAndModal(movieData);
			})
		});
		// Add the newly created div to the carousel
		section.appendChild(filmElement);
		// Add the img to the div
		filmElement.appendChild(imageElement);
	}

}

// Handle the display of the modal window and of the overlay behind it.
// The creation on the content of the window is handled by populateModalWindow, which this function calls.
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

// Handle the emptying of the modal window content and the removing of it and the overlay
function removeOverlayAndModal() {
	// Removing the overlay
	let overlay = document.querySelector(".overlay");
	overlay.style.display = "none";
	// Emptying the modal window content divs
	let titleLine1 = document.querySelector(".infoWindow__title__line1");
	titleLine1.innerHTML = "";
	let titleLine2 = document.querySelector(".infoWindow__title__line2");
	titleLine2.innerHTML = "";
	let infoLine1 = document.querySelector(".infoWindow__informations__line1");
	infoLine1.innerHTML = "";
	let infoLine2 = document.querySelector(".infoWindow__informations__line2");
	infoLine2.innerHTML = "";
	let detailsLeftBlock = document.querySelector(".infoWindow__details__leftBlock");
	detailsLeftBlock.innerHTML = "";
	let detailsRightBlock = document.querySelector(".infoWindow__details__rightBlock");
	detailsRightBlock.innerHTML = "";
	// window.innerHTML = "<div class='infoWindow__closebtndiv'><button class='infoWindow__closebtndiv__btn'>+</button></div><div class='infoWindow__title'><div class='infoWindow__title__line1'></div><div class='infoWindow__title__line2'></div></div><div class='infoWindow__informations'><div class='infoWindow__informations__line1'></div><div class='infoWindow__informations__line2'></div></div><div class='infoWindow__details'><div class='infoWindow__details__leftBlock'></div><div class='infoWindow__details__rightBlock'></div></div>";
}