import { MovieContex } from "./MovieContex";
import { useState } from "react";

export const MovieProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [currentList, setCurrentList] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  let userPosition = { page: 1, scroll: 0, currentList: "popular" };

  function onAddToFav(movie) {
    // console.log(movie);
    setFavorites((prev) => [...prev, movie]);
  }

  return <MovieContex.Provider value={{ position, setPosition, page, setPage, currentList, setCurrentList, userPosition, favorites, setFavorites, onAddToFav }}>{children}</MovieContex.Provider>;
};
