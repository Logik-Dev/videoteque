import { getSearchedMovies } from './api.js'

let pages = {
    current: 1,
    total: 1,
    lastTitle: ""
}

// Clear Pagination
const clearPagination = () => {
    let pagination = document.querySelector('.pagination')
    pagination.innerHTML = ""
}

// Generate Pagination
const generatePagination = () => {
    let pagination = document.querySelector('.pagination')

    // previous page button
    let pagePreviousItem = createPaginationItem("&laquo;", paginationPrevious)
    pagination.appendChild(pagePreviousItem)

    // all pages
    let max = pages.total >= 10 ? 10 : pages.total
    for (let i = 1; i <= max; i++) {
        let paginationItem = createPaginationItem(i, paginationChange, i)
        pagination.appendChild(paginationItem)
    }

    // next page button 
    let pageNextItem = createPaginationItem("&raquo;", paginationNext)
    pagination.appendChild(pageNextItem)

}
// Pagination Items
const createPaginationItem = (innerText, eventFunction, arg) => {
    let paginationItem = document.createElement('li')
    paginationItem.className = "page-item"
    let paginationLink = document.createElement('a')
    paginationLink.className = "page-link"
    paginationLink.innerHTML = innerText
    paginationLink.addEventListener('click', () => eventFunction(arg))
    paginationItem.appendChild(paginationLink)
    return paginationItem
}
// Change current page
const paginationChange = number => {
    if (pages.current != number) {
        pages.current = number;
        getSearchedMovies(pages.lastTitle)
    }
}
// Previous page
const paginationPrevious = () => {
    if (pages.current > 1) {
        pages.current--
        getSearchedMovies(pages.lastTitle)
    }
}
// Next Page
const paginationNext = () => {
    if (pages.current < pages.total) {
        pages.current++
        getSearchedMovies(pages.lastTitle)
    }
}

export { clearPagination, generatePagination, pages }