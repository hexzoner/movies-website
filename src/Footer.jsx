import tmdbLogo from "./assets/tmbd-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#21242D] flex items-center justify-center gap-6 mx-auto py-8 px-2">
      <img className="max-w-[70px] ml-2" src={tmdbLogo} alt="Logo" />
      <small className="font-semibold sm:text-lg md:text-xl font-[lato] text-[#F9F9F9]">&copy; 2024 Movie Diary. All rights reserved.</small>
    </footer>
  );
}
