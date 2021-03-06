const form = document.querySelector('form');
const languageToggle = document.querySelector('#languageToggle');

const roundNumber = (num, decimalPlaces = 1) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};

const formatTemperature = () => (languageToggle.checked ? 'F' : 'C');

const formatFeelsLike = temp =>
  languageToggle.checked
    ? `Feels like ${roundNumber(temp)} &deg;${formatTemperature()}`
    : `Sensação de ${roundNumber(temp)} &deg;${formatTemperature()}`;

const getWeather = async location => {
  const baseUrl = `/api/v1/weather?location=${location}`;
  const url = languageToggle.checked
    ? `${baseUrl}&units=imperial&language=en`
    : baseUrl;
  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    throw new Error('Location not found');
  }

  throw new Error('Unable to fetch weather');
};

form.addEventListener('submit', async e => {
  const result = document.querySelector('#result');
  try {
    e.preventDefault();

    result.innerHTML = 'Loading...';

    const location = document.querySelector('input#location').value;
    const response = await getWeather(location);

    result.innerHTML = `
      <p class="font-bold text-xl tex-stone-700">${response.name}</p>
      <div class="grid grid-rows-2 grid-cols-2 mt-8">
          <div class="grid">
            <img
              src=
              "http://openweathermap.org/img/w/${response.weather[0].icon}.png"
              alt="${response.weather[0].description}"
            />
            <h5 class="capitalize text-stone-600 justify-self-start">
              ${response.weather[0].description}
            </h5>
          </div>
          <div class="grid justify-items-center content-between justify-self-end">
            <h3 class="text-stone-800 text-3xl justify-self-end">
              ${roundNumber(response.main.temp)}&deg;${formatTemperature()}
            </h3>
            <p class="text-stone-600">
              ${formatFeelsLike(response.main.feels_like)}
            </p>
          </div>
        <div class="flex row-start-2 col-start-2 justify-self-end font-semibold">
          <h5 class="text-red-700">
            ${roundNumber(response.main.temp_max)}&deg;
          </h5>
          <h5 class="text-gray-400">/</h5>
          <h5 class="text-blue-500">
            ${roundNumber(response.main.temp_min)}&deg;
          </h5>
        </div>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `<p class="text-red-600">${error.message}</p>`;
  }
});
