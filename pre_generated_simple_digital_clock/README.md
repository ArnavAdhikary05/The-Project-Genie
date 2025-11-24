# Digital Clock Project

## Purpose
This small project demonstrates how to create a simple digital clock that updates every second using vanilla JavaScript. It is intended as a learning exercise for front‑end developers, showcasing the interaction between HTML, CSS and JavaScript without any external libraries.

## File Structure
```
├── index.html   # The markup that displays the clock
├── styles.css   # Basic styling for the clock
├── script.js    # JavaScript that calculates and updates the time
└── README.md    # Project documentation (this file)
```

## Running the App Locally
The application is a static web page, so no server or build step is required. Simply open **index.html** in your favorite browser:

1. Clone or download the repository.
2. Open the file `index.html` in Chrome, Firefox, Edge, or any modern browser.
3. The clock will appear and automatically update every second.

> **Tip:** If you prefer a command‑line approach, you can start a simple HTTP server, e.g.:
> ```bash
> # Python 3.x
> python -m http.server 8000
> # Then navigate to http://localhost:8000
> ```

## How the Clock Updates
The core logic lives in **script.js**:

1. **`getCurrentTime()`** – Reads the current `Date` object, extracts hours, minutes and seconds, and formats them as a `HH:MM:SS` string.
2. **`updateClock()`** – Sets the inner text of the clock element (`#clock`) to the formatted time.
3. **`setInterval(updateClock, 1000)`** – Calls `updateClock()` every 1000 ms (1 second) so the display stays in sync.

When the page loads, `updateClock()` runs immediately to avoid an initial one‑second delay, and then the interval keeps the clock ticking.

## Implementation Details

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Digital Clock</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="clock">00:00:00</div>
  <script src="script.js"></script>
</body>
</html>
```
- A single `<div>` with `id="clock"` is the placeholder for the time.
- The page links to `styles.css` and includes `script.js` at the end of the body.

### styles.css
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #282c34;
  color: #61dafb;
  font-family: 'Courier New', monospace;
  font-size: 4rem;
}
#clock {
  padding: 20px;
  border: 2px solid #61dafb;
  border-radius: 10px;
  background: #20232a;
}
```
- Centers the clock on the page and gives it a simple, modern look.

### script.js
```js
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  clockEl.textContent = getCurrentTime();
}

// Initial call to avoid delay
updateClock();
setInterval(updateClock, 1000);
```
- Uses `padStart` to ensure two‑digit formatting.
- Keeps the DOM update minimal by only changing the text content.

## Extending the Project
Feel free to experiment:
- Add AM/PM or 12‑hour format.
- Show date or timezone.
- Use CSS animations for a flipping clock effect.

Happy coding!
