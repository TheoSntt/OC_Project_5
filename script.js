import {getBestRatedMovies} from "./jsmodules/api_requests.js";
import { createFrontPageMovie, createSection} from "./jsmodules/page_layout.js";


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