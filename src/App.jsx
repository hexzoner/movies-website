// import { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Journal from "./Journal";
import Footer from "./Footer";
import Navbar from "./Navbar";
import About from "./About";
import MovieDetails from "./MovieDetails";
import PageNotFound from "./NotFound";
import { MovieProvider } from "./contex/MovieProvider";

export const apiHeaders = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWM5NDUxNTBhYmIyYTY1ZjhkYTliZTYxOGI4MmFmOSIsInN1YiI6IjY2NjZiNDIzOTE0Yjg4OTA3YWU5ZDNjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-3rLuyFChJ4INeqA33ircOiCiRms_QyOggdAkeJ74N4",
    Accept: "application/json",
  },
};

const MainLayout = () => {
  return (
    <>
      <MovieProvider>
        <Navbar />
        <div className="font-[lato]">
          <Outlet />
        </div>
      </MovieProvider>
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="journal" element={<Journal />} />
      <Route path="about" element={<About />} />
      <Route path="movie/:id" element={<MovieDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  // const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
