document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeId = Number(urlParams.get("id"));
  
    let route = null;
  
    // Попробуем достать из localStorage
    const citiesData = JSON.parse(localStorage.getItem("citiesData")) || [];
    for (const city of citiesData) {
      route = city.guides.find(g => g.id === routeId);
      if (route) break;
    }

  
    if (!route) {
      document.body.innerHTML = "<p>Route not found :(</p>";
      return;
    }
  
    document.getElementById("route-title").textContent = route.title || "Untitled route";
  
    // Видео
    const video = document.getElementById("route-video");
    if (route.video) {
      video.querySelector('source').src = route.video;
      video.load();
    }
  
    // Аудио
    const audio = document.getElementById("route-audio");
    if (route.audio) {
      audio.querySelector('source').src = route.audio;
      audio.load();
    }
  
    // Галерея
    const galleryContainer = document.getElementById("route-gallery");
    (route.gallery || []).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Gallery image";
      galleryContainer.appendChild(img);
    });
  
    // Карта
    if (route.coords || (route.coordinates && route.coordinates.length > 0)) {
      const coords = route.coords || route.coordinates[0];
      const map = L.map("map").setView(coords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(map);
  
      if (route.coordinates && route.coordinates.length > 0) {
        route.coordinates.forEach(coord => {
          L.marker(coord).addTo(map);
        });
      } else {
        L.marker(coords).addTo(map).bindPopup(route.title || "Route").openPopup();
      }
    } else {
      document.getElementById("map").textContent = "No map data available.";
    }
  
    // Переключение темы
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  });
  
  