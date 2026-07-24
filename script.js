/* ==========================================================================
   NexusTech 2026 - Main Engine Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initCountdown();
    initEventFilters();
    initFormValidation();
});

/* --- Theme Switcher (Dark / Light Mode) --- */
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
        });
    }
}

/* --- Mobile Hamburger Navigation Toggle --- */
function initMobileNav() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Auto close nav on link click
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

/* --- Live Countdown Timer --- */
function initCountdown() {
    // Target date set to 45 days into the future
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

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --- Event Category Filtering & Live Search --- */
function initEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('eventSearch');
    const eventCards = document.querySelectorAll('.event-card');
    const noEventsMsg = document.getElementById('noEventsMsg');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterEvents() {
        let visibleCount = 0;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();

            const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
            const matchesSearch = cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

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
            filterEvents();
        });
    }
}

/* --- Registration Modal & Form Validation --- */
function openModal(trackName = 'All Access Pass') {
    const modal = document.getElementById('registrationModal');
    const trackSelect = document.getElementById('selectedTrack');

    if (trackSelect && trackName) {
        trackSelect.value = trackName;
    }

    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeModal() {
    const modal = document.getElementById('registrationModal');
    const form = document.getElementById('registrationForm');
    const successBox = document.getElementById('formSuccessMessage');

    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
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
    const form = document.getElementById('registrationForm');
    const successBox = document.getElementById('formSuccessMessage');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const nameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        let isValid = true;

        // Name Validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'nameError');
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'emailError');
            isValid = false;
        }

        // Phone Validation
        if (phoneInput.value.trim().length < 7) {
            showError(phoneInput, 'phoneError');
            isValid = false;
        }

        if (isValid) {
            form.classList.add('hidden');
            if (successBox) successBox.classList.remove('hidden');

            setTimeout(() => {
                closeModal();
            }, 3000);
        }
    });
}

function showError(inputElem, errorId) {
    const formGroup = inputElem.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('invalid');
    }
}

function handleNewsletter(event) {
    event.preventDefault();
    alert('Thank you for subscribing to NexusTech updates!');
    event.target.reset();
}