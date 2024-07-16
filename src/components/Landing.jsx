import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Cards from "./Cards";
import { useApiCache } from "../hooks/useApiCache";
import Loading from "./Loading";

export default function Landing() {
  const {
    data: countries,
    loading,
    error,
  } = useApiCache("https://restcountries.com/v3.1/all");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter(
        (country) =>
          (country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            country.capital?.[0]
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (selectedRegion === "" || country.region === selectedRegion)
      );
      setFilteredCountries(filtered);
      setVisibleCount(8);
    }
  }, [searchTerm, selectedRegion, countries]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          countries={countries}
        />
      </div>
      <Cards countries={filteredCountries.slice(0, visibleCount)} />
      {visibleCount < filteredCountries.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
