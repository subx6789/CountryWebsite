import { Link } from "react-router-dom";

export default function Cards({ countries }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country) => (
        <Link
          to={`/country/${country.cca3}`}
          key={country.cca3}
          className="bg-white dark:bg-darkBlue rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-40 object-cover"
          />
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-veryDarkBlue dark:text-white">
              {country.name.common}
            </h2>
            <p className="text-veryDarkBlue dark:text-white">
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p className="text-veryDarkBlue dark:text-white">
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p className="text-veryDarkBlue dark:text-white">
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
