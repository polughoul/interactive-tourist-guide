const ROUTES = {
    "1": {
      title: "route 1",
      coords: [14.9386, 54.3141],
      video: "media/route1.mp4",
      audio: "media/route1.mp3",
      gallery: [
        "media/photo1.jpg",
        "media/photo2.jpg",
        "media/photo3.jpg"
      ]
    },
    "2": {
      title: "route 2",
      coords: [13.6028, 12.7342],
      video: "media/route2.mp4",
      audio: "media/route2.mp3",
      gallery: [
        "media/photo4.jpg",
        "media/photo5.jpg",
        "media/photo6.jpg"
      ]
    }
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get("id");
  const route = ROUTES[routeId];
  
  if (!route) {
    document.body.innerHTML = "<p>Route not found(</p>";
  } else {
    document.getElementById("route-title").textContent = route.title;
    document.getElementById("route-video").src = route.video;
    document.getElementById("route-audio").src = route.audio;
  
    const galleryContainer = document.getElementById("route-gallery");
    route.gallery.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      galleryContainer.appendChild(img);
    });
  
    const map = L.map("map").setView(route.coords, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map);
    L.marker(route.coords).addTo(map).bindPopup(route.title).openPopup();
  }
  
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  