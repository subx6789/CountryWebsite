import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-white dark:bg-darkBlue shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="font-bold text-xl text-veryDarkBlue dark:text-white">
            Where in the world?
          </h1>
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center text-veryDarkBlue dark:text-white"
        >
          {darkMode ? (
            <>
              <i className="fas fa-sun mr-2"></i> Light Mode
            </>
          ) : (
            <>
              <i className="fas fa-moon mr-2"></i> Dark Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
