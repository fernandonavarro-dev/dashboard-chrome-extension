async function fetchImage() {
  try {
    const response = await fetch(
      'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
    );
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById('author').textContent = `By: ${data.user.name}`;
  } catch (error) {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById('author').textContent = `By: Dodi Achmad`;
  }
}

fetchImage();

async function fetchCryptoData() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/frax-share'
    );
    if (!res.ok) {
      throw Error('Something went wrong');
    }
    const data = await res.json();
    document.getElementById('crypto-top').innerHTML = `
      <div>
        <img src=${data.image.small} />
        <span>${data.name}</span>
      </div>
    `;
    document.getElementById('crypto-bottom').innerHTML += `
      <div>
        <p>Price: $${data.market_data.current_price.usd}</p>
        <p>24h: % ${data.market_data.price_change_percentage_24h_in_currency.usd}</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
  }
}

fetchCryptoData();

function getCurrentTime() {
  const date = new Date();
  document.getElementById('time').textContent = date.toLocaleTimeString(
    'en-us',
    { timeStyle: 'short' }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const res = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    );
    if (!res.ok) {
      throw Error('Weather data not available');
    }
    const data = await res.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather').innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
        <p class="weather-city">${data.name}</p>
                    `;
  } catch (err) {
    console.error(err);
  }
});
