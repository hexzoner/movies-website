import searchIcon from "./assets/Search.png";
import tmdbLogo from "./assets/tmbd-logo.svg";
import { NavLink, Link } from "react-router-dom";
import ThemesSwap from "./ThemesSwap";

// const navLinkDefault = "hover:cursor-pointer mr-4 md:mr-0";
// const navLinkHighlighted = "underline text-[#00B9AE]";

export default function Navbar() {
  return (
    <header className="bg-base-100 text-base border-b-[1.5px] border-primary border-opacity-30">
      <div className="h-[153px] md:h-[123px] max-w-[1200px] m-auto relative top-9 ">
        <div className="flex justify-between items-center font-semibold text-2xl flex-wrap gap-3">
          <svg className="stroke-current fill-current ml-2 xl:ml-0" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 185.04 133.4">
            <path d="M51.06,66.7h0A17.67,17.67,0,0,1,68.73,49h-.1A17.67,17.67,0,0,1,86.3,66.7h0A17.67,17.67,0,0,1,68.63,84.37h.1A17.67,17.67,0,0,1,51.06,66.7Zm82.67-31.33h32.9A17.67,17.67,0,0,0,184.3,17.7h0A17.67,17.67,0,0,0,166.63,0h-32.9A17.67,17.67,0,0,0,116.06,17.7h0A17.67,17.67,0,0,0,133.73,35.37Zm-113,98h63.9A17.67,17.67,0,0,0,102.3,115.7h0A17.67,17.67,0,0,0,84.63,98H20.73A17.67,17.67,0,0,0,3.06,115.7h0A17.67,17.67,0,0,0,20.73,133.37Zm83.92-49h6.25L125.5,49h-8.35l-8.9,23.2h-.1L99.4,49H90.5Zm32.45,0h7.8V49h-7.8Zm22.2,0h24.95V77.2H167.1V70h15.35V62.8H167.1V56.2h16.25V49h-24ZM10.1,35.4h7.8V6.9H28V0H0V6.9H10.1ZM39,35.4h7.8V20.1H61.9V35.4h7.8V0H61.9V13.2H46.75V0H39Zm41.25,0h25V28.2H88V21h15.35V13.8H88V7.2h16.25V0h-24Zm-79,49H9V57.25h.1l9,27.15H24l9.3-27.15h.1V84.4h7.8V49H29.45l-8.2,23.1h-.1L13,49H1.2Zm112.09,49H126a24.59,24.59,0,0,0,7.56-1.15,19.52,19.52,0,0,0,6.35-3.37,16.37,16.37,0,0,0,4.37-5.5A16.91,16.91,0,0,0,146,115.8a18.5,18.5,0,0,0-1.68-8.25,15.1,15.1,0,0,0-4.52-5.53A18.55,18.55,0,0,0,133.07,99,33.54,33.54,0,0,0,125,98H113.29Zm7.81-28.2h4.6a17.43,17.43,0,0,1,4.67.62,11.68,11.68,0,0,1,3.88,1.88,9,9,0,0,1,2.62,3.18,9.87,9.87,0,0,1,1,4.52,11.92,11.92,0,0,1-1,5.08,8.69,8.69,0,0,1-2.67,3.34,10.87,10.87,0,0,1-4,1.83,21.57,21.57,0,0,1-5,.55H121.1Zm36.14,28.2h14.5a23.11,23.11,0,0,0,4.73-.5,13.38,13.38,0,0,0,4.27-1.65,9.42,9.42,0,0,0,3.1-3,8.52,8.52,0,0,0,1.2-4.68,9.16,9.16,0,0,0-.55-3.2,7.79,7.79,0,0,0-1.57-2.62,8.38,8.38,0,0,0-2.45-1.85,10,10,0,0,0-3.18-1v-.1a9.28,9.28,0,0,0,4.43-2.82,7.42,7.42,0,0,0,1.67-5,8.34,8.34,0,0,0-1.15-4.65,7.88,7.88,0,0,0-3-2.73,12.9,12.9,0,0,0-4.17-1.3,34.42,34.42,0,0,0-4.63-.32h-13.2Zm7.8-28.8h5.3a10.79,10.79,0,0,1,1.85.17,5.77,5.77,0,0,1,1.7.58,3.33,3.33,0,0,1,1.23,1.13,3.22,3.22,0,0,1,.47,1.82,3.63,3.63,0,0,1-.42,1.8,3.34,3.34,0,0,1-1.13,1.2,4.78,4.78,0,0,1-1.57.65,8.16,8.16,0,0,1-1.78.2H165Zm0,14.15h5.9a15.12,15.12,0,0,1,2.05.15,7.83,7.83,0,0,1,2,.55,4,4,0,0,1,1.58,1.17,3.13,3.13,0,0,1,.62,2,3.71,3.71,0,0,1-.47,1.95,4,4,0,0,1-1.23,1.3,4.78,4.78,0,0,1-1.67.7,8.91,8.91,0,0,1-1.83.2h-7Z" />
          </svg>
          <NavLink to="/" href="index.html" className={({ isActive }) => (isActive ? "underline text-primary" : "")}>
            Home
          </NavLink>
          <NavLink to="journal" className={({ isActive }) => (isActive ? "underline text-primary" : "")}>
            My Journal
          </NavLink>
          <NavLink to="about" className={({ isActive }) => (isActive ? "underline text-primary" : "")}>
            About
          </NavLink>

          <div className="flex mr-8 xl:mr-0 w-full md:w-auto ml-0 md:ml-0 ">
            <div className="px-4 left-[53px] rounded-l-[13px] relative opacity-50" id="search-img-wrapper">
              {/* <img className="relative w-fit top-[17px]" src={searchIcon} alt="" id="search-img" /> */}
              <svg className="stroke-current mt-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 11.4783C1 15.8486 1.78302 18.3581 3.30283 19.8237C4.83125 21.2975 7.35021 21.9565 11.4783 21.9565C15.6063 21.9565 18.1253 21.2975 19.6537 19.8237C21.1735 18.3581 21.9565 15.8486 21.9565 11.4783C21.9565 7.10793 21.1735 4.59845 19.6537 3.13291C18.1253 1.65907 15.6063 1.00002 11.4783 1.00002C7.35021 1.00002 4.83125 1.65907 3.30283 3.13291C1.78302 4.59845 1 7.10793 1 11.4783Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M22.9565 22.9565L20.3478 20.3478" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <form id="search-form" className="w-full">
              <input
                className={`bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 
                input input-bordered input-md rounded-xl border-[2px]
                pl-[64px] h-[56px] font-medium text-lg w-full md:w-[250px] lg:w-[500px]`}
                type="text"
                id="search"
                name="search"
                placeholder="Search"
              />
            </form>
          </div>
          <ThemesSwap />
        </div>
      </div>
    </header>
  );
}
