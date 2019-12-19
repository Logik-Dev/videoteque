import { favoriteMovies, wantedMovies } from './movies.js'
import { editMovie, addMovie, deleteMovie } from './api.js'
import { createElementWithClass, containsMovie } from './helpers.js'
// Generate Cards
const generateCards = movies => {
    // clean container
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""

    // generate cards
    movies && movies.forEach(movie => {
        // card
        let card = createElementWithClass('div', "card mb-3 col-12 col-lg-8")

        // card row
        let cardRow = createElementWithClass('div', "row no-gutters")
        card.appendChild(cardRow)

        // card image column
        let cardImageCol = createElementWithClass('div', 'col-4')
        cardRow.appendChild(cardImageCol)

        // card image 
        let cardImage = createElementWithClass('img', 'card-img')
        cardImage.src = movie.imageUrl ? movie.imageUrl : ""
        cardImageCol.appendChild(cardImage)

        // card body 
        let cardBody = createElementWithClass('div', 'col-8 d-flex align-items-start flex-column')
        cardRow.appendChild(cardBody)

        // card title
        let cardTitle = createElementWithClass('h6', 'p-2 font-weight-bold text-center w-100')
        cardTitle.innerText = movie.title
        cardBody.appendChild(cardTitle)

        // card overview
        let cardTextClass = movie.overview ? 'p-2' : 'p-2 text-muted font-italic'
        let cardText = createElementWithClass('div', cardTextClass)
        cardText.style.fontSize = '13px'
        let truncateLength = document.body.clientWidth < 770 ? 220 : 1000;
        let innerText = movie.overview.length <= truncateLength ?
            movie.overview : movie.overview.substring(0, truncateLength) + "..."
        cardText.innerText = movie.overview ? innerText : 'Pas de résumé pour ce film'
        cardBody.appendChild(cardText);

        // card footer
        let cardFooter = createElementWithClass('div', "mt-auto mb-0 bg-light w-100 d-flex p-2 align-items-center justify-content-around")
        cardBody.appendChild(cardFooter);

        // card watch icon
        let cardWatchIcon = document.createElement('i')
        cardWatchIcon.className = 'fa-eye fa-2x text-primary'
        cardWatchIcon.className += movie.wanted ? ' fas' : ' far'
        cardWatchIcon.title = movie.wanted ? 'Supprimer des films à voir' : 'Ajouter aux films à voir'
        cardWatchIcon.style.cursor = 'pointer'
        cardWatchIcon.onclick = event => addToWanted(event, movie)
        cardFooter.appendChild(cardWatchIcon)

        // card favorite icon
        let cardFavIcon = document.createElement('i')
        cardFavIcon.className = 'fa-heart fa-2x  ml-2 text-danger'
        cardFavIcon.className += movie.favorite ? ' fas' : ' far'
        cardFavIcon.title = movie.favorite ? "Supprimer des favoris" : "Ajouter aux favoris"
        cardFavIcon.style.cursor = 'pointer'
        cardFavIcon.onclick = event => addToFavorite(event, movie)
        cardFooter.appendChild(cardFavIcon)

        // card note
        let cardNote = document.createElement('p')
        cardNote.className = 'mb-0 font-weight-bold'
        cardNote.innerHTML = `Note: <span class='text-danger'>${movie.note}</span>`
        cardFooter.appendChild(cardNote)

        // append card
        cardContainer.appendChild(card)

    })
}

// Add to favorite clicked
const addToFavorite = (event, movie) => {
    movie.favorite = !movie.favorite

    event.target.classList.remove(movie.favorite ? 'far' : 'fas')
    event.target.classList.add(movie.favorite ? 'fas' : 'far')
    handleMovieModification(favoriteMovies.value, movie)
    favoriteMovies.value = favoriteMovies.value.filter(m => m.favorite)
}
// Add to WatchList clicked
const addToWanted = (event, movie) => {
    movie.wanted = !movie.wanted
    event.target.classList.remove(movie.wanted ? 'far' : 'fas')
    event.target.classList.add(movie.wanted ? 'fas' : 'far')
    handleMovieModification(wantedMovies.value, movie)
    wantedMovies.value = wantedMovies.value.filter(m => m.wanted)
}

const handleMovieModification = (movieList, movie) => {
    if(containsMovie(movieList, movie)){
        movieList.map(m => {
            if(m.id == movie.id) m = movie
        })
    }
    if(!movie.wanted && !movie.favorite){
        console.log('delete')
        deleteMovie(movie)
    }
    else if(containsMovie(wantedMovies.value, movie) || containsMovie(favoriteMovies.value, movie)){
        console.log('edit')
        editMovie(movie)
    }

    else {
        console.log('add')
        movieList.push(movie)
        addMovie(movie)
    }

}

export { generateCards }