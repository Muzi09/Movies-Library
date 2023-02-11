const moviesArr = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]

var moviesString = JSON.stringify(moviesArr)
localStorage.setItem('movies', moviesString)

var storedMovies = localStorage.getItem('movies')
var movies = JSON.parse(storedMovies)


function searchByTitle(title) {
    let res = []

    movies.forEach((movie) => {
        if ((movie.title.toUpperCase()).includes(title.toUpperCase().trim())) {
            res.push(movie)
        }
    })
    return res
}

function searchByGenre(genre) {
    let res = []
    movies.forEach((movie) => {
        if ((movie.genre.toUpperCase()).includes(genre.toUpperCase().trim())) {
            res.push(movie)
        }
    })
    return res
}

function searchByBoth(title, genre) {
    let res = []

    movies.forEach((movie) => {
        if ((movie.title.toUpperCase()).includes(title.toUpperCase().trim()) && (movie.genre.toUpperCase()).includes(genre.toUpperCase().trim())) {
            res.push(movie)
        }
    })
    return res
}

function displayResults(searchResult) {
    searchResult.map((result) => {
        console.log(`${result.title} (${result.genre})`)
    })
}

function sortByTitle(searchResult) {

    for (let i = 0; i < searchResult.length; i++) {

        for (let i = 0; i < searchResult.length - 1; i++) {
            if (searchResult[i].title > searchResult[i + 1].title) {
                let temp = searchResult[i + 1].title
                searchResult[i + 1].title = searchResult[i].title
                searchResult[i].title = temp
            }
        }
    }
    return searchResult
}

function sortByGenre(searchResult) {

    for (let i = 0; i < searchResult.length; i++) {

        for (let i = 0; i < searchResult.length - 1; i++) {
            if (searchResult[i].genre > searchResult[i + 1].genre) {
                let temp = searchResult[i + 1].genre
                searchResult[i + 1].genre = searchResult[i].genre
                searchResult[i].genre = temp
            }
        }
    }
    return searchResult
}

function countByGenre(searchResult) {
    let obj = { Action: 0, Adventure: 0, Comedy: 0, Drama: 0, Fantasy: 0 }

    for (let i = 0; i < searchResult.length; i++) {
        if (searchResult[i].genre == 'Action') {
            obj.Action = obj.Action + 1
        }
        else if (searchResult[i].genre == 'Adventure') {
            obj.Adventure = obj.Adventure + 1
        }
        else if (searchResult[i].genre == 'Comedy') {
            obj.Comedy = obj.Comedy + 1
        }
        else if (searchResult[i].genre == 'Drama') {
            obj.Drama = obj.Drama + 1
        }
        else if (searchResult[i].genre == 'Fantasy') {
            obj.Fantasy = obj.Fantasy + 1
        }
    }
    return obj
}




const title = document.getElementById('title')
const genre = document.getElementById('genre')
const search = document.getElementById('search')
let ul = document.getElementById('ul')
let sort_title = document.getElementById('sort-title')
let sort_genre = document.getElementById('sort-genre')
let genre_ul = document.getElementById('genre-ul')
let drop_down = document.getElementById('drop-down')
let resultArr



function renderResult(resultArr) {

    if (ul.innerHTML) {
        ul.innerHTML = ""
    }
    if (genre_ul.innerHTML) {
        genre_ul.innerHTML = ""
    }

    resultArr.map((element) => {
        let li = document.createElement('li')
        li.innerHTML = `${element.title} (${element.genre})`
        ul.appendChild(li)
    })

    let genre_obj = countByGenre(resultArr)
    for (key in genre_obj) {
        let li = document.createElement('li')
        li.innerHTML = `${key} - ${genre_obj[key]}`
        genre_ul.appendChild(li)
    }
}



search.addEventListener('click', () => {

    if (title.value && drop_down.value == 'by-title') {
        resultArr = searchByTitle(title.value)
        renderResult(resultArr)
    }

    else if (genre.value && drop_down.value == 'by-genre') {
        resultArr = searchByGenre(genre.value)
        renderResult(resultArr)
    }
    
    else if (drop_down.value == 'both') {
        resultArr = searchByBoth(title.value, genre.value)
        renderResult(resultArr)
    }
})

sort_title.addEventListener('click', () => {
    ul.innerHTML = ""
    resultArr = sortByTitle(resultArr)
    renderResult(resultArr)

})

sort_genre.addEventListener('click', () => {
    ul.innerHTML = ""
    resultArr = sortByGenre(resultArr)
    renderResult(resultArr)

})

