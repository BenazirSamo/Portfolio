
(function() {
  // THEME TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  const toggleOptions = themeToggle.querySelectorAll('.toggle-option');
  const htmlElement = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') htmlElement.setAttribute('data-theme', 'dark');
    else htmlElement.removeAttribute('data-theme');
    toggleOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.themeValue === theme);
    });
    try { localStorage.setItem('theme', theme); } catch(e) {}
  }

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('theme') || 'light'; } catch(e) {}
  setTheme(savedTheme);

  toggleOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      setTheme(opt.dataset.themeValue);
    });
  });

  // TYPEWRITER
  const typedEl = document.getElementById('typed');
  const roles = ['Full Stack Apps', 'Beautiful UIs', 'Scalable Backends', 'Modern Websites'];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 90);
  }
  setTimeout(type, 1200);

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
        const idx = siblings.indexOf(entry.target);
        const delay = idx >= 0 ? idx * 0.08 : 0;
        setTimeout(() => entry.target.classList.add('active'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));

  // NAVBAR SCROLL
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ACTIVE NAV LINK
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // CLOSE MOBILE MENU
  const navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });

  // 3D TILT
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.project-card, .expertise-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -4;
        const rotY = ((x - cx) / cx) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // MAGNETIC BUTTONS
    document.querySelectorAll('.btn-live, .btn-hero-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-4px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'none'; });
    });
  }
})();
