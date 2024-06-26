import axios from "axios";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
// const getPopularMoviesAPI = "https://jsonplaceholder.typicode.com/posts";
const getPopularMoviesAPI = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const genreURL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
import { apiHeaders } from "./App";

export default function Home() {
  let popularMoviesData = [];

  const [PopularMovies, SetPopularMovies] = useState([]);
  const [Genres, SetGenres] = useState([]);
  const [Loaded, SetLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(getPopularMoviesAPI, apiHeaders)
      .then((res) => {
        popularMoviesData = res.data;
        SetPopularMovies(popularMoviesData.results);
        // console.log(popularMoviesData.results);
      })
      .catch((error) => console.error(error.message));

    axios
      .get(genreURL, apiHeaders)
      .then((res) => {
        // console.log(res.data.genres);
        SetGenres(res.data.genres);
      })
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    if (Genres.length > 0 && PopularMovies.length > 0) SetLoaded(true);
  }, [Genres, PopularMovies]);

  return (
    <div className="bg-[#16181e] min-h-[100vh]">
      <section className="mx-auto max-w-[1000px] container py-12 ">
        <h1 className="font-bold text-4xl mb-12 text-white">Popular this week</h1>
        <div id="cards-container" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Loaded ? (
            PopularMovies.map((movie) => {
              //   console.log(Genres);
              //   console.log(PopularMovies);
              return <div key={movie.id}>{<MovieCard movie={movie} Genres={Genres} />}</div>;
            })
          ) : (
            <div className="text-white text-3xl text-center absolute top-[50%] left-[40%]">Loading the movies...</div>
          )}
        </div>
      </section>
    </div>
  );
}
