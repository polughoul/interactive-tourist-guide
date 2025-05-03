document.addEventListener('DOMContentLoaded', () => {
  const renderGuides = () => {
    const cityGroups = document.querySelector('.city-groups');
    const cities = [
      {
        name: "Praha",
        guides: [
          { 
            id: 1, 
            title: 'Historické centrum', 
            image: '/public/images/karluv_most.jpg',
            description: 'Prohlídka Staroměstského náměstí a Karlova mostu',
            duration: '2 hodiny',
            rating: '4.8',
            length: '2 km'
          },
          {
            id: 2,
            title: 'Pražský hrad',
            image: '/public/images/prazsky_hrad.jpg',
            description: 'Prohlídka katedrály sv. Víta a Starého královského paláce',
            duration: '3 hodiny',
            rating: '4.9',
            length: '3 km'
          }
        ]
      },
      {
        name: "Brno",
        guides: [
        ]
      },
      {
        name: "atd",
        guides: [
        ]
      }
    ];
  
    cities.forEach((city, index) => {
      const cityGroup = document.createElement('div');
      cityGroup.className = 'city-group';
  
      const title = document.createElement('h3');
      title.className = 'city-title';
      title.textContent = city.name;
      cityGroup.appendChild(title);

      const guidesGrid = document.createElement('div');
      guidesGrid.className = 'city-guides';
 
      city.guides.forEach(guide => {
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
          </div>
        `;
        guidesGrid.appendChild(card);
      });
      cityGroup.appendChild(guidesGrid);

      if (index < cities.length - 1) {
        const divider = document.createElement('hr');
        divider.className = 'divider';
        cityGroup.appendChild(divider);
      }
      cityGroups.appendChild(cityGroup);
    });
  }

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
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
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
  }
  initApp();
});