


// Create HTML element with a classname
const createElementWithClass = (elementName, className) => {
    const element = document.createElement(elementName)
    element.className = className
    return element
}

// Check if a list contains a movie
const containsMovie = (movieList, movie) => {
    let result = false
    movieList && movieList.forEach(
        m => {
            if (m.id == movie.id) result = true
        }
    )
    return result
}

const handleMessage = (message, error) => {


    let messageBox = document.createElement('div');
    messageBox.id = "messages"
    let className = "fixed-bottom w-100 text-center text-light p-3 "
    className = error ? className + "bg-danger" : className + "bg-success"
    messageBox.className = className
    messageBox.innerText = message
    document.body.appendChild(messageBox)
}
export { createElementWithClass, containsMovie, handleMessage }