import {useEffect, useState} from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {

  const [movies, setmovies] = useState();
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    searchMovies('spiderman'); 
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
/*     console.log(data.Search);
 */
    setmovies(data.Search);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
     <h1>Movieland</h1>

     <div className="search"> 
      <input
      placeholder="Search Movies ..."
      value={searchTerm}
      onChange={(e) => setsearchTerm(e.target.value)}
      onKeyDown={handleKeyDown} 
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
            {movies.map((movie, index) => (
              <MovieCard 
              movie={movie}
              key={index}
              />
          ))}
    
         </div>
        ) : (
          <div className="empty"> 
            <h2>No movies fam</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;