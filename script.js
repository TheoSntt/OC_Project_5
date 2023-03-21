import { getMovieDetails, fetchMovieDescription, getBestRatedMovies} from "./jsmodules/api_requests.js";
import {populateModalWindow} from "./jsmodules/modal_window.js";

// function addListenerShowDetails(element) {
// 	element.addEventListener("click", async function (event) {

// 		const id = event.target.dataset.id;
// 		const reponse = await fetch("http://localhost:8000/api/v1/titles/" + id);
// 		const filmInfo = await reponse.json();
// 		displayOverlayAndModal(filmInfo);
// 	});
// }

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
	// addListenerShowDetails(seeMoreButton)
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

// async function recupererSuperFilms(genre=null) {

// 	if (genre === null){
// 		var url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
// 	}
// 	else {
// 		var url = "http://localhost:8000/api/v1/titles/?genre=" + genre + "&sort_by=-imdb_score"
// 	}
	

// 	// Sending request to get the 5 best rated films (API only returns 5 items ...)
// 	let reponse = await fetch(url);
// 	let topFilms = await reponse.json();
// 	let sevenBestFilms = topFilms.results
// 	// Sending request to get page 2 of results
// 	reponse = await fetch(topFilms.next);
// 	topFilms = await reponse.json();
// 	if (genre === null){
// 		for (let i = 0; i < 3; i++){
// 			sevenBestFilms.push(topFilms.results[i])
// 		}
// 		createFrontPageMovie(sevenBestFilms.shift())
// 	}
// 	else {
// 		for (let i = 0; i < 2; i++){
// 			sevenBestFilms.push(topFilms.results[i])
// 		}
// 	}

// 	console.log(sevenBestFilms.length)
// 	createSection(sevenBestFilms, genre)
// }

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


//gestion des bouttons 
// const boutonCool = document.querySelector(".btn-cool");
// boutonCool.addEventListener("click", recupererSuperFilms);

// Appel de fonctions au chargement de la page
getBestRatedMovies().then(function(data){
	createFrontPageMovie(data.shift());
	createSection(data, "Best");
});
getBestRatedMovies("Action").then(function(data){
	createSection(data, "Action");
});
getBestRatedMovies("Comedy").then(function(data){
	createSection(data, "Comedy");
});
getBestRatedMovies("Sci-Fi").then(function(data){
	createSection(data, "Sci-Fi");
});



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