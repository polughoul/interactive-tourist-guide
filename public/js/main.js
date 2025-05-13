import { initHistoryHandling } from './utils/history.js';
import { initThemeToggle } from './utils/theme.js';
import { Utils } from './utils/geolocation.js';
import { initScrollToTop } from './utils/scroll_to_top.js';

document.addEventListener('DOMContentLoaded', () => {

  // logout button for admin
  const logoutBtn = document.getElementById('logout-btn');
  if (localStorage.getItem('isAdmin') === 'true') {
    logoutBtn.style.display = 'block';
  }
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    location.reload();
  });

  // find the nearest route using the browser's geolocation API.
  function findNearestRoutes() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const cities = JSON.parse(localStorage.getItem('citiesData')) || [];
        const routes = [];
        // Calculate distance for each guide using a utility function.
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

  // Observer to update active navigation link as sections come into view.
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

  // Observer for fading in content sections.
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

  // scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // add hover effect to social media icons.
  document.querySelectorAll('.social-link svg').forEach(icon => {
    icon.style.transition = 'fill 0.3s ease';
    icon.addEventListener('mouseenter', () => {
      icon.style.fill = '#ff5722';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.fill = '';
    });
  });
  initHistoryHandling();
});