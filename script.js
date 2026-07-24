/* ==========================================================================
   TechPulse 2026 - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCountdownTimer();
});

/* --- Mobile Navigation Toggle --- */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle menu icon
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close navbar menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
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

/* --- Countdown Timer Feature --- */
function initCountdownTimer() {
    // Set event launch date to 30 days from now
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 30);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --- Modal Controllers --- */
function openModal(eventName = 'All Access Pass') {
    const modal = document.getElementById('registrationModal');
    const selectElem = document.getElementById('eventSelect');

    if (selectElem && eventName) {
        selectElem.value = eventName;
    }

    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('registrationModal');
    const successMsg = document.getElementById('formSuccessMessage');
    const form = document.getElementById('registrationForm');

    if (modal) {
        modal.classList.remove('active');
    }

    // Reset form after close animation
    setTimeout(() => {
        if (form) form.reset();
        if (successMsg) successMsg.classList.add('hidden');
    }, 300);
}

/* --- Registration Form Handler --- */
function handleFormSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selectedEvent = document.getElementById('eventSelect').value;

    // Simple validation check
    if (!fullName || !email || !phone) {
        alert('Please fill out all required fields.');
        return;
    }

    const successMsg = document.getElementById('formSuccessMessage');
    if (successMsg) {
        successMsg.classList.remove('hidden');
    }

    // Auto-close modal after 2.5 seconds
    setTimeout(() => {
        closeModal();
    }, 2500);
}