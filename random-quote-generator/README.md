# Random Quote Generator

A modern, responsive single-page web application built for the **CodeAlpha App Development Internship**. The application delivers inspiring and motivational quotes with a smooth user experience, instant clipboard copying, and responsive design across desktop, tablet, and mobile devices.

---

## 🚀 Features

- **Random Quote on Load**: Displays an inspiring quote and its author immediately upon opening.
- **No Duplicate Consecutive Quotes**: The "New Quote" button guarantees that the next quote is different from the current one.
- **Rich Collection of Quotes**: Includes 35 carefully curated quotes from historical and contemporary thinkers, leaders, and artists.
- **Smooth Fade Transitions**: Fluid CSS and JavaScript transition effects when quotes change.
- **Copy to Clipboard**: Quick-copy button that copies the quote and author format (`"Quote" — Author`) with instant visual feedback ("Copied!" with checkmark).
- **Fully Responsive**: Optimized for desktop, laptop, tablet, and mobile displays using modern CSS and media queries.
- **Zero External Dependencies**: Built with pure HTML5, CSS3, and Vanilla JavaScript—no external libraries, frameworks, or backend required.
- **Accessible & Semantic**: Uses semantic HTML5 landmarks (`<header>`, `<main>`, `<article>`, `<blockquote>`, `<cite>`, `<footer>`), high-contrast colors, and accessible ARIA attributes.
- **Keyboard Shortcuts**: Press `Spacebar` or `N` to quickly generate a new quote.

---

## 📁 Project Structure

```text
random-quote-generator/
├── index.html        # Semantic HTML5 markup
├── style.css         # Modern styling, responsive layout & animations
└── script.js         # Vanilla JavaScript quote data, logic & DOM interactions
```

---

## 💻 Technologies Used

- **HTML5**: Semantic tags, accessible structure, SVG icons.
- **CSS3**: CSS Custom Properties (variables), Flexbox, Clamp typography, CSS animations & transitions.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, event listeners, Clipboard API with fallback, array random selection.

---

## 🛠️ How to Run the Project

### Option 1: Direct File Open (Easiest)
1. Navigate to the project directory:
   `c:\Users\tejas\OneDrive\Desktop\Tejashwini\CodeAlpha\randomquote\`
2. Double-click **`index.html`** (or right-click and select **Open with** -> **Google Chrome** / **Microsoft Edge** / any modern browser).

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click on `index.html` and click **"Open with Live Server"**.
3. The app will open in your browser at `http://127.0.0.1:5500/`.

### Option 3: Using Python HTTP Server (if installed)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🧪 Testing Performed

1. **Initial Quote Generation**: Verified that a quote and its respective author are dynamically loaded on startup.
2. **Consecutive Duplicate Prevention**: Tested clicking "New Quote" over 50 consecutive times to verify no quote repeated back-to-back.
3. **Copy Functionality**: Tested copying on modern browsers using the Clipboard API as well as fallback textarea copying.
4. **Responsive Layout**: Verified layout rendering on Desktop (1920x1080), Tablet (768px), and Mobile (375px/320px) viewports.
5. **Console Check**: Confirmed 0 errors, warnings, or broken resources in the browser developer tools console.

---

## 📄 License & Credits

Created by **Tejashwini** for the **CodeAlpha App Development Internship**.
All quotes belong to their respective authors.
