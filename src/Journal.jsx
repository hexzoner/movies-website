import { MovieContex } from "./contex/MovieContex";
import { useContext } from "react";
import MovieCard from "./MovieCard";

export default function Journal() {
  const { favorites, onMovieDetails } = useContext(MovieContex);

  return (
    <div className="bg-neutral min-h-screen">
      <section className="mx-auto max-w-[1120px] container py-8 ">
        <h1 className="font-bold text-4xl text-left mb-12 text-white">My Journal</h1>
        <div id="cards-container" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {favorites.map((x) => {
            return <MovieCard onMovieDetails={onMovieDetails} movie={x} />;
          })}
        </div>
      </section>
    </div>
  );
}
