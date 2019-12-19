import { generatePagination, clearPagination, pages } from './pagination.js'
import { searchedMovies } from './movies.js'
import { handleMessage } from './helpers.js'

const API_URL = "http://localhost:8080/api/movies"

let errorVisible = true;

// ------------------------------------------ DEFINE API REQUESTS ------------------------------
// Fetch movie list
function fetchMovieList(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                return response.text().then(text => errorVisible && handleMessage(text, true))
            }
            return response.json()
        })

}
// Fetch favorite movies
const getFavoriteMovies = () => {
    const url = `${API_URL}/favorite/all`
    return fetchMovieList(url)
}
// Fetch wanted movies
const getWantedMovies = () => {
    let url = `${API_URL}/wanted/all`
    return fetchMovieList(url)
}
// Add movie
const addMovie = movie => {
    movieRequest('POST', '/add', movie)
}
// Check if update or delete
const editMovie = movie => {
    movieRequest('PUT', '/update', movie)
}
const deleteMovie = movie => {
    movieRequest('DELETE', '/delete', movie)
}
// Edit movie
const movieRequest = (verb, endpoint, movie) => {
    const url = `${API_URL}${endpoint}`
    fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: verb,
        body: JSON.stringify(movie)
    })
        .then(response => {
            response.text().then(text => handleMessage(text, !response.ok))
        })
}
// Find a movie
const getSearchedMovies = title => {
    const url = `${API_URL}/find?title=${title}&page=${pages.current}`
    fetchMovieList(url, false).then(json => {
        clearPagination()
        if (json) {
            searchedMovies.value = json.movies
            pages.total = json.pages
            json.pages > 1 && generatePagination(json.pages)
        }

    })
}

const setErrorVisible = boolean => {
    errorVisible = boolean
}
export { getFavoriteMovies, getWantedMovies, getSearchedMovies, addMovie, editMovie, deleteMovie, setErrorVisible}