export async function initWeatherWidget(coords) {
  const apiKey = '04d0011f3e5a250a566ad3e26029c882';
  const [lat, lon] = coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    const data = await response.json();
    const tempEl = document.getElementById('temperature');
    const descEl = document.getElementById('description');
    tempEl.textContent = `${data.main.temp.toFixed(1)}°C`;
    descEl.textContent = data.weather[0].description;
  } catch (error) {
    console.error(error);
  }
}