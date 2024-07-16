export default function Filter({
  selectedRegion,
  setSelectedRegion,
  countries,
}) {
  const regions = [...new Set(countries.map((country) => country.region))];

  return (
    <div className="w-full md:w-48">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="w-full p-4 rounded-md shadow-md bg-white dark:bg-darkBlue text-veryDarkBlue dark:text-white focus:outline-none"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
