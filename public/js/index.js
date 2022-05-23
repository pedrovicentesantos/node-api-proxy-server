const form = document.querySelector('form');

const getWeather = async location => {
  const response = await fetch(`/api/v1/weather?location=${location}`);

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

    const location = document.querySelector('input').value;
    const response = await getWeather(location);

    result.innerHTML = `
      <div>
        <h5 class="white-text">${response.weather[0].description}</h5>
        <p class="white-text">${response.main.temp}</p>
      </div>
    `;
  } catch (error) {
    console.log(error.message);
    result.innerHTML = `<p>${error.message}</p>`;
  }
});
