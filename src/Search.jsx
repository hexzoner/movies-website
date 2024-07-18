import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiHeaders } from "./App";
import { MovieContex } from "./contex/MovieContex";
import Pagination from "./Pagination";
import noImage from "./assets/No-Image-Placeholder.png";
import starIcon from "./assets/star-icon.svg";
import favIcon from "./assets/heart-icon.svg";

export default function Search() {
  const [adult, setAdult] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [totalResults, setTotalResults] = useState([]);

  const { fetchGenres, genres } = useContext(MovieContex);

  const searchURL = `https://api.themoviedb.org/3/search/movie?include_adult=${adult}&language=en-US&query=${searchInput}&page=${page}`;

  useEffect(() => {
    // if (page === 1) return;
    if (loading) return;
    setLoading(true);
    fetchResults();
  }, [page]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(searchInput);

    setLoading(true);
    setPage(1);
    fetchResults();
  }

  function fetchResults() {
    axios
      .get(searchURL, apiHeaders)
      .then((res) => {
        // console.log(res.data);
        setTotalPages(res.data.total_pages);
        setTotalResults(res.data.total_results);
        setSearchResults(res.data.results);
        // setShowSearchDialog(true);
        // console.log(document.getElementById("search-dialog"));
        document.getElementById("search-dialog").showModal();
      })
      .catch((error) => console.error(error.message))
      .finally(setLoading(false));
  }

  return (
    <div className="flex mr-8 xl:mr-0 w-full md:w-auto ml-0 md:ml-0 ">
      <div className={`px-4 left-[53px] rounded-l-[13px] ${searchInput.length > 0 ? `relative opacity-100` : `relative opacity-50`}`} id="search-img-wrapper">
        <div onClick={handleSubmit}>
          <SearchIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit} id="search-form" className="w-full">
        <input
          onChange={handleChange}
          value={searchInput}
          className={`bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 
                input input-bordered input-md rounded-xl border-[2px]
                pl-[64px] h-[56px] font-medium text-lg w-full md:w-[250px] lg:w-[500px]`}
          type="text"
          id="search"
          name="search"
          placeholder="Search"
        />
      </form>
      {/* {showSearchDialog && <SearchDialog searchInput={searchInput} totalPages={totalPages} page={page} setPage={setPage} totalResults={totalResults} searchResults={searchResults} loading={loading} />} */}
      <SearchDialog searchInput={searchInput} totalPages={totalPages} page={page} setPage={setPage} totalResults={totalResults} searchResults={searchResults} loading={loading} />
    </div>
  );
}

const SearchDialog = ({ totalPages, page, setPage, totalResults, loading, searchInput, searchResults }) => {
  return (
    <dialog id="search-dialog" className="modal">
      <div className="modal-box border-2 border-opacity-50 mx-auto max-w-[1200px] container py-4 px-4">
        <div className="flex justify-between gap-1 mb-4 flex-wrap">
          <div className="text-base mt-1 ml-2">
            <p id="search-keyword">Search results for: "{searchInput}"</p>
            <div className="flex gap-3 items-center text-base">
              <p id="search-found" className="">
                Found: {totalResults}
              </p>
              <p id="search-total-pages" className="ml-0">
                Total Pages: {totalPages}
              </p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
        <div id="search-results" className="grid grid-cols-1 xl:grid-cols-2 gap-2 min-h-[100px]">
          {!loading ? (
            searchResults.map((movie) => {
              return <SearchResultCard key={movie.id} movie={movie} />;
            })
          ) : (
            <div className="flex items-center justify-center">-----LOADING-----</div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const SearchResultCard = ({ movie }) => {
  const imageURL = `https://image.tmdb.org/t/p//w300_and_h450_bestv2/`;
  return (
    <>
      <div className="flex  bg-base-300 text-base-content relative w-full">
        <img id="search-image" className="h-[180px] w-[120px] object-cover hover:cursor-pointer" src={!movie.poster_path ? noImage : `${imageURL}${movie.poster_path}`} alt={movie.title} />
        <div className="px-4 w-full flex flex-col max-h-[160px] m-1 justify-evenly">
          <p id="search-movie-title" className="font-bold text-lg sm:max-w-fit text-[#00b9ae] hover:cursor-pointer">
            {movie.title}
          </p>
          <div className="flex justify-start gap-6 items-center">
            <p className="text-sm">{movie.release_date.length > 0 ? movie.release_date.slice(0, -6) : ""}</p>
            <span className="flex font-semibold text-sm text-center">
              <img src={starIcon} alt="star" width="16px" className="flex mr-2" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="font-semibold text-sm text-right italic text-[#00b9ae]">Genres...</span>
          </div>
          <p id="movie-description" className="text-ellipsis overflow-hidden text-sm mt-2">
            {movie.overview}
          </p>
          <div id="search-fav" className="hover:cursor-pointer">
            <div className="bg-[#16181e] opacity-40 self-start p-2 absolute rounded-md right-1 top-1 h-[33px] w-[36px]"></div>
            <img className="self-start p-2 absolute rounded-md right-1 top-1" src={favIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

const SearchIcon = () => {
  return (
    <svg className="stroke-current mt-4 hover:stroke-primary hover:cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 11.4783C1 15.8486 1.78302 18.3581 3.30283 19.8237C4.83125 21.2975 7.35021 21.9565 11.4783 21.9565C15.6063 21.9565 18.1253 21.2975 19.6537 19.8237C21.1735 18.3581 21.9565 15.8486 21.9565 11.4783C21.9565 7.10793 21.1735 4.59845 19.6537 3.13291C18.1253 1.65907 15.6063 1.00002 11.4783 1.00002C7.35021 1.00002 4.83125 1.65907 3.30283 3.13291C1.78302 4.59845 1 7.10793 1 11.4783Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M22.9565 22.9565L20.3478 20.3478" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};
