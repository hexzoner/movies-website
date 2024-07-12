import axios from "axios";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
// import { useFetcher } from "react-router-dom";
import { apiHeaders } from "./App";
const key = "movies-page";

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getPopularMoviesAPI = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const getUpcomingMoviesAPI = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  const getTopMoviesAPI = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  const getInCinemaAPI = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  const genreURL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  const [loading, setLoading] = useState(true);
  let popularMoviesData = [];

  const [PopularMovies, SetPopularMovies] = useState([]);
  const [Genres, SetGenres] = useState([]);
  const [currentList, setCurrentList] = useState("popular");
  const [pageTitle, setPageTitle] = useState("Popular Movies");

  function getHomeUrl() {
    if (currentList === "popular") {
      setPageTitle("Popular Movies");
      return getPopularMoviesAPI;
    }
    if (currentList === "upcoming") {
      setPageTitle("Upcoming Movies");
      return getUpcomingMoviesAPI;
    }
    if (currentList === "top") {
      setPageTitle("Top Movies");
      return getTopMoviesAPI;
    }
    if (currentList === "cinema") {
      setPageTitle("Now in Cinema");
      return getInCinemaAPI;
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(getHomeUrl(), apiHeaders)
      .then((res) => {
        popularMoviesData = res.data;
        SetPopularMovies(popularMoviesData.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((error) => console.error(error.message))
      .finally(
        axios
          .get(genreURL, apiHeaders)
          .then((res) => SetGenres(res.data.genres))
          .catch((error) => console.error(error.message))
          .finally(setLoading(false))
      );
  }, [currentList, page]);

  return (
    <div className="bg-base-200 min-h-[200vh]">
      <div className="flex">
        <SideNavBar setCurrentList={setCurrentList} currentList={currentList} setPage={setPage} />
        <section className="ml-8 max-w-[1200px] container  ">
          <div className="flex justify-between pr-24 pt-6">
            <h1 className="font-bold text-4xl mb-12 text-base-content">{pageTitle}</h1>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mr-8 mb-6">
            {!loading && Genres.length > 0 && PopularMovies.length > 0 ? PopularMovies.map((movie) => <div key={movie.id}>{<MovieCard movie={movie} Genres={Genres} />}</div>) : <MoviesSkeleton />}
          </div>
          <div className="text-center mb-6">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </section>
      </div>
    </div>
  );
}

const MoviesSkeleton = () => {
  const SkeletonLine = () => {
    return <div className="skeleton h-[364px] w-[242px]"></div>;
  };
  return (
    <>
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
    </>
  );
};

const SideNavBar = ({ setCurrentList, currentList, setPage }) => {
  function handleSideBar(e) {
    setCurrentList(e.target.id);
    setPage(1);
    // console.log(e.target.id);
  }

  return (
    <div className="w-1/5 bg-base-100">
      <ul className="menu menu-lg bg-base-100 rounded-box w-full pl-4 mt-16 font-semibold">
        <li>
          <p onClick={handleSideBar} id="popular" className={currentList === "popular" && "bg-primary text-primary-content pointer-events-none"}>
            Popular Movies
          </p>
        </li>
        <li>
          <p onClick={handleSideBar} id="cinema" className={currentList === "cinema" && "bg-primary text-primary-content pointer-events-none"}>
            Now in Cinema
          </p>
        </li>
        <li>
          <p onClick={handleSideBar} id="upcoming" className={currentList === "upcoming" && "bg-primary text-primary-content pointer-events-none"}>
            Upcoming Movies
          </p>
        </li>
        <li>
          <p onClick={handleSideBar} id="top" className={currentList === "top" && "bg-primary text-primary-content pointer-events-none"}>
            Top Rated Movies
          </p>
        </li>
      </ul>
    </div>
  );
};

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="join ">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)} className="join-item btn btn-lg">
          «
        </button>
      )}
      {totalPages > 1 && <button className="join-item btn btn-lg">{page}</button>}
      {page < totalPages && (
        <button onClick={() => setPage(page + 1)} className="join-item btn btn-lg">
          »
        </button>
      )}
    </div>
  );
};
