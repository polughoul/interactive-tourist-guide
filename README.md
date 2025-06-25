# Project TravelGuide

## Project Overview

**TravelGuide** is an interactive web application serving as a tourist guide. It allows users to:

- Browse city guides
- Display multimedia content (video and audio guides)
- Explore maps
- Search for the nearest guides using geolocation
- Get local recommendations (cafés, museums)

It also includes:
- Animated sliders
- Switching between light and dark mode
- Scroll-to-top button
- Offline accessibility using localStorage and internet availability checks
- Admin interface for content editing, accessible only to administrators

---

## Project Structure

### Folders and Files

- **`/`** – HTML templates (`index.html`, `route_detail.html`, `admin.html`, `404.html`)
- **`css/`** – Styling files (`styles.css`, `admin.css`, `route_details.css`, `404.css`)
- **`js/`** – Main application logic (`main.js`, `route.js`, `vue-app.js`, `auth.js`, `new_app.js`)
- **`js/components/`** – Vue components (`edit_modal.js`, `favorite_modal.js`)
- **`js/utils/`** – Utility modules (`slider.js`, `scroll_to_top.js`, `weather_widget.js`, `theme.js`, `media_control.js`)
- **`js/vue/`** – External library (`vue.global.js`)

---

## Development

- The app uses modern JavaScript and the **Vue 3** framework for a reactive interface. (Vue is used as a library)
- Guide data is object-modeled and stored in `localStorage`, ensuring offline functionality.
- The admin panel includes login and editing using Vue modals.
- The interactive map uses **Leaflet**, and multimedia content loads only when the internet is available.
- Additional features:
  - Sliding slider using `requestAnimationFrame`
  - Theme switching (dark/light mode)
  - Scroll-to-top
  - Geolocation and external API for recommendations

Offline mode is handled via connection checking using `fetch` to a CORS-enabled API and showing clear alerts.

---

## Deployment and Testing

- The project can be run on an HTTP server (e.g., Live Server in VS Code) or opened via GitHub Pages: https://polughoul.github.io/interactive-tourist-guide/
- `vue.global.js` is stored locally – for offline access.
- Responsiveness, cross-browser compatibility, and overall usability are tested using modern CSS techniques (including vendor prefixes).

---

## Features

### Main Interface (`index.html`)

- Navigation, intro banner, and guide cards (generated using `vue-app.js`)
- Cards include:
  - Image, title, description, rating, duration
  - Buttons for details, add to favorites, edit (for admin)
- Drag and Drop API for rearranging guide cards. Users can easily drag and reorder cards.

### Guide Detail (`route_detail.html`)

- Interactive map (Leaflet)
- Video guide (YouTube)
- Audio guide (local)
- Weather widget and nearby recommendations
- Image gallery (slider)
- Warnings when features are unavailable (offline mode)

### Offline Mode

- The `checkInternetConnection()` function checks connection using `fetch`
- If the internet is unavailable, messages appear instead of:
  - Video, map, weather, recommendations
- Data like guides, audio, favorites, etc., are stored in `localStorage`

### Administration and Editing

- The `admin.html` page allows login and content editing
- Editing is done via Vue modal windows
- Changes are saved in `localStorage`

### User Enhancements

- Light/dark mode switching (stored in `localStorage`)
- Scroll-to-top button, hover effects, and animations
- Geolocation allows displaying nearby guides and attractions
- Navigation history and smooth scrolling (the page scrolls smoothly to the relevant section and updates the current URL state without page reload)

---
