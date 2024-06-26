export default function About() {
  return (
    <div className="bg-[#16181e] h-[100vh]">
      <section className="mx-auto max-w-[1120px] container py-12 ">
        <h1 className="font-bold text-5xl text-center mb-12 text-white">About TMDB</h1>
        <div id="cards-container" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </section>
    </div>
  );
}
