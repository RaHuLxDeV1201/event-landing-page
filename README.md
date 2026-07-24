# ⚡ NexusTech 2026 - Global Tech & Developer Summit
### Event Management Landing Page — MLCOE Recruitment Task Submission

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Design-Responsive-10B981?style=for-the-badge)
![Theme](https://img.shields.io/badge/Dark%20%2F%20Light-Supported-6366F1?style=for-the-badge)

---

## 📌 Project Overview

**NexusTech 2026** is a modern, high-converting, and feature-rich landing page designed for an international technology summit. Built specifically for the **Machine Learning Centre of Excellence (MLCOE) Web Development Recruitment Task**, this application showcases advanced frontend fundamentals, fluid design systems, glassmorphism aesthetics, responsive layouts, and interactive JavaScript features without relying on external frameworks.

---

## 📑 Table of Contents

- [Live Preview & Local Setup](#-live-preview--local-setup)
- [MLCOE Evaluation Criteria Alignment](#-mlcoe-evaluation-criteria-alignment)
- [Key Features Breakdown](#-key-features-breakdown)
- [Project Architecture & File Structure](#-project-architecture--file-structure)
- [Third-Party Resources & Asset Credits](#-third-party-resources--asset-credits)
- [License](#-license)

---

## 🚀 Live Preview & Local Setup

### Quick Start (No Build Tools Required)
1. **Clone or Download** the repository:
   ```bash
   git clone https://github.com/your-username/event-landing-page.git
   ```
2. Navigate to the project directory:
   ```bash
   cd event-landing-page
   ```
3. Open `index.html` directly in any standard web browser (Chrome, Edge, Firefox, Safari) or use VS Code **Live Server**.

---

## 🏆 MLCOE Evaluation Criteria Alignment

This project has been engineered to strictly satisfy and exceed all evaluation requirements outlined in the recruitment task prompt:

| Evaluation Criteria | Weightage | Implementation Details & Architectural Compliance |
| :--- | :---: | :--- |
| **HTML & CSS Fundamentals** | **20%** | Built with 100% semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). CSS is strictly decoupled in `style.css` with **zero inline styles** in `index.html` (Rule #2 compliant). |
| **UI & Creativity** | **20%** | Custom dark/light mode palette, glassmorphism blur filters, ambient background glowing lights, Google Fonts (`Outfit` & `Plus Jakarta Sans`), and magnetic hover cards. |
| **Responsiveness** | **20%** | Mobile-first Flexbox and CSS Grid layout architecture. Fully responsive across Desktop (`1200px+`), Tablet (`768px`), and Mobile (`375px`) screen sizes with an animated drawer menu. |
| **Animations & Interactivity** | **15%** | Card magnetic elevation on hover, button shimmers, `@keyframes marquee` sponsor ticker, timeline progress indicators, smooth modal reveals, and canvas confetti particle physics. |
| **Code Quality** | **10%** | Clean, modular, well-commented ES6+ JavaScript. Strict variable scoping, null checks, reset states, and ARIA accessibility attributes (`aria-expanded`, `aria-hidden`, `aria-label`). |
| **JavaScript Functionality** | **10%** | **Useful features added**: Dark/Light mode theme toggle (`localStorage` persisted), dynamic countdown clock, 3-day schedule agenda switcher, live keyword search engine & category filtering with real-time badge count updates, speaker bio popover modals, pass pricing calculator with promo code engine (`MLCOE50`), 1-click Google Calendar invite generator, real-time form validation, confetti blast, and toast notifications. |
| **GitHub & README** | **5%** | Comprehensive documentation detailing setup, evaluation breakdown, project structure, and feature usage. |

---

## ✨ Key Features Breakdown

### 1. 🌙 Dark & Light Mode Theme Switcher
- Toggles color tokens between Deep Space Navy and Clean Glass Light theme.
- Automatically persists user preference in `localStorage`.

### 2. 🎟️ Interactive Pass Price Calculator & Promo Code Engine
- Real-time subtotal calculation based on selected pass tier (*All Access Pass $299*, *Track Pass $149*, *Hackathon Pass $49*) and ticket quantity (`+` / `-`).
- Type promo code **`MLCOE50`** or **`NEXUS2026`** and click **Apply** for an instant **50% discount** with a itemized price breakdown.

### 3. 🎉 Pure JS Canvas Confetti Celebration
- Custom physics-based particle confetti explosion fires upon successful ticket registration or newsletter subscription.

### 4. 📅 1-Click "Add to Google Calendar" Generator
- Agenda sessions feature an **Add to Google Calendar** button that auto-generates a pre-filled Google Calendar event URL with session title, time, and room location.

### 5. 👨‍💻 Speaker Profile Modals
- Clicking any keynote speaker card opens an interactive profile modal showing their biography, research topic, company, and session schedule.

### 6. 📅 Interactive 3-Day Summit Agenda
- Tabbed schedule navigation allowing attendees to toggle between **Day 1** (AI & Neural Systems), **Day 2** (Web & Cloud), and **Day 3** (24-Hour Hackathon & Demo Day).

### 7. 🔍 Live Search Engine & Category Filter
- Real-time instant search matching event titles, descriptions, or speakers.
- Filter cards by category tabs (*All*, *AI*, *Web & Cloud*, *Hackathons*) with dynamic count badge updates.

### 8. 🏆 $50,000 Hackathon & Prize Breakdown
- Gold, Silver, and Bronze prize breakdown cards + a real-time hacker team capacity progress bar.

### 9. ♾️ Infinite Scrolling Partner Marquee
- Continuous smooth CSS ticker showcasing tech sponsors (*Google Cloud, AWS, Azure, Meta AI, GitHub, NVIDIA, Vercel*).

### 10. ❓ FAQ Accordion
- Smooth expanding questions and answers covering attendance logistics.

### 11. 📝 Real-Time Form Validation
- Regex validation for Full Name, Work Email, and Phone Number with error highlighting.

### 12. 🔔 Dynamic Toast Notification System
- Non-intrusive animated toast popups for system feedback.

---

## 📁 Project Architecture & File Structure

```
event-landing-page/
├── assets/
│   ├── logo.svg           # Summit brand vector icon
│   └── favicon.ico        # Browser favicon
├── index.html             # Main semantic HTML5 structure (Zero inline CSS)
├── style.css              # Custom CSS design system, variables, and responsive grids
├── script.js             # Vanilla JS ES6+ interactive engine
├── README.md              # Project documentation & recruitment rubric breakdown
└── LICENSE                # MIT License
```

---

## 🛠️ Third-Party Resources & Asset Credits

- **Typography:** [Google Fonts](https://fonts.google.com/) (`Outfit` & `Plus Jakarta Sans`)
- **Vector Icons:** [FontAwesome 6.4 Free CDN](https://cdnjs.cloudflare.com)
- **Stock Media:** High-resolution developer photography provided by [Unsplash](https://unsplash.com)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.