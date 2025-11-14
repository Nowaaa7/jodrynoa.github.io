// Main JS: subtle interactions and reveal on scroll (pro style)

// Wait DOM
document.addEventListener('DOMContentLoaded', function(){
    // set year in footers
    const y = new Date().getFullYear();
    ['year','yearCV','yearPortfolio'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.textContent = y;
    });
  
   // Navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    // 💡 On n'active l'effet de scroll QUE si on n'est PAS sur une page "body-light"
    if (navbar && !document.body.classList.contains('body-light')) {
      function onScrollNav(){
        if(window.scrollY > 30) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }
      onScrollNav();
      window.addEventListener('scroll', onScrollNav);
    }
    // IntersectionObserver for reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    reveals.forEach(r => obs.observe(r));
  
    // Back to top buttons
    function setupBackToTop(btnId){
      const btn = document.getElementById(btnId);
      if(!btn) return;
      window.addEventListener('scroll', () => {
        if(window.scrollY > 300) btn.style.display = 'flex';
        else btn.style.display = 'none';
      });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    setupBackToTop('backToTop');
    setupBackToTop('backToTop2');
    setupBackToTop('backToTop3');
  
    // Small accessible focus outlines for keyboard users
    document.body.addEventListener('keydown', (e) => {
      if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
    });
  
    // Reduce motion respect (prefers-reduced-motion)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mq && mq.matches){
      // disable animations
      document.querySelectorAll('.reveal').forEach(n => n.classList.add('visible'));
      document.querySelectorAll('.hover-raise').forEach(n => n.style.transition = 'none');
    }
  });
  
