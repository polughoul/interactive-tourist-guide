export async function initLocalRecommendations(coords) {
  const apiKey = 'fsq3ZJ3ySqdyRQtt1HtQiMI0UeKPopHp0BLlrU05y06TYr4='; 
  const [lat, lon] = coords;

  // Helper function to fetch recommendations for a specific category within a given radius.
  async function fetchRecommendations(category, radius) {
    const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=${radius}&categories=${category}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': apiKey,
        'Accept-Language': 'en'
      }
    });
    if (!response.ok) {
      throw new Error('Local Recommendations API error');
    }
    return response.json();
  }
  
  try {
    // Fetch local cafes (category 13065, within 500 m)
    const cafesData = await fetchRecommendations('13065', 500);
    const cafesListEl = document.querySelector('.cafes-list');
    if (cafesListEl) {
      cafesListEl.innerHTML = '';
      cafesData.results.forEach(place => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${place.name}</strong> – ${place.location.address || ''}`;
        cafesListEl.appendChild(li);
      });
    }
    
    // Fetch nearby museums (category 10027, within 1000 m)
    const museumsData = await fetchRecommendations('10027', 1000);
    const museumsListEl = document.querySelector('.museums-list');
    if (museumsListEl) {
      museumsListEl.innerHTML = '';
      museumsData.results.forEach(place => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${place.name}</strong> – ${place.location.address || ''}`;
        museumsListEl.appendChild(li);
      });
    }
  } catch (error) {
    console.error(error);
  }
}