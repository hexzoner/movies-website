import searchIcon from "./assets/Search.png";
import tmdbLogo from "./assets/tmbd-logo.svg";
import { NavLink, Link } from "react-router-dom";

// const navLinkDefault = "hover:cursor-pointer mr-4 md:mr-0";
// const navLinkHighlighted = "underline text-[#00B9AE]";

export default function Navbar() {
  return (
    <header className="bg-[#21242D]">
      <div className="h-[153px] md:h-[123px] max-w-[1120px] m-auto text-[#F9F9F9] relative top-9">
        <div className="flex justify-between items-center font-semibold text-2xl flex-wrap gap-3">
          <img className="max-w-[70px] ml-2 xl:ml-0" src={tmdbLogo} alt="" />
          <NavLink to="/" href="index.html" className={({ isActive }) => (isActive ? "underline text-[#00B9AE]" : "")}>
            Home
          </NavLink>
          <NavLink to="journal" className={({ isActive }) => (isActive ? "underline text-[#00B9AE]" : "")}>
            My Journal
          </NavLink>
          <NavLink to="about" className={({ isActive }) => (isActive ? "underline text-[#00B9AE]" : "")}>
            About
          </NavLink>

          <div className="flex mr-8 xl:mr-0 w-full md:w-auto ml-[-30px] md:ml-0">
            <div className="px-4 left-[53px] rounded-l-[13px] relative opacity-50" id="search-img-wrapper">
              <img className="relative w-fit top-[17px]" src={searchIcon} alt="" id="search-img" />
            </div>

            <form id="search-form" className="w-full">
              <input
                className="bg-[#21242D] border-solid border-[#F9F9F9] border-opacity-10 rounded-xl border-[1px] pl-[64px] h-[56px] font-medium text-lg w-full md:w-[250px] lg:w-[537px]"
                type="text"
                id="search"
                name="search"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
