/* 
=========================================
  PROFESSIONAL DEVELOPER PORTFOLIO JS
  INTERACTION & ANIMATION ENGINE
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {

  const htmlElement = document.documentElement;

  // ==================== THEME MANAGEMENT ====================
  const themeToggle = document.getElementById('themeToggle');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return 'dark';
  };

  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  setTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });


  // ==================== MOBILE MENU ====================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });


  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.querySelector('.header');
  const handleScroll = () => {
    header.classList.toggle('header-active', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();


  // ==================== SCROLL REVEAL ====================
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ==================== ACTIVE NAV TRACKING ====================
  const sections = document.querySelectorAll('section');
  const handleActiveNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', handleActiveNav);
  handleActiveNav();


  // ==================== CONTACT FORM → WHATSAPP ====================
  const WHATSAPP_NUMBER = '201092084954';
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const showStatus = (text, type) => {
    formStatus.innerText = text;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    setTimeout(() => {
      formStatus.style.opacity = '0';
      formStatus.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.style.opacity = '1';
      }, 500);
    }, 5000);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      showStatus('Please complete all form fields.', 'error');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please provide a valid email address.', 'error');
      return;
    }

    // Build the WhatsApp message
    const whatsappMessage = 
      `📩 *New Portfolio Message*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📌 *Subject:* ${subject}\n\n` +
      `💬 *Message:*\n${message}`;

    // Encode and open WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');

    // Show success and reset
    showStatus('Redirecting to WhatsApp...', 'success');
    contactForm.reset();
  });
});
