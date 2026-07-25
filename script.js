/* ==========================================================================
   NexusTech 2026 - Main Interactive Engine Script
   Designed and Developed Independently
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderScroll();
    initMobileNav();
    initCountdown();
    initAgendaTabs();
    initEventFilters();
    initFaqAccordion();
    initPriceCalculator();
    initSpeakerModal();
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
   2. Sticky Header & Scroll-Spy Navigation
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = id('mainHeader');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

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
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburgerBtn = id('hamburgerBtn');
    const navLinks = id('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
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
   4. Live Countdown Clock
   -------------------------------------------------------------------------- */
function initCountdown() {
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
   5. Interactive Agenda Tabs
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
   6. Event Filter Tabs & Live Search Engine with Dynamic Count Updates
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

    function updateBadgeCounts() {
        let countAll = 0;
        let countAi = 0;
        let countWeb = 0;
        let countHackathon = 0;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();

            if (cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery)) {
                countAll++;
                if (cardCategory === 'ai') countAi++;
                if (cardCategory === 'web') countWeb++;
                if (cardCategory === 'hackathon') countHackathon++;
            }
        });

        if (id('countAll')) id('countAll').textContent = countAll;
        if (id('countAi')) id('countAi').textContent = countAi;
        if (id('countWeb')) id('countWeb').textContent = countWeb;
        if (id('countHackathon')) id('countHackathon').textContent = countHackathon;
    }

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

        updateBadgeCounts();

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

    updateBadgeCounts();
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

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
   8. Ticket Price Calculator & Promo Code Engine
   -------------------------------------------------------------------------- */
let ticketQuantity = 1;
let isDiscountApplied = false;

function resetCalculatorState() {
    ticketQuantity = 1;
    isDiscountApplied = false;
    if (id('ticketQty')) id('ticketQty').textContent = '1';
    if (id('promoCode')) id('promoCode').value = '';
    updatePrice();
}

function updatePrice() {
    const trackSelect = id('selectedTrack');
    if (!trackSelect) return;
    const selectedOption = trackSelect.options[trackSelect.selectedIndex];
    const baseUnitPrice = parseFloat(selectedOption?.dataset?.price || 299);

    let subtotal = baseUnitPrice * ticketQuantity;
    let discount = isDiscountApplied ? subtotal * 0.5 : 0;
    let total = subtotal - discount;

    if (id('basePriceText')) id('basePriceText').textContent = `$${subtotal.toFixed(2)}`;
    if (id('discountText')) id('discountText').textContent = `-$${discount.toFixed(2)}`;
    if (id('totalPriceText')) id('totalPriceText').textContent = `$${total.toFixed(2)}`;

    const discountRow = id('discountRow');
    if (discountRow) {
        if (isDiscountApplied) {
            discountRow.classList.remove('hidden');
        } else {
            discountRow.classList.add('hidden');
        }
    }
}

function initPriceCalculator() {
    const trackSelect = id('selectedTrack');
    const qtyMinusBtn = id('qtyMinusBtn');
    const qtyPlusBtn = id('qtyPlusBtn');
    const qtySpan = id('ticketQty');
    const applyPromoBtn = id('applyPromoBtn');
    const promoInput = id('promoCode');

    if (trackSelect) trackSelect.addEventListener('change', updatePrice);

    if (qtyMinusBtn) {
        qtyMinusBtn.addEventListener('click', () => {
            if (ticketQuantity > 1) {
                ticketQuantity--;
                if (qtySpan) qtySpan.textContent = ticketQuantity;
                updatePrice();
            }
        });
    }

    if (qtyPlusBtn) {
        qtyPlusBtn.addEventListener('click', () => {
            if (ticketQuantity < 10) {
                ticketQuantity++;
                if (qtySpan) qtySpan.textContent = ticketQuantity;
                updatePrice();
            }
        });
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            const code = promoInput ? promoInput.value.trim().toUpperCase() : '';
            if (code === 'NEXUS50' || code === 'NEXUS2026') {
                isDiscountApplied = true;
                updatePrice();
                showToast('Promo Code Applied: 50% OFF!', 'success');
            } else {
                showToast('Invalid promo code. Try NEXUS50', 'danger');
            }
        });
    }

    updatePrice();
}

/* --------------------------------------------------------------------------
   9. Speaker Profile Modal
   -------------------------------------------------------------------------- */
