document.addEventListener('DOMContentLoaded', () => {
  // Если в localStorage нет данных, инициализируем их
  function initializeDefaultData() {
    if (!localStorage.getItem('citiesData')) {
      const defaultCities = [
        {
          name: "Madrid",
          guides: [
            {
              id: 1,
              title: "Madrid Route 1",
              description: "Discover the vibrant center of Madrid with this walking tour.",
              duration: "2 hours",
              rating: "4.5",
              length: "5km",
              video: "https://www.youtube.com/watch?v=example1",
              image: "media/madrid1.jpg",
              coords: [40.4168, -3.7038]
            },
            {
              id: 2,
              title: "Madrid Route 2",
              description: "A tour around historic monuments and plazas.",
              duration: "3 hours",
              rating: "4.7",
              length: "6km",
              video: "https://www.youtube.com/watch?v=example2",
              image: "media/madrid2.jpg",
              coords: [40.4188, -3.7058]
            },
            {
              id: 3,
              title: "Madrid Route 3",
              description: "Explore museums and art galleries in Madrid.",
              duration: "1.5 hours",
              rating: "4.3",
              length: "4km",
              video: "https://www.youtube.com/watch?v=example3",
              image: "media/madrid3.jpg",
              coords: [40.4178, -3.7028]
            }
          ]
        },
        {
          name: "Prague",
          guides: [
            {
              id: 4,
              title: "Prague Route 1",
              description: "Walk through the charming Old Town of Prague.",
              duration: "2 hours",
              rating: "4.6",
              length: "5.5km",
              video: "https://www.youtube.com/watch?v=example4",
              image: "media/prague1.jpg",
              coords: [50.0755, 14.4378]
            },
            {
              id: 5,
              title: "Prague Route 2",
              description: "Tour the castle district and river views.",
              duration: "3.5 hours",
              rating: "4.8",
              length: "7km",
              video: "https://www.youtube.com/watch?v=example5",
              image: "media/prague2.jpg",
              coords: [50.0880, 14.4208]
            },
            {
              id: 6,
              title: "Prague Route 3",
              description: "Discover Prague's art and cultural hotspots.",
              duration: "2.5 hours",
              rating: "4.4",
              length: "5km",
              video: "https://www.youtube.com/watch?v=example6",
              image: "media/prague3.jpg",
              coords: [50.083, 14.431]
            }
          ]
        },
        {
          name: "Rome",
          guides: [
            {
              id: 7,
              title: "Rome Route 1",
              description: "Visit ancient Rome monuments on this insightful tour.",
              duration: "2 hours",
              rating: "4.7",
              length: "6km",
              video: "https://www.youtube.com/watch?v=example7",
              image: "media/rome1.jpg",
              coords: [41.9028, 12.4964]
            },
            {
              id: 8,
              title: "Rome Route 2",
              description: "Explore the Vatican and its surroundings.",
              duration: "3 hours",
              rating: "4.9",
              length: "4km",
              video: "https://www.youtube.com/watch?v=example8",
              image: "media/rome2.jpg",
              coords: [41.906, 12.453]
            },
            {
              id: 9,
              title: "Rome Route 3",
              description: "Stroll through Rome’s historic center and vibrant piazzas.",
              duration: "1.5 hours",
              rating: "4.5",
              length: "3.5km",
              video: "https://www.youtube.com/watch?v=example9",
              image: "media/rome3.jpg",
              coords: [41.900, 12.483]
            }
          ]
        }
      ];
      localStorage.setItem("citiesData", JSON.stringify(defaultCities));
    }
  }
  initializeDefaultData();

  const cityGroups = document.querySelector('.city-groups');

  const renderGuides = () => {
    cityGroups.innerHTML = '';
    const cities = JSON.parse(localStorage.getItem('citiesData')) || [];
    // Проверяем, что админ залогинен
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    cities.forEach((city, cityIndex) => {
      const cityGroup = document.createElement('div');
      cityGroup.className = 'city-group';

      const title = document.createElement('h3');
      title.className = 'city-title';
      title.textContent = city.name;
      cityGroup.appendChild(title);

      const guidesGrid = document.createElement('div');
      guidesGrid.className = 'city-guides';

      city.guides.forEach((guide, guideIndex) => {
        const card = document.createElement('article');
        card.className = 'guide-card';
        card.innerHTML = `
          <img src="${guide.image}" alt="${guide.title}" class="guide-image">
          <div class="guide-content">
            <h3>${guide.title}</h3>
            <p class="guide-description">${guide.description}</p>
            <div class="guide-meta">
              <span class="guide-rating">★ ${guide.rating}</span>
              <span class="guide-duration">${guide.duration}</span>
              <span class="guide-length">${guide.length}</span>
            </div>
            <a href="route_detail.html?id=${guide.id}" class="btn">Detail</a>
            ${isAdmin ? `<button class="btn edit-btn" data-city-index="${cityIndex}" data-guide-index="${guideIndex}">Edit</button>` : ''}
          </div>
        `;
        guidesGrid.appendChild(card);
      });

      cityGroup.appendChild(guidesGrid);

      if (cities.length > 1 && cityIndex < cities.length - 1) {
        const divider = document.createElement('hr');
        divider.className = 'divider';
        cityGroup.appendChild(divider);
      }

      cityGroups.appendChild(cityGroup);
    });
  };

  // Функция для показа модального окна редактирования
  function showEditModal(cityIndex, guideIndex) {
    const cities = JSON.parse(localStorage.getItem('citiesData')) || [];
    const guide = cities[cityIndex].guides[guideIndex];

    const modal = document.createElement('div');
    modal.id = 'edit-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Edit Guide</h2>
        <form id="edit-form">
          <label>
            Title:
            <input type="text" name="title" value="${guide.title}" required>
          </label>
          <label>
            Description:
            <textarea name="description" required>${guide.description}</textarea>
          </label>
          <label>
            Duration:
            <input type="text" name="duration" value="${guide.duration}">
          </label>
          <label>
            Rating:
            <input type="text" name="rating" value="${guide.rating}">
          </label>
          <label>
            Length:
            <input type="text" name="length" value="${guide.length}">
          </label>
          <label>
            Video (YouTube Link):
            <input type="url" name="video" value="${guide.video}" required>
          </label>
          <div class="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" id="cancel-edit">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('cancel-edit').addEventListener('click', () => {
      modal.remove();
    });

    document.getElementById('edit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      guide.title = formData.get('title');
      guide.description = formData.get('description');
      guide.duration = formData.get('duration');
      guide.rating = formData.get('rating');
      guide.length = formData.get('length');
      guide.video = formData.get('video');
      cities[cityIndex].guides[guideIndex] = guide;
      localStorage.setItem('citiesData', JSON.stringify(cities));
      renderGuides();
      modal.remove();
    });
  }

  // Делегирование клика для кнопки Edit
  cityGroups.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const cityIndex = +e.target.dataset.cityIndex;
      const guideIndex = +e.target.dataset.guideIndex;
      showEditModal(cityIndex, guideIndex);
    }
  });

  // Если администратор залогинен, показываем кнопку Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (localStorage.getItem('isAdmin') === 'true') {
    logoutBtn.style.display = 'block';
  }
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    location.reload();
  });

  const initApp = () => {
    renderGuides();

    const themeSelect = document.getElementById('theme');
    themeSelect.addEventListener('change', (e) => {
      document.body.className = e.target.value;
      localStorage.setItem('theme', e.target.value);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    themeSelect.value = savedTheme;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  };

  initApp();
});