import {getBestRatedMovies} from "./jsmodules/api_requests.js";
import { createFrontPageMovie, createSection} from "./jsmodules/page_layout.js";

// WEBPAGE MAIN SCRIPTS : EVENT LISTENERS SETTING & FUNCTION CALLS ON PAGE LOADING

// FIRST STEP : Getting all the best rated movies for each genre and creating the caroussels.

// Get the 8 best rated movies across all genres from the API
getBestRatedMovies().then(function(data){
	// Create the front page movie banner with the first one (the best rated movie)
	createFrontPageMovie(data.shift());
	// Populate the first carrousel with the 7 following movies (the 7 best rated movies across all genres, after the front page one)
	createSection(data, "Best");
});
// Get the 7 best rated action movies from the API
getBestRatedMovies("Action").then(function(data){
	// Populate the 2nd carrousel with these movies
	createSection(data, "Action");
});
// Get the 7 best rated comedies from the API
getBestRatedMovies("Comedy").then(function(data){
	// Populate the 3rd carrousel with these movies
	createSection(data, "Comedy");
});
// Get the 7 best rated Sci-Fi movies from the API
getBestRatedMovies("Sci-Fi").then(function(data){
	// Populate the 4th carrousel with these movies
	createSection(data, "Sci-Fi");
});

// SECOND STEP : Adding the event listener on the caroussels left and right buttons.

var arrowBtns = document.querySelectorAll(".btn");
// For each button
for (let btn of arrowBtns){
	// Create an event listener on click
	btn.addEventListener("click", function() {
		// Retrieve all the needed information (carrousel to move, direction) from the button name.
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
	});
}
