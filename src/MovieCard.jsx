import starIcon from "./assets/star-icon.svg";
import favIcon from "./assets/heart-icon.svg";
const imageURL = `https://image.tmdb.org/t/p//w300_and_h450_bestv2/`;
const detailsURL = `https://www.themoviedb.org/movie/`;
import { Link } from "react-router-dom";

export default function MovieCard({ movie, Genres }) {
  // console.log(movie);
  let genresString = "";
  for (let movieGenreId of movie.genre_ids) {
    genresString += Genres.find((x) => x.id === movieGenreId).name + ", ";
  }
  if (genresString.length > 0) genresString = genresString.slice(0, -2);

  return (
    <div className="text-white  rounded-[18px] border-opacity-0 hover:cursor-pointer hover:border-opacity-50 border-solid border-primary border-2 relative">
      <Link to={`/movie/${movie.id}`} href={`${detailsURL}${movie.id}`}>
        <img className="rounded-[18px] w-full  relative" src={`${imageURL}${movie.poster_path}`} alt={movie.title} />
      </Link>
      <div className="pointer-events-none absolute bottom-0 w-full rounded-b-[18px] h-full flex flex-col justify-between">
        <div>
          <p id="movie-title" className="font-bold text-l text-center line-clamp-1  bg-neutral bg-opacity-70 rounded-t-[18px]  ">
            {movie.title}
          </p>
          <div className="flex justify-between bg-neutral bg-opacity-70 w-full">
            <span className="text-md px-2">{movie.release_date.length > 0 ? movie.release_date.slice(0, -6) : ""}</span>
            <span className="flex font-semibold text-sm text-center pr-2">
              <img src={starIcon} alt="star" className="flex mr-2 pb-2" />
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-neutral  bg-opacity-70  rounded-b-[18px] py-2">
          <button id="add-toList" className="pointer-events-auto rounded-full font-bold p-2 w-[48px] mr-1 hover:cursor-pointer hover:animate-pulse">
            <img src={favIcon} alt="" />
          </button>
          <span className="font-semibold text-sm text-right text-yellow-200 pr-3 italic">{genresString}</span>
        </div>
      </div>
    </div>
  );
}
