document.addEventListener('DOMContentLoaded', () => {
  const renderGuides = () => {
    const guideGrid = document.querySelector('.guides-grid');
    const guides = [
      { 
        id: 1, 
        title: 'Historické centrum', 
        image: '/public/images/karluv_most.jpg',
        description: 'Prohlídka Staroměstského náměstí a Karlova mostu',
        duration: '2 hodiny',
        rating: '4.8',
        length: '2 km'
      },
    ];

    guides.forEach(guide => {
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
          <a href="/guide/${guide.id}" class="btn">Detail</a>
        </div>
      `;
      guideGrid.appendChild(card);
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