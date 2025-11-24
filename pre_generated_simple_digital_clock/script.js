// script.js
// Provides a live digital clock displayed in the element with id "clock".

/**
 * Returns the current local time formatted as HH:MM:SS.
 * @returns {string}
 */
function getCurrentTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Updates the text content of the element with id "clock" to the current time.
 */
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.textContent = getCurrentTime();
  }
}

// Update the clock immediately and then every second.
updateClock();
setInterval(updateClock, 1000);
