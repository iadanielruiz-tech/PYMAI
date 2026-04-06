// Global Interactive Mouse Glow
document.addEventListener('DOMContentLoaded', () => {
  const glowEffect = document.getElementById('glow-effect');

  if (glowEffect) {
    document.addEventListener('mousemove', (e) => {
      // Usamos clientX y clientY porque el elemento tiene position: fixed
      glowEffect.style.left = `${e.clientX}px`;
      glowEffect.style.top = `${e.clientY}px`;
      glowEffect.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glowEffect.style.opacity = '0';
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    // Add staggered delay based on index
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Observe generic reveal elements
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 10, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(5, 5, 10, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
});
