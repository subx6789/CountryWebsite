import { useParams, Link, useNavigate } from "react-router-dom";
import { useApiCache } from "../hooks/useApiCache";
import Loading from "./Loading";

export default function CountryDetails() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const {
    data: countries,
    loading,
    error,
  } = useApiCache("https://restcountries.com/v3.1/all");

  if (loading)
    return (
      <div className="text-center py-8">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  const country = countries.find((c) => c.cca3 === countryCode);

  if (!country) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-veryDarkBlue dark:text-white">
          Country Not Found
        </h1>
        <p className="text-veryDarkBlue dark:text-white mb-8">
          This country seems to be hiding from our map. Let's explore others!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
        >
          Back to All Countries
        </button>
      </div>
    );
  }

  const isIncompleteData =
    !country.capital || !country.currencies || !country.languages;

  if (isIncompleteData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-veryDarkBlue dark:text-white">
          {country.name.common}
        </h1>
        <div className="w-64 h-40 mx-auto mb-8 overflow-hidden shadow-md">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-veryDarkBlue dark:text-white mb-8">
          This country is shrouded in mystery. Our explorers are still gathering
          information about its wonders.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
        >
          Explore Other Countries
        </button>
      </div>
    );
  }

  const borderCountries = country.borders
    ? countries.filter((c) => country.borders.includes(c.cca3))
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-2 bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
      >
        ← Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="w-full aspect-[3/2] overflow-hidden shadow-md">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-6 text-veryDarkBlue dark:text-white">
            {country.name.common}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Native Name:</span>{" "}
                {Object.values(country.name.nativeName)[0].common}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.join(", ") || "N/A"}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(country.currencies || {})
                  .map((c) => c.name)
                  .join(", ") || "N/A"}
              </p>
              <p className="text-veryDarkBlue dark:text-white">
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages || {}).join(", ") || "N/A"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-veryDarkBlue dark:text-white">
              Border Countries:
            </h2>
            {borderCountries.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-4 py-1 bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white shadow-md rounded-sm text-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-veryDarkBlue dark:text-white italic">
                This country is an island of solitude, embraced by the vast
                oceans.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
