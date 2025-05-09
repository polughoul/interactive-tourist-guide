document.addEventListener('DOMContentLoaded', () => {
  
  // Кнопка Logout для администратора
  const logoutBtn = document.getElementById('logout-btn');
  if (localStorage.getItem('isAdmin') === 'true') {
    logoutBtn.style.display = 'block';
  }
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    location.reload();
  });

  // Функция расчёта расстояния между двумя координатами (Хаверсайн)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
          Math.cos(lat1 * Math.PI / 180) *
          Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Функция поиска ближайших маршрутов
  function findNearestRoutes() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const cities = JSON.parse(localStorage.getItem('citiesData')) || [];
        const routes = [];
        cities.forEach(city => {
          city.guides.forEach(guide => {
            const d = calculateDistance(userLat, userLon, guide.coords[0], guide.coords[1]);
            routes.push({ ...guide, distance: d });
          });
        });
        routes.sort((a, b) => a.distance - b.distance);
        alert("The nearest route is: " + routes[0].title + " (" + routes[0].distance.toFixed(2) + " km away).");
      }, (err) => {
        alert("Error " + err.message);
      });
    } else {
      alert("Geolocation API don't support this browser");
    }
  }

  // Привязываем событие к кнопке "Найти ближайшие маршруты"
  const findNearbyBtn = document.getElementById('find-nearby');
  if (findNearbyBtn) {
    findNearbyBtn.addEventListener('click', findNearestRoutes);
  }
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

    // Кнопка Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const initApp = () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Добавление динамического эффекта для SVG-иконок в футере
    document.querySelectorAll('.social-link svg').forEach(icon => {
      icon.style.transition = 'fill 0.3s ease';
      icon.addEventListener('mouseenter', () => {
        icon.style.fill = '#ff5722'; // новый цвет при наведении
      });
      icon.addEventListener('mouseleave', () => {
        icon.style.fill = ''; // вернуться к исходному значению
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 }); 
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  };

  const sections = document.querySelectorAll('.section');
  const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    appearObserver.observe(section);
  });

  initApp();
});