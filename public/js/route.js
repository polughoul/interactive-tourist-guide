function initializeGallerySlider(imagesArray) {
  const sliderTrack = document.getElementById('gallery-slider');
  if (!sliderTrack) return;

  // Если массив пустой, можно задать дефолтный набор изображений
  const images = (imagesArray && imagesArray.length > 0) ? imagesArray : [
    '/public/images/madrid1.jpg',
    '/public/images/madrid2.jpg',
    '/public/images/madrid3.jpg'
  ];

  // Очистка трека и создание слайдов для данного маршрута
  sliderTrack.innerHTML = '';
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Gallery image";
    sliderTrack.appendChild(img);
  });

  let currentIndex = 0;
  const slides = Array.from(sliderTrack.querySelectorAll('img'));

  const updateSlider = () => {
    const slideWidth = sliderTrack.clientWidth;
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
  }
  
  window.addEventListener('resize', updateSlider);
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeId = Number(urlParams.get("id"));
  
    let route = null;
  
    // localStorage
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
    const galleryContainer = document.getElementById("route-gallery");
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
    } else {
      document.getElementById("map").textContent = "No map data available.";
    }
  
    // them toggle
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    document.querySelectorAll('.social-link svg').forEach(icon => {
      icon.style.transition = 'fill 0.3s ease';
      icon.addEventListener('mouseenter', () => {
        icon.style.fill = '#ff5722'; // новый цвет при наведении
      });
      icon.addEventListener('mouseleave', () => {
        icon.style.fill = ''; // вернуться к исходному значению
      });
    });
        // После настройки карты, перед завершающим вызовом инициализации других функций:
    const imagesForSlider = (route.gallery && route.gallery.length > 0) ? route.gallery : null;
    initializeGallerySlider(imagesForSlider);
  });
  
  