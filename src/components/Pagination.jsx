export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4 mb-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-300 text-gray-800 
                   hover:bg-gray-700 hover:text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-transform duration-200
                   hover:scale-110 disabled:hover:scale-100"
      >
        &lt;
      </button>

      <span className="px-3 py-1 rounded bg-gray-200 text-gray-800">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-300 text-gray-800 
                   hover:bg-gray-700 hover:text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-transform duration-200
                   hover:scale-110 disabled:hover:scale-100"
      >
        &gt;
      </button>
    </div>
  );
}
