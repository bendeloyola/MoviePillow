import { useState, useEffect } from 'react'
import './App.css'

import searchIcon from './search.svg'

import MovieCard from './Components/MovieCard'

const API_URL = "https://www.omdbapi.com/?apikey=6efa985b";

// const movie1 = {
//   "Title": "Italian Spiderman",
//   "Year": "2007",
//   "imdbID": "tt2705436",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }

const App = () => {

  const [ movies, setMovies ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className='app'>
        <h1>MoviePillow</h1>

        <div className='search'>
          <input 
            type="text" 
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? searchMovies(searchTerm) : searchMovies(movies)}
          />
          <img 
            src={searchIcon} 
            alt="search" 
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {
          movies?.length > 0 
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID}/>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
    </div>
  )
}

export default App