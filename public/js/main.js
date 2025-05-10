import { initHistoryHandling } from '/public/js/history.js';
import { initThemeToggle } from '/public/js/theme.js';
import { Utils } from '/public/js/geolocation.js';
import { initScrollToTop } from '/public/js/scroll_to_top.js';

document.addEventListener('DOMContentLoaded', () => {

  // logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (localStorage.getItem('isAdmin') === 'true') {
    logoutBtn.style.display = 'block';
  }
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    location.reload();
  });

  // find nearest routes
  function findNearestRoutes() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const cities = JSON.parse(localStorage.getItem('citiesData')) || [];
        const routes = [];
        cities.forEach(city => {
          city.guides.forEach(guide => {
            const d = Utils.calculateDistance(userLat, userLon, guide.coords[0], guide.coords[1]);
            routes.push({ ...guide, distance: d });
          });
        });
        routes.sort((a, b) => a.distance - b.distance);
        alert("The nearest route is: " + routes[0].title + " (" + routes[0].distance.toFixed(2) + " km away).");
      }, (err) => {
        alert("Error " + err.message);
      });
    } else {
      alert("Geolocation API doesn't support this browser");
    }
  }

  const findNearbyBtn = document.getElementById('find-nearby');
  if (findNearbyBtn) {
    findNearbyBtn.addEventListener('click', findNearestRoutes);
  }

  // change theme
  initThemeToggle();

  // Scroll to Top
  initScrollToTop();

  // fade-in
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

  const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.section').forEach(section => {
    appearObserver.observe(section);
  });

  // scroll to section
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('.social-link svg').forEach(icon => {
    icon.style.transition = 'fill 0.3s ease';
    icon.addEventListener('mouseenter', () => {
      icon.style.fill = '#ff5722';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.fill = '';
    });
  });

  // history api
  initHistoryHandling();
});