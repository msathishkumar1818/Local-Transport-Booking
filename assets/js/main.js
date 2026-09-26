/**
 * LOCAL TRANSPORT BOOKING - SHARED GLOBAL JAVASCRIPT
 * Strictly externalized logic for header, mobile drawer, RTL, Dark Mode (#000000),
 * click-only dropdowns, modal authentication, and smooth accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Branded Loader
  const loader = document.getElementById('siteLoader');
  window.addEventListener('load', () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 350);
    }
  });
  // Fallback in case load already fired
  if (loader && document.readyState === 'complete') {
    loader.classList.add('hidden');
  }

  // 2. Dark Mode Toggle (#000000)
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('site_theme') || 'light';
  applyTheme(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('site_theme', newTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
      themeToggles.forEach(b => {
        b.setAttribute('aria-label', 'Switch to light mode');
        b.innerHTML = `<span class="theme-icon-wrap" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span>`;
      });
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
      themeToggles.forEach(b => {
        b.setAttribute('aria-label', 'Switch to dark mode');
        b.innerHTML = `<span class="theme-icon-wrap" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>`;
      });
    }
  }

  // 3. RTL / LTR Direction Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('site_dir') || 'ltr';
  applyDir(savedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDir(newDir);
      localStorage.setItem('site_dir', newDir);
    });
  });

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    rtlToggles.forEach(b => {
      const isRtl = dir === 'rtl';
      b.innerHTML = `<span class="ctrl-icon-dot ${isRtl ? 'active' : ''}"></span><span class="rtl-text-label">${isRtl ? 'LTR' : 'RTL'}</span>`;
      b.setAttribute('aria-label', `Switch to ${isRtl ? 'LTR' : 'RTL'} text direction`);
    });
  }

  // 4. Desktop Home Dropdown - CLICK ONLY (Never Hover)
  const homeDropdownToggle = document.getElementById('homeDropdownToggle');
  const homeDropdownMenu = document.getElementById('homeDropdownMenu');

  if (homeDropdownToggle && homeDropdownMenu) {
    homeDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = homeDropdownMenu.classList.contains('active');
      if (isOpen) {
        closeHomeDropdown();
      } else {
        openHomeDropdown();
      }
    });

    document.addEventListener('click', (e) => {
      if (!homeDropdownToggle.contains(e.target) && !homeDropdownMenu.contains(e.target)) {
        closeHomeDropdown();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeHomeDropdown();
    });
  }

  function openHomeDropdown() {
    if (homeDropdownMenu && homeDropdownToggle) {
      homeDropdownMenu.classList.add('active');
      homeDropdownToggle.classList.add('open');
      homeDropdownToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeHomeDropdown() {
    if (homeDropdownMenu && homeDropdownToggle) {
      homeDropdownMenu.classList.remove('active');
      homeDropdownToggle.classList.remove('open');
      homeDropdownToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // 5. Mobile Drawer Menu & Hamburger / Close (Into Mark) Toggle
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileAccordionToggle = document.getElementById('mobileHomeAccordion');
  const mobileAccordionMenu = document.getElementById('mobileHomeSubmenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-accordion-toggle), .mobile-accordion-menu a');

  function closeMobileAccordion() {
    if (mobileAccordionMenu) {
      mobileAccordionMenu.classList.remove('open');
    }
    if (mobileAccordionToggle) {
      mobileAccordionToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function openMobileDrawer() {
    closeMobileAccordion(); // ALWAYS reset dropdown to closed state whenever menu is opened
    if (mobileDrawerOverlay) {
      mobileDrawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.add('is-active');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      mobileToggleBtn.setAttribute('aria-label', 'Close mobile navigation menu');
    }
  }

  function closeMobileDrawer() {
    closeMobileAccordion(); // ALWAYS close dropdown whenever drawer is closed
    if (mobileDrawerOverlay) {
      mobileDrawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove('is-active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      mobileToggleBtn.setAttribute('aria-label', 'Open mobile navigation menu');
    }
  }

  if (mobileToggleBtn && mobileDrawerOverlay) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawerOverlay.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawerOverlay) {
    mobileDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === mobileDrawerOverlay) {
        closeMobileDrawer();
      }
    });
  }

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawerOverlay && mobileDrawerOverlay.classList.contains('open')) {
      closeMobileDrawer();
    }
  });

  // Close mobile drawer upon clicking any navigation link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Handle Window Resize: If screen resized to desktop (> 1150px), auto-close mobile drawer
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1150) {
      if (mobileDrawerOverlay && mobileDrawerOverlay.classList.contains('open')) {
        closeMobileDrawer();
      }
    }
  });

  // Handle Back-Forward Cache (bfcache) / Page returns: always start fresh and closed
  window.addEventListener('pageshow', () => {
    closeMobileDrawer();
    closeMobileAccordion();
    closeHomeDropdown();
  });

  // Ensure initial closed state on page load
  closeMobileAccordion();
  closeHomeDropdown();

  // 6. Mobile Accordion for Home Submenu (Strict Click-Only - Never opens automatically)
  if (mobileAccordionToggle && mobileAccordionMenu) {
    mobileAccordionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileAccordionMenu.classList.contains('open');
      if (isOpen) {
        closeMobileAccordion();
      } else {
        mobileAccordionMenu.classList.add('open');
        mobileAccordionToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // 7. Login / Register Navigation & Page Tabs
  const loginBtns = document.querySelectorAll('.btn-login');
  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      closeMobileDrawer();
      // If it's a link to login.html, let the browser navigate naturally
      if (btn.tagName === 'A' && btn.getAttribute('href')) {
        return;
      }
      // If modal exists on page (legacy fallback)
      const authModalOverlay = document.getElementById('authModalOverlay');
      if (authModalOverlay) {
        e.preventDefault();
        authModalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        window.location.href = 'login.html';
      }
    });
  });

  const authModalOverlay = document.getElementById('authModalOverlay');
  const authModalClose = document.getElementById('authModalClose');
  function closeAuthModal() {
    if (authModalOverlay) {
      authModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  if (authModalClose) {
    authModalClose.addEventListener('click', closeAuthModal);
  }
  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        closeAuthModal();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModalOverlay && authModalOverlay.classList.contains('open')) {
      closeAuthModal();
    }
  });

  // Dedicated Login Page Tab Switcher (Passenger vs Driver Partner)
  const btnTabPassenger = document.getElementById('btnTabPassenger');
  const btnTabDriver = document.getElementById('btnTabDriver');
  const formPassengerAuth = document.getElementById('formPassengerAuth');
  const formDriverAuth = document.getElementById('formDriverAuth');

  if (btnTabPassenger && btnTabDriver && formPassengerAuth && formDriverAuth) {
    btnTabPassenger.addEventListener('click', () => {
      btnTabPassenger.classList.add('active');
      btnTabPassenger.setAttribute('aria-selected', 'true');
      btnTabDriver.classList.remove('active');
      btnTabDriver.setAttribute('aria-selected', 'false');
      formPassengerAuth.classList.remove('hidden');
      formDriverAuth.classList.add('hidden');
    });

    btnTabDriver.addEventListener('click', () => {
      btnTabDriver.classList.add('active');
      btnTabDriver.setAttribute('aria-selected', 'true');
      btnTabPassenger.classList.remove('active');
      btnTabPassenger.setAttribute('aria-selected', 'false');
      formDriverAuth.classList.remove('hidden');
      formPassengerAuth.classList.add('hidden');
    });
  }

  // 8. Scroll To Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 9. Active Navigation Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      // If it's a dropdown child, also highlight the parent toggle
      const parentDropdown = link.closest('.nav-item');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  // 10. Interactive Live Fare Calculator
  const calcOrigin = document.getElementById('calcOrigin');
  const calcDest = document.getElementById('calcDest');
  const calcFleet = document.getElementById('calcFleet');
  const calcTime = document.getElementById('calcTime');
  const calcDistText = document.getElementById('calcDistText');
  const calcTotalText = document.getElementById('calcTotalText');

  if (calcOrigin && calcDest && calcFleet && calcTime && calcDistText && calcTotalText) {
    function computeFare() {
      const distMap = {
        'central-omr': 12.4,
        'central-airport': 16.8,
        'central-anna': 7.5,
        'central-guindy': 10.2,
        'omr-airport': 14.5,
        'omr-anna': 15.2,
        'omr-guindy': 8.5,
        'airport-anna': 11.2,
        'airport-guindy': 6.8,
        'anna-guindy': 9.4
      };

      const key1 = `${calcOrigin.value}-${calcDest.value}`;
      const key2 = `${calcDest.value}-${calcOrigin.value}`;
      let dist = distMap[key1] || distMap[key2] || 6.5;

      if (calcOrigin.value === calcDest.value) {
        dist = 2.0; // Minimal local run
      }

      // Base: ₹35 for first 1.8km, then ₹15/km
      let ratePerKm = 15;
      if (calcFleet.value === 'ev') ratePerKm = 13;
      if (calcFleet.value === 'share') ratePerKm = 8;

      let fare = 35;
      if (dist > 1.8) {
        fare += (dist - 1.8) * ratePerKm;
      }

      // Night multiplier (11 PM - 5 AM = 1.25x)
      if (calcTime.value === 'night') {
        fare *= 1.25;
      }

      const roundedFare = Math.round(fare);
      calcDistText.textContent = `${dist.toFixed(1)} km`;
      calcTotalText.textContent = `₹${roundedFare}`;
    }

    calcOrigin.addEventListener('change', computeFare);
    calcDest.addEventListener('change', computeFare);
    calcFleet.addEventListener('change', computeFare);
    calcTime.addEventListener('change', computeFare);
    computeFare();
  }

  // 11. Contact Page Interactive Tab Switching & Hash Navigation
  const contactTabs = document.querySelectorAll('.contact-tab-btn');
  const contactForms = document.querySelectorAll('.contact-form-body');

  if (contactTabs.length > 0 && contactForms.length > 0) {
    function activateContactTab(targetTabId) {
      contactTabs.forEach(t => {
        if (t.dataset.tab === targetTabId) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      contactForms.forEach(f => {
        if (f.id === targetTabId) {
          f.classList.remove('hidden');
        } else {
          f.classList.add('hidden');
        }
      });
    }

    contactTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        activateContactTab(btn.dataset.tab);
      });
    });

    // Check URL hash (#driver, #corporate)
    const hash = window.location.hash.replace('#', '');
    if (hash === 'driver') {
      activateContactTab('formDriverReg');
    } else if (hash === 'corporate') {
      activateContactTab('formCorporateContract');
    }
  }
});


