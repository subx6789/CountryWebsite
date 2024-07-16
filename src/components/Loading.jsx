export default function Loading() {
  return (
    <div className="w-full h-screen bg-veryLightGray dark:bg-veryDarkBlue flex flex-col items-center justify-center">
      <i className="fa-solid fa-location-crosshairs fa-spin text-4xl text-veryDarkBlue dark:text-white mb-4"></i>
      <p className="text-veryDarkBlue dark:text-white text-lg font-semibold">
        Exploring the world...
      </p>
    </div>
  );
}
