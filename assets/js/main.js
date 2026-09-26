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

  // 9. Active Navigation Highlighter & Dynamic Home Label (Home 1 vs Home 2)
  let rawPath = window.location.pathname.split('/').pop().toLowerCase();
  if (!rawPath || rawPath === '' || rawPath === '/') {
    rawPath = 'index.html';
  }
  rawPath = rawPath.split('?')[0].split('#')[0];

  const isHome1 = rawPath === 'index.html';
  const isHome2 = rawPath === 'home-2.html';
  const homeSubmenuLinks = document.querySelectorAll('#homeDropdownMenu a, #mobileHomeSubmenu a');

  if (isHome1 || isHome2) {
    const labelText = isHome1 ? 'Home 1' : 'Home 2';

    // 1. Update Desktop Home Toggle
    if (homeDropdownToggle) {
      homeDropdownToggle.classList.add('active');
      const labelSpan = homeDropdownToggle.querySelector('.home-nav-label');
      if (labelSpan) {
        labelSpan.textContent = labelText;
      } else {
        homeDropdownToggle.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            node.textContent = labelText + ' ';
          }
        });
      }
    }

    // 2. Update Mobile Accordion Toggle
    if (mobileAccordionToggle) {
      mobileAccordionToggle.classList.add('active');
      const span = mobileAccordionToggle.querySelector('span');
      if (span) {
        span.textContent = labelText;
      }
    }

    // 3. Highlight only the matching dropdown item
    homeSubmenuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if ((isHome1 && href === 'index.html') || (isHome2 && href === 'home-2.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  } else {
    // Non-home pages: remove active state from Home toggles
    if (homeDropdownToggle) {
      homeDropdownToggle.classList.remove('active');
      const labelSpan = homeDropdownToggle.querySelector('.home-nav-label');
      if (labelSpan) {
        labelSpan.textContent = 'Home';
      }
    }
    if (mobileAccordionToggle) {
      mobileAccordionToggle.classList.remove('active');
      const span = mobileAccordionToggle.querySelector('span');
      if (span) {
        span.textContent = 'Home';
      }
    }
    homeSubmenuLinks.forEach(link => link.classList.remove('active'));
  }

  // Highlight all other navigation links matching current path
  const otherNavLinks = document.querySelectorAll('.desktop-nav .nav-link:not(.dropdown-toggle), .mobile-nav-list .mobile-nav-link:not(.mobile-accordion-toggle)');
  otherNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === rawPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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

  // 11. Custom Select Dropdown Component
  // Replaces browser-native OS popup menus with sleek, theme-integrated dropdowns that never overflow
  function initCustomSelects() {
    const selects = document.querySelectorAll('select.field-select, select.form-input');
    selects.forEach(select => {
      if (select.classList.contains('custom-select-initialized')) return;
      select.classList.add('custom-select-initialized');

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-select-wrapper';
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      // Hide native select visually while keeping accessible
      select.classList.add('custom-select-native-hidden');

      // Create custom trigger button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      const triggerText = document.createElement('span');
      triggerText.className = 'custom-select-text';
      const curOption = select.options[select.selectedIndex];
      triggerText.textContent = curOption ? curOption.text : 'Select...';

      const arrow = document.createElement('span');
      arrow.className = 'custom-select-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

      trigger.appendChild(triggerText);
      trigger.appendChild(arrow);
      wrapper.appendChild(trigger);

      // Create options list container
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'custom-select-options';
      optionsContainer.setAttribute('role', 'listbox');

      function buildOptions() {
        optionsContainer.innerHTML = '';
        Array.from(select.options).forEach((opt, idx) => {
          const optEl = document.createElement('div');
          const isSelected = idx === select.selectedIndex;
          optEl.className = `custom-select-option ${isSelected ? 'selected' : ''}`;
          optEl.setAttribute('role', 'option');
          optEl.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          optEl.setAttribute('data-value', opt.value);

          const labelSpan = document.createElement('span');
          labelSpan.textContent = opt.text;
          optEl.appendChild(labelSpan);

          if (isSelected) {
            const check = document.createElement('span');
            check.className = 'opt-check';
            check.textContent = '✓';
            optEl.appendChild(check);
          }

          optEl.addEventListener('click', (e) => {
            e.stopPropagation();
            select.selectedIndex = idx;
            triggerText.textContent = opt.text;

            optionsContainer.querySelectorAll('.custom-select-option').forEach((item, itemIdx) => {
              item.classList.remove('selected');
              item.setAttribute('aria-selected', 'false');
              const oldCheck = item.querySelector('.opt-check');
              if (oldCheck) oldCheck.remove();

              if (itemIdx === idx) {
                item.classList.add('selected');
                item.setAttribute('aria-selected', 'true');
                const newCheck = document.createElement('span');
                newCheck.className = 'opt-check';
                newCheck.textContent = '✓';
                item.appendChild(newCheck);
              }
            });

            closeMenu();
            trigger.focus();

            // Dispatch change event to trigger any linked logic
            const evt = new Event('change', { bubbles: true });
            select.dispatchEvent(evt);
          });

          optionsContainer.appendChild(optEl);
        });
      }

      buildOptions();
      wrapper.appendChild(optionsContainer);

      function openMenu() {
        // Close any other open custom selects
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('open');
            const otherTrigger = w.querySelector('.custom-select-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        wrapper.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (wrapper.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (!wrapper.classList.contains('open')) {
            openMenu();
          } else {
            const items = Array.from(optionsContainer.querySelectorAll('.custom-select-option'));
            let currentIdx = select.selectedIndex;
            if (e.key === 'ArrowDown' && currentIdx < items.length - 1) {
              items[currentIdx + 1].click();
            } else if (e.key === 'ArrowUp' && currentIdx > 0) {
              items[currentIdx - 1].click();
            }
          }
        } else if (e.key === 'Escape' && wrapper.classList.contains('open')) {
          e.preventDefault();
          closeMenu();
        }
      });

      // If native select is changed programmatically
      select.addEventListener('change', () => {
        const curOpt = select.options[select.selectedIndex];
        if (curOpt) {
          triggerText.textContent = curOpt.text;
          buildOptions();
        }
      });

      // Connect associated label if any
      if (select.id) {
        const label = document.querySelector(`label[for="${select.id}"]`);
        if (label) {
          label.addEventListener('click', (e) => {
            e.preventDefault();
            trigger.focus();
            if (!wrapper.classList.contains('open')) {
              openMenu();
            }
          });
        }
      }
    });

    // Close any open select on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          w.classList.remove('open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          w.classList.remove('open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  initCustomSelects();

  // 12. Instant Ride Dispatch Widget Dynamic Fare (Homepage)
  const homeRideCategory = document.getElementById('rideCategory');
  const homeFareValue = document.querySelector('.booking-widget-card .fare-value');
  if (homeRideCategory && homeFareValue) {
    homeRideCategory.addEventListener('change', () => {
      switch (homeRideCategory.value) {
        case 'ev':
          homeFareValue.textContent = '₹55 - ₹70';
          break;
        case 'share':
          homeFareValue.textContent = '₹25 - ₹40';
          break;
        case 'metered':
        default:
          homeFareValue.textContent = '₹65 - ₹80';
          break;
      }
    });
  }
});


