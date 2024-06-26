import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiHeaders } from "./App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const imageURL = `https://image.tmdb.org/t/p/original/`;
const genreURL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailsAPI = "https://api.themoviedb.org/3/movie/";
  const [Movie, setMovie] = useState({});
  const [MovieData, SetMovieData] = useState({
    budget: "",
    revenue: "",
    country: "",
    genres: "",
    vote: 0,
  });

  let genresString = "";

  useEffect(() => {
    // Whenever the 'id' dynamic segment change, we can 'fetch' the product details
    axios.get(`${detailsAPI}${id}`, apiHeaders).then((res) => {
      const _movie = res.data;
      setMovie(_movie);
      console.log(_movie);
      const _movieData = {
        budget: numberWithCommas(_movie.budget),
        country: _movie.origin_country[0],
        vote: _movie.vote_average,
        revenue: numberWithCommas(_movie.revenue),
      };

      axios
        .get(genreURL, apiHeaders)
        .then((res) => {
          genresString = "";
          for (let movieGenreId of _movie.genres) genresString += res.data.genres.find((x) => x.id === movieGenreId.id).name + ", ";
          if (genresString.length > 0) genresString = genresString.slice(0, -2);

          SetMovieData({ ..._movieData, ["genres"]: genresString });
        })
        .catch((error) => console.error(error.message));
    });
    return () => setMovie(null);
  }, [id]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="bg-[#16181e] min-h-[100vh] text-white">
      {Movie ? (
        <div className="max-w-[1000px] m-auto relative">
          <div className="flex bg-black ">
            <img
              onClick={(e) => {
                navigate(Movie.homepage);
              }}
              className="w-full h-[100vh] object-scale-down relative hover:cursor-pointer"
              src={`${imageURL}${Movie.poster_path}`}
              alt={Movie.title}
            />
            <div>
              <div className="px-8 pt-2 pb-16 h-full ">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4">
                    <div className="font-bold text-2xl">{Movie.title}</div>
                    <div>"{Movie.tagline}"</div>
                    <div>Released: {Movie.release_date}</div>
                    <div>{Movie.runtime} min</div>
                    <div>Rating: {MovieData.vote.toFixed(1)} / 10</div>
                    {MovieData.budget != 0 && <div>Budget: {MovieData.budget} USD</div>}
                    {MovieData.revenue != 0 && <div>Revenue: {MovieData.revenue} USD</div>}
                    <div>Country: {MovieData.country}</div>
                    <div className="italic">{MovieData.genres}</div>
                  </div>
                  <div className="text-xl">{Movie.overview}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-center pt-48 text-3xl">Loading details...</div>
      )}
    </div>
  );
}
