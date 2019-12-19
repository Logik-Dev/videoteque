import { generateCards } from './cards.js'

let searchedMovies = {
    valueInternal: [],
    valueListener: function (val) { },

    set value(val) {
        this.valueInternal = val
        this.valueListener(val)
    },
    get value() {
        return this.valueInternal
    },
    registerListener: function (listener) {
        this.valueListener = listener;
    }
}
let favoriteMovies = {
    valueInternal: [],
    valueListener: function (val) { },

    set value(val) {
        this.valueInternal = val
        this.valueListener(val)
    },
    get value() {
        return this.valueInternal
    },
    registerListener: function (listener) {
        this.valueListener = listener;
    }
}
let wantedMovies = {
    valueInternal: [],
    valueListener: function (val) { },

    set value(val) {
        this.valueInternal = val
        this.valueListener(val)
    },
    get value() {
        return this.valueInternal
    },
    registerListener: function (listener) {
        this.valueListener = listener;
    }
}

// SearchedMoviesArray change
searchedMovies.registerListener(movies => {
    menuIsActive('menu-recherche') && generateCards(movies)
})
// FavoriteMoviesArray change
favoriteMovies.registerListener(movies => {
    menuIsActive('menu-favoris') && generateCards(movies)

})
// WantedMoviesArray change
wantedMovies.registerListener(movies => {
    if(menuIsActive('menu-avoir')){
        generateCards(movies)
    }
})

const menuIsActive = menu => {
    return document.getElementById(menu).classList.contains('active')
}


export { searchedMovies, favoriteMovies, wantedMovies }