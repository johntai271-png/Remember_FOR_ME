# Remember.For.Me - Offline Interactive Simulation Mode

This directory contains the **standalone interactive simulation** of the Remember.For.Me platform.

It is built with pure, lightweight vanilla HTML5, CSS3, and JavaScript, requiring **zero compilation steps** or server-side databases (like Firebase). It allows stakeholders to preview the user interfaces, check accessibility options, and run simulated hardware events (like heart-rate alarms or geofence violations) instantly in any browser.

---

## 📂 Files Included

*   `index.html`: Holds the DOM tree for both Caregiver dashboard and Patient Kiosk screens.
*   `style.css`: Typography, styling, dark mode configuration, and key animations.
*   `app.js`: State manager, click handlers, coordinate map offsets, and Web Speech API Text-to-Speech triggers.

---

## 🏃 How to Start

Simply open [index.html](file:///Users/ngheun/Remember_Me/simulation/index.html) in your Google Chrome, Safari, or Microsoft Edge browser.

Alternatively, you can run a local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000/simulation` in your browser.
