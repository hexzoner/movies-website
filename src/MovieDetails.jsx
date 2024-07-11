import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiHeaders } from "./App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const imageURL = `https://image.tmdb.org/t/p/original/`;
const genreURL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
import BackButton from "./BackButton";

export default function MovieDetails() {
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    // Whenever the 'id' dynamic segment change, we can 'fetch' the product details
    axios.get(`${detailsAPI}${id}`, apiHeaders).then((res) => {
      const _movie = res.data;

      setMovie(_movie);
      // console.log(_movie);
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
        .catch((error) => console.error(error.message))
        .finally(setLoading(false));
    });
    // .finally(setLoading(false));
    return () => setMovie(null);
  }, [id]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="bg-base-200 min-h-[100vh] ">
      {!loading ? (
        <div className="flex">
          <div className="relative bg-base-200 w-1/5 text-center mt-16">
            <BackButton />
          </div>
          <div className="max-w-[1000px] relative">
            <div className="flex bg-neutral text-neutral-content relative">
              <img
                onClick={(e) => {
                  // navigate(Movie.homepage);
                  // window.location.href = Movie.homepage;
                  window.open(Movie.homepage, "_blank");
                }}
                className="w-full h-[100vh] object-scale-down relative hover:cursor-pointer"
                src={`${imageURL}${Movie.poster_path}`}
                alt={Movie.title}
              />

              <div>
                <div className="px-8 pt-4 pb-10 h-full ">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-4">
                      <div className="font-bold text-2xl">{Movie.title}</div>
                      <div className="px-2 py-2 rounded-br-lg z-10  text-neutral-content bg-opacity-60">
                        <svg className="opacity-100 stroke-current hover:cursor-pointer hover:animate-pulse" width="32" height="32" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.9981 17.6694L2.51765 9.99133C-2.09133 5.38446 4.68385 -3.46071 10.9981 3.69527C17.3124 -3.46071 24.057 5.41518 19.4787 9.99133L10.9981 17.6694Z"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
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
        </div>
      ) : (
        <div className="flex w-[1000px] gap-4 m-auto  min-h-screen">
          <div className="skeleton h-screen w-[100%]"></div>
          <div className="flex flex-col w-[55%] gap-4 mt-4 mr-2">
            <div className="skeleton h-8 w-32"></div>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

const Tooltip = () => {
  const tooltipStyle = {
    display: this.state.hover ? "block" : "none",
  };
  return (
    <div>
      <div onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
        on hover here we will show the tooltip
      </div>
      <div>
        <div style={tooltipStyle}>this is the tooltip!!</div>
      </div>
    </div>
  );
};
