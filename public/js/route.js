import Slider from './utils/slider.js';
import { initScrollToTop } from './utils/scroll_to_top.js';  
import { initWeatherWidget } from './utils/weather_widget.js';  
import { initLocalRecommendations } from './utils/local_recommendations.js';

// Function to check real internet connectivity using a request to a CORS-enabled API. 
// I tried to use navigator.online to check the status, but for some reason it didn't work correctly. 
function checkInternetConnection(timeout = 5000) {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Using an API that allows cross-domain requests
    fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET', signal })
      .then(() => resolve(true))
      .catch(() => resolve(false));
    setTimeout(() => {
      controller.abort();
      resolve(false);
    }, timeout);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Extract route id from the URL parameters.
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = Number(urlParams.get("id"));

  let route = null;
  const citiesData = JSON.parse(localStorage.getItem("citiesData")) || [];
  // Find the route in the cities data.
  for (const city of citiesData) {
    route = city.guides.find(g => g.id === routeId);
    if (route) break;
  }
  if (!route) {
    document.body.innerHTML = "<p>Route not found :(</p>";
    return;
  }

  // Set the route title on the page.
  document.getElementById("route-title").textContent = route.title || "Untitled route";

  // Check for internet connectivity.
  checkInternetConnection().then(isConnected => {
    console.log("Internet connection:", isConnected);

    // VIDEO
    const video = document.getElementById("route-video");
    if (route.video) {
      if (isConnected) {
        if (route.video.includes("youtube.com") || route.video.includes("youtu.be")) {
          const iframe = document.createElement("iframe");
          iframe.width = video.offsetWidth;
          iframe.height = video.offsetHeight;
          iframe.src = route.video.replace("watch?v=", "embed/");
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          video.parentNode.replaceChild(iframe, video);
        } else {
          video.querySelector('source').src = route.video;
          video.load();
        }
      } else {
        const videoContainer = video.parentNode;
        videoContainer.innerHTML = `<p style="padding:1rem; background:#f8d7da; color:#721c24; text-align:center;">
        No internet connection, video unavailable.</p>`;
      }
    }

    // AUDIO
    const audio = document.getElementById("route-audio");
    if (route.audio) {
      if (isConnected) {
        audio.querySelector('source').src = route.audio;
        audio.load();
      } else {
        const audioContainer = audio.parentNode;
        audioContainer.innerHTML = `<p style="padding:1rem; background:#f8d7da; color:#721c24; text-align:center;">
        No internet connection, audio guide unavailable.</p>`;
      }
    }

    // SLIDER
    const galleryContainer = document.getElementById("gallery-slider");
    if (galleryContainer) {
      (route.gallery || []).forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Gallery image";
        galleryContainer.appendChild(img);
      });
    }

    // MAP
    if (route.coords || (route.coordinates && route.coordinates.length > 0)) {
      const coords = route.coords || route.coordinates[0];
      if (isConnected) {
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
        document.getElementById("map").innerHTML = `<p style="padding:1rem; background:#f8d7da; color:#721c24; text-align:center;">
        No internet connection, map unavailable.</p>`;
      }
    } else {
      document.getElementById("map").textContent = "No map data available.";
    }

    // WEATHER 
    if (isConnected) {
      if (route.coords || (route.coordinates && route.coordinates.length > 0)) {
        const coords = route.coords || route.coordinates[0];
        initWeatherWidget(coords);
      }
    } else {
      const tempEl = document.getElementById('temperature');
      const descEl = document.getElementById('description');
      tempEl.textContent = "No connection";
      descEl.textContent = "Weather data unavailable";
    }

    // LOCAL RECOMMENDATIONS
    if (isConnected) {
      if (route.coords || (route.coordinates && route.coordinates.length > 0)) {
        const coords = route.coords || route.coordinates[0];
        initLocalRecommendations(coords);
      }
    } else {
      const cafesListEl = document.querySelector('.cafes-list');
      const museumsListEl = document.querySelector('.museums-list');
      if (cafesListEl) cafesListEl.innerHTML = `<li style="color:#721c24;">No connection, data unavailable</li>`;
      if (museumsListEl) museumsListEl.innerHTML = `<li style="color:#721c24;">No connection, data unavailable</li>`;
    }

    // Theme toggle 
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    initScrollToTop();

    // Add hover effects to social icons.
    document.querySelectorAll('.social-link svg').forEach(icon => {
      icon.style.transition = 'fill 0.3s ease';
      icon.addEventListener('mouseenter', () => {
        icon.style.fill = '#ff5722';
      });
      icon.addEventListener('mouseleave', () => {
        icon.style.fill = '';
      });
    });

    // Initialize the slider.
    new Slider('#gallery-slider', '.slider-btn.prev', '.slider-btn.next');
  });
});
  
  