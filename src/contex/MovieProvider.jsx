import { MovieContex } from "./MovieContex";
import { useState, useEffect } from "react";
import { saveFavorites, loadFavorites } from "../utilities/movie-storage";
import axios from "axios";
import { apiHeaders } from "../App";

export const MovieProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [currentList, setCurrentList] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);

  // let genres = [];

  let userPosition = { page: 1, scroll: 0, currentList: "popular" };

  const favoritedMovies = [];

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  function onAddToFav(movie) {
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

  function fetchGenres() {
    const genreURL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    return new Promise((resolve, reject) => {
      if (genres.length === 0) {
        // console.log("Getting genres from the server...");
        axios
          .get(genreURL, apiHeaders)
          .then((res) => {
            setGenres(res.data.genres);
            resolve(res.data.genres);
          })
          .catch((err) => reject(err));
      } else resolve(genres);
    });
  }

  return (
    <MovieContex.Provider value={{ genres, fetchGenres, position, setPosition, page, setPage, currentList, setCurrentList, userPosition, favorites, setFavorites, onAddToFav, favoritedMovies }}>
      {children}
    </MovieContex.Provider>
  );
};
