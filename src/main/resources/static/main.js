import { getFavoriteMovies, getWantedMovies, getSearchedMovies, setErrorVisible } from './modules/api.js'
import { favoriteMovies, wantedMovies, searchedMovies} from './modules/movies.js'
import { generateCards } from './modules/cards.js'
import { clearPagination, pages } from './modules/pagination.js'


document.onreadystatechange = () => {
    setErrorVisible(false)
    getFavoriteMovies().then(movies => favoriteMovies.value = movies ? movies : []);
    getWantedMovies().then(movies => wantedMovies.value = movies ? movies : [])

}

// Navbar menu actions
function changeActiveMenu(event) {
    document.querySelector('.active').classList.remove('active')
    event.target.parentNode.classList.add('active')

    switch (event.target.parentNode.id) {

        case 'menu-recherche':
        	generateCards([])
            setErrorVisible(false)
            pages.lastTitle && getSearchedMovies(pages.lastTitle)
            break

        case 'menu-favoris':
            setErrorVisible(true)
            getFavoriteMovies().then(movies => {
                favoriteMovies.value = movies ? movies : []
            })
            clearPagination()
            break
        
        case 'menu-avoir':
            setErrorVisible(true)
            getWantedMovies().then(movies => {
                wantedMovies.value = movies ? movies : []
            })
            clearPagination()
            break
    }
    
}
// Search movie action
function searchMovie(event) {
    event.preventDefault()
    setErrorVisible(true)
    document.querySelector('.active').classList.remove('active')
    document.getElementById('menu-recherche').classList.add('active')
    pages.lastTitle = document.getElementById('navbar-input').value
    pages.lastTitle && getSearchedMovies(pages.lastTitle)
}

// Menu clicked event
document.querySelectorAll('.nav-link').forEach(
    navLink => navLink.onclick = changeActiveMenu
)
// Search form submitted event
document.getElementById('navbar-form').onsubmit = searchMovie

// Reload cards on resize for more text description
window.onresize = () => {
    generateCards(searchedMovies.value)
}





