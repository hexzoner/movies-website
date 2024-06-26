export default function Journal() {
  return (
    <div className="bg-[#16181e] h-[100vh]">
      <section className="mx-auto max-w-[1120px] container py-12 ">
        <h1 className="font-bold text-5xl text-center mb-12 text-white">My Journal</h1>
        <div id="cards-container" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </section>
    </div>
  );
}