const speakerData = {
    aris: {
        name: 'Dr. Aris Thorne',
        role: 'Lead AI Researcher',
        company: 'Synapse AI',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        bio: 'Dr. Aris Thorne has authored 20+ top-cited papers on autonomous transformer agent architectures and synthetic training dataset alignment.',
        talk: 'Generative AI & LLM Systems',
        time: 'Oct 15, 2026 &bull; 10:00 AM EST &bull; Main Stage (Hall A)'
    },
    sarah: {
        name: 'Sarah Jenkins',
        role: 'VP of Engineering',
        company: 'CloudScale',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        bio: 'Sarah Jenkins leads a global engineering organization building ultra-low-latency distributed edge systems for real-time web application state.',
        talk: 'Modern Full-Stack Distributed Web',
        time: 'Oct 16, 2026 &bull; 02:00 PM EST &bull; Main Stage (Hall A)'
    },
    marcus: {
        name: 'Marcus Vance',
        role: 'Principal Systems Architect',
        company: 'DevCore',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        bio: 'Marcus Vance is a prolific open-source maintainer and creator of container security mesh tools deployed across Fortune 500 clouds.',
        talk: 'Cloud Native & Kubernetes Resilience',
        time: 'Oct 16, 2026 &bull; 11:30 AM EST &bull; Cloud Room 201'
    }
};

function initSpeakerModal() {
    const closeBtn = id('closeSpeakerModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeSpeakerModal);
}

function openSpeakerModal(speakerKey) {
    const data = speakerData[speakerKey];
    if (!data) return;

    if (id('modalSpeakerAvatar')) id('modalSpeakerAvatar').src = data.avatar;
    if (id('modalSpeakerName')) id('modalSpeakerName').textContent = data.name;
    if (id('modalSpeakerRole')) id('modalSpeakerRole').textContent = data.role;
    if (id('modalSpeakerCompany')) id('modalSpeakerCompany').textContent = data.company;
    if (id('modalSpeakerBio')) id('modalSpeakerBio').textContent = data.bio;
    if (id('modalSpeakerTalkTitle')) id('modalSpeakerTalkTitle').textContent = data.talk;
    if (id('modalSpeakerTalkTime')) id('modalSpeakerTalkTime').innerHTML = data.time;

    const modal = id('speakerModal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeSpeakerModal() {
    const modal = id('speakerModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------------------------------------
   10. Add to Google Calendar Link Generator
   -------------------------------------------------------------------------- */
function addEventToCalendar(title, timeStr, locationStr) {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `NexusTech 2026: ${title}`,
        details: `Attending NexusTech Summit 2026 session: ${title}`,
        location: locationStr,
    });

    window.open(`${baseUrl}?${params.toString()}`, '_blank');
    showToast('Opening Google Calendar invite...', 'info');
}

/* --------------------------------------------------------------------------
   11. Registration Form Validation & Confetti Blast
   -------------------------------------------------------------------------- */
function openModal(trackName = 'All Access Pass') {
    const modal = id('registrationModal');
    const trackSelect = id('selectedTrack');

    resetCalculatorState();

    if (trackSelect && trackName) {
        trackSelect.value = trackName;
        updatePrice();
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
        resetCalculatorState();
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

        if (!nameInput || nameInput.value.trim().length < 2) {
            showError('fullName');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
            showError('email');
            isValid = false;
        }

        const phoneRegex = /^[\+\d\s\(\)\-]{7,20}$/;
        if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
            showError('phone');
            isValid = false;
        }

        if (isValid) {
            form.classList.add('hidden');
            if (successBox) successBox.classList.remove('hidden');
            showToast('Registration confirmed! 🎉', 'success');
            triggerConfetti();
        } else {
            showToast('Please fix the highlighted form errors.', 'danger');
        }
    });
}

function showError(inputId) {
    const input = id(inputId);
    if (input) {
        const group = input.closest('.form-group');
        if (group) group.classList.add('invalid');
    }
}

/* --------------------------------------------------------------------------
   12. Pure JS Confetti Particle Engine
   -------------------------------------------------------------------------- */
function triggerConfetti() {
    const canvas = id('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.8) * 14,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rSpeed: (Math.random() - 0.5) * 10
        });
    }

    let animationFrame;
    const startTime = Date.now();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25;
            p.rotation += p.rSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (Date.now() - startTime < 3000) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }

    animate();
}

/* --------------------------------------------------------------------------
   13. Newsletter & Back to Top & Toast Engine
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
                triggerConfetti();
                form.reset();
            } else {
                showToast('Please enter a valid email address.', 'danger');
            }
        });
    }
}

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

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

function id(elementId) {
    return document.getElementById(elementId);
}