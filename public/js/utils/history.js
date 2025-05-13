// Initializes history navigation with smooth scrolling and URL state management.
export function initHistoryHandling() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState({ section: targetId }, '', targetId);
      }
    });
  });
  
  // Handle popstate events (back/forward navigation).
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
      const target = document.querySelector(event.state.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}