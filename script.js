/* ==========================================================================
   NexusTech 2026 - Main Interactive Engine Script
   Designed for Machine Learning Centre of Excellence (MLCOE) Task Evaluation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderScroll();
    initMobileNav();
    initCountdown();
    initAgendaTabs();
    initEventFilters();
    initFaqAccordion();
    initFormValidation();
    initNewsletterForm();
    initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('nexustech_theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');

            localStorage.setItem('nexustech_theme', isDark ? 'dark' : 'light');
            themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

            showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
        });
    }
}

/* --------------------------------------------------------------------------
   2. Sticky Header Shrink & Scroll-Spy Navigation
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = id('mainHeader');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header shadow shrink on scroll
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll spy section highlighting
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. Mobile Hamburger Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburgerBtn = id('hamburgerBtn');
    const navLinks = id('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Auto close nav when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }
}

/* --------------------------------------------------------------------------
   4. Dynamic Live Countdown Clock
   -------------------------------------------------------------------------- */
function initCountdown() {
    // Set target date 45 days in the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) return;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (id('days')) id('days').textContent = padZero(days);
        if (id('hours')) id('hours').textContent = padZero(hours);
        if (id('minutes')) id('minutes').textContent = padZero(minutes);
        if (id('seconds')) id('seconds').textContent = padZero(seconds);
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   5. Interactive Day Agenda Switcher
   -------------------------------------------------------------------------- */
function initAgendaTabs() {
    const tabs = document.querySelectorAll('.agenda-tab');
    const panels = document.querySelectorAll('.agenda-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDay = tab.dataset.day;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const activePanel = id(targetDay);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. Event Filter Tabs & Live Search Engine
   -------------------------------------------------------------------------- */
function initEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = id('eventSearch');
    const clearSearchBtn = id('clearSearchBtn');
    const eventCards = document.querySelectorAll('.event-card');
    const noEventsMsg = id('noEventsMsg');
    const resetFiltersBtn = id('resetFiltersBtn');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterEvents() {
        let visibleCount = 0;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardSpeaker = card.querySelector('.speaker-tag') ? card.querySelector('.speaker-tag').textContent.toLowerCase() : '';

            const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
            const matchesSearch = cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery) || cardSpeaker.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noEventsMsg) {
            if (visibleCount === 0) {
                noEventsMsg.classList.remove('hidden');
            } else {
                noEventsMsg.classList.add('hidden');
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            filterEvents();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();

            if (clearSearchBtn) {
                if (searchQuery.length > 0) {
                    clearSearchBtn.classList.remove('hidden');
                } else {
                    clearSearchBtn.classList.add('hidden');
                }
            }
            filterEvents();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchQuery = '';
                clearSearchBtn.classList.add('hidden');
                filterEvents();
            }
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            activeCategory = 'all';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

            filterBtns.forEach(b => {
                b.classList.remove('active');
                if (b.dataset.category === 'all') b.classList.add('active');
            });
            filterEvents();
        });
    }
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion Logic
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other active items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            } else {
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   8. Registration Modal & Form Validation
   -------------------------------------------------------------------------- */
function openModal(trackName = 'All Access Pass') {
    const modal = id('registrationModal');
    const trackSelect = id('selectedTrack');

    if (trackSelect && trackName) {
        trackSelect.value = trackName;
    }

    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = id('registrationModal');
    const form = id('registrationForm');
    const successBox = id('formSuccessMessage');

    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    setTimeout(() => {
        if (form) {
            form.reset();
            form.classList.remove('hidden');
        }
        if (successBox) successBox.classList.add('hidden');
        clearErrors();
    }, 300);
}

document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);

function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('invalid');
    });
}

function initFormValidation() {
    const form = id('registrationForm');
    const successBox = id('formSuccessMessage');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const nameInput = id('fullName');
        const emailInput = id('email');
        const phoneInput = id('phone');

        let isValid = true;

        // Name Validation
        if (!nameInput || nameInput.value.trim().length < 2) {
            showError('fullName', 'nameError');
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
            showError('email', 'emailError');
            isValid = false;
        }

        // Phone Validation
        const phoneRegex = /^[\+\d\s\(\)\-]{7,20}$/;
        if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
            showError('phone', 'phoneError');
            isValid = false;
        }

        if (isValid) {
            form.classList.add('hidden');
            if (successBox) successBox.classList.remove('hidden');
            showToast('Registration submitted successfully!', 'success');
        } else {
            showToast('Please fix the highlighted form errors.', 'danger');
        }
    });
}

function showError(inputId, errorId) {
    const input = id(inputId);
    if (input) {
        const group = input.closest('.form-group');
        if (group) group.classList.add('invalid');
    }
}

/* --------------------------------------------------------------------------
   9. Newsletter Form Handler
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
    const form = id('newsletterForm');
    const emailInput = id('newsletterEmail');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailInput && emailRegex.test(emailInput.value.trim())) {
                showToast('Subscribed to NexusTech updates!', 'success');
                form.reset();
            } else {
                showToast('Please enter a valid email address.', 'danger');
            }
        });
    }
}

/* --------------------------------------------------------------------------
   10. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = id('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* --------------------------------------------------------------------------
   11. Toast Notification System Utility
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
    const container = id('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* Global Helper */
function id(elementId) {
    return document.getElementById(elementId);
}