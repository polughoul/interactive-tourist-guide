import Slider from '/public/js/slider.js';
import { initScrollToTop } from '/public/js/scroll_to_top.js';  
import { initWeatherWidget } from '/public/js/weather_widget.js';  
import { initLocalRecommendations } from '/public/js/local_recommendations.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = Number(urlParams.get("id"));
  
  let route = null;
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
  
  // video
  const video = document.getElementById("route-video");
  if (route.video) {
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
  }
  
  // aUDIO
  const audio = document.getElementById("route-audio");
  if (route.audio) {
    audio.querySelector('source').src = route.audio;
    audio.load();
  }
  
  // Galery
  const galleryContainer = document.getElementById("gallery-slider");
  if (galleryContainer) {
    (route.gallery || []).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Gallery image";
      galleryContainer.appendChild(img);
    });
  }
  
  // Map
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
    initWeatherWidget(coords);
    initLocalRecommendations(coords);
  } else {
    document.getElementById("map").textContent = "No map data available.";
  }
  
  // theme toggle
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  initScrollToTop();
  
  document.querySelectorAll('.social-link svg').forEach(icon => {
    icon.style.transition = 'fill 0.3s ease';
    icon.addEventListener('mouseenter', () => {
      icon.style.fill = '#ff5722';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.fill = '';
    });
  });
  
  // initialize slider
  new Slider('#gallery-slider', '.slider-btn.prev', '.slider-btn.next');
});
  
  