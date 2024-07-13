import { MovieContex } from "./MovieContex";
import { useState, useEffect } from "react";
import { saveFavorites, loadFavorites } from "../utilities/movie-storage";

export const MovieProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [currentList, setCurrentList] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  let userPosition = { page: 1, scroll: 0, currentList: "popular" };

  const favoritedMovies = [];

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  function onAddToFav(movie) {
    // console.log(movie);
    const found = favorites.find((x) => x.id === movie.id);
    if (found) {
      const a = favorites.filter((x) => x.id !== movie.id);
      setFavorites(a);
      saveFavorites(a);
    } else {
      saveFavorites([...favorites, movie]);
      setFavorites((prev) => [...prev, movie]);
    }
    // favoritedMovies.push(movie);
    // console.log(favoritedMovies);
  }

  return (
    <MovieContex.Provider value={{ position, setPosition, page, setPage, currentList, setCurrentList, userPosition, favorites, setFavorites, onAddToFav, favoritedMovies }}>
      {children}
    </MovieContex.Provider>
  );
};
