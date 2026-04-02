import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const result = await fetch(`http://localhost:3000/movies`);
        const data = await result.json();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      <h1>Favorite Movies</h1>

      {movies.length === 0 && <p>No movies found.</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            Title: {movie.title} | Released: ({movie.year_released}) | Main
            Character: {movie.main_character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
