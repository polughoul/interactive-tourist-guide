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
              image: "/public/images/madrid1.jpg",
              coords: [40.4168, -3.7038],
              gallery:
                [
                  "/public/images/madrid_slider1.jpg",
                  "/public/images/madrid_slider2.jpg",
                  "/public/images/madrid_slider3.jpg"
                ]
            },
            {
              id: 2,
              title: "Madrid Route 2",
              description: "A tour around historic monuments and plazas.",
              duration: "3 hours",
              rating: "4.7",
              length: "6km",
              video: "https://www.youtube.com/watch?v=example2",
              image: "/public/images/madrid2.jpg",
              coords: [40.4188, -3.7058],
              gallery:
                [
                  "/public/images/madrid_slider4.jpg",
                  "/public/images/madrid_slider5.jpg",
                  "/public/images/madrid_slider6.jpg"
                ] 
            },
            {
              id: 3,
              title: "Madrid Route 3",
              description: "Explore museums and art galleries in Madrid.",
              duration: "1.5 hours",
              rating: "4.3",
              length: "4km",
              video: "https://www.youtube.com/watch?v=example3",
              image: "/public/images/madrid3.jpg",
              coords: [40.4178, -3.7028],
              gallery:
                [
                  "/public/images/madrid_slider7.jpg",
                  "/public/images/madrid_slider8.jpg",
                  "/public/images/madrid_slider9.jpg"
                ]
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
              image: "/public/images/prague1.jpg",
              coords: [50.0755, 14.4378],
              gallery:
                [
                  "/public/images/prague_slider1.jpg",
                  "/public/images/prague_slider2.jpg",
                  "/public/images/prague_slider3.jpg"
                ]
            },
            {
              id: 5,
              title: "Prague Route 2",
              description: "Tour the castle district and river views.",
              duration: "3.5 hours",
              rating: "4.8",
              length: "7km",
              video: "https://www.youtube.com/watch?v=example5",
              image: "/public/images/prague2.jpg",
              coords: [50.0880, 14.4208],
              gallery:
                [
                  "/public/images/prague_slider4.jpg",
                  "/public/images/prague_slider5.jpg",
                  "/public/images/prague_slider6.jpg"
                ]
            },
            {
              id: 6,
              title: "Prague Route 3",
              description: "Discover Prague's art and cultural hotspots.",
              duration: "2.5 hours",
              rating: "4.4",
              length: "5km",
              video: "https://www.youtube.com/watch?v=example6",
              image: "/public/images/prague3.jpg",
              coords: [50.083, 14.431],
              gallery:
                [
                  "/public/images/prague_slider7.jpg",
                  "/public/images/prague_slider8.jpg",
                  "/public/images/prague_slider9.jpg"
                ]
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
              image: "/public/images/rome1.jpg",
              coords: [41.9028, 12.4964],
              gallery:
                [
                  "/public/images/rome_slider1.jpg",
                  "/public/images/rome_slider2.jpg",
                  "/public/images/rome_slider3.jpg"
                ]
            },
            {
              id: 8,
              title: "Rome Route 2",
              description: "Explore the Vatican and its surroundings.",
              duration: "3 hours",
              rating: "4.9",
              length: "4km",
              video: "https://www.youtube.com/watch?v=example8",
              image: "/public/images/rome2.jpg",
              coords: [41.906, 12.453],
              gallery:
                [
                  "/public/images/rome_slider4.jpg",
                  "/public/images/rome_slider5.jpg",
                  "/public/images/rome_slider6.jpg"
                ]
            },
            {
              id: 9,
              title: "Rome Route 3",
              description: "Stroll through Rome’s historic center and vibrant piazzas.",
              duration: "1.5 hours",
              rating: "4.5",
              length: "3.5km",
              video: "https://www.youtube.com/watch?v=example9",
              image: "/public/images/rome3.jpg",
              coords: [41.900, 12.483],
              gallery:
                [
                  "/public/images/rome_slider7.jpg",
                  "/public/images/rome_slider8.jpg",
                  "/public/images/rome_slider9.jpg"
                ]
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
      guidesGrid.setAttribute('data-city-index', cityIndex);

      city.guides.forEach((guide, guideIndex) => {
        const card = document.createElement('article');
        card.className = 'guide-card';
        card.setAttribute('data-guide-id', guide.id);
        card.innerHTML = `
          <div class="guide-image-wrapper">
            <img src="${guide.image}" alt="${guide.title}" class="guide-image">
          </div>
          <div class="guide-content">
            <h3>${guide.title}</h3>
            <p class="guide-description">${guide.description}</p>
            <div class="guide-meta">
              <span class="guide-rating">★ ${guide.rating}</span>
              <span class="guide-duration">${guide.duration}</span>
              <span class="guide-length">${guide.length}</span>
            </div>
            <a href="route_detail.html?id=${guide.id}" class="btn detail-btn">Detail</a>
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
          <label>
            Image:
            <input type="file" name="image" accept="image/*" onchange="previewImage(event)">
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
      const fileInput = e.target.querySelector('input[name="image"]');
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          guide.image = event.target.result; // base64
          cities[cityIndex].guides[guideIndex] = guide;
          localStorage.setItem('citiesData', JSON.stringify(cities)); 
          renderGuides();
          modal.remove();
        };
        reader.readAsDataURL(file)
      } else{
        cities[cityIndex].guides[guideIndex] = guide;
        localStorage.setItem('citiesData', JSON.stringify(cities));
        renderGuides();
        modal.remove();
      }
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
    renderGuides();
    initCardDragAndDrop();

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

  function initCardDragAndDrop() {
    // Для каждого контейнера с карточками маршрутов
    const cityGuidesContainers = document.querySelectorAll('.city-guides');
    cityGuidesContainers.forEach(container => {
      let draggingEl = null;
      
      // Сделать каждую карточку перетаскиваемой
      Array.from(container.children).forEach(card => {
        card.setAttribute('draggable', true);
        
        card.addEventListener('dragstart', (e) => {
          draggingEl = card;
          card.style.opacity = '0.5';
          e.dataTransfer.effectAllowed = 'move';
        });
        
        card.addEventListener('dragend', () => {
          card.style.opacity = '1';
          draggingEl = null;
          // Если нужно, можно сохранить новый порядок в localStorage здесь
        });
        
        card.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        });
        
        card.addEventListener('drop', (e) => {
          e.preventDefault();
          if (draggingEl && draggingEl !== card) {
            // Определяем индексы карточек в контейнере
            const cardsArray = Array.from(container.children);
            const draggingIndex = cardsArray.indexOf(draggingEl);
            const dropIndex = cardsArray.indexOf(card);
            if (draggingIndex < dropIndex) {
              container.insertBefore(draggingEl, card.nextSibling);
            } else {
              container.insertBefore(draggingEl, card);
            }
            // Сохраняем новый порядок в localStorage
            const cityIndex = container.getAttribute('data-city-index');
            if (cityIndex !== null) {
              const newOrder = Array.from(container.children).map(item => item.getAttribute('data-guide-id'));
              const cities = JSON.parse(localStorage.getItem('citiesData'));
              const city = cities[cityIndex];
              const newGuides = [];
              newOrder.forEach(id => {
                const guide = city.guides.find(g => String(g.id) === id);
                if (guide) newGuides.push(guide);
              });
              city.guides = newGuides;
              cities[cityIndex] = city;
              localStorage.setItem('citiesData', JSON.stringify(cities));
            }
          }
        });
      });
    });
  }

  initApp();
});