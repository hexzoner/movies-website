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

export default Pagination;
