export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-4 md:mb-0 w-full md:w-1/3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 rounded-md shadow-md bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-darkGray dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}