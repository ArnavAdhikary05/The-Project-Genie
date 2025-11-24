# ColorfulTodoApp

## Project Overview

**ColorfulTodoApp** is a modern, visually‑rich, client‑side Todo application that lets you manage your daily tasks with style.  The app features:
- A clean, colourful UI that adapts to light and dark themes.
- Full CRUD (Create, Read, Update, Delete) for tasks.
- Completion toggles with instant visual feedback.
- Filter navigation to view *All*, *Active* or *Completed* tasks.
- Drag‑and‑drop reordering of tasks for a personalized list order.
- Persistent storage using the browser's **localStorage**, so your tasks survive page reloads and browser restarts.
- Responsive design that works beautifully on both mobile devices and desktop browsers.

The entire application runs in the browser – no server, no build tools, no dependencies.

---

## Tech Stack

- **HTML** – Markup for the UI layout.
- **CSS** – Styling, colour variables, responsive layout, and animations.
- **JavaScript** – Core application logic located in `app.js` (task management, UI rendering, drag‑and‑drop, persistence).

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ColorfulTodoApp.git
   cd ColorfulTodoApp
   ```

2. **Open the app**
   - Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).
   - No build steps, package managers, or server are required.

That’s it! The app will load and you can start adding tasks immediately.

---

## Usage Guide

### Adding a Task
1. Type a task description into the input field at the top of the page.
2. Press **Enter** or click the **"Add"** button (➕). The new task appears at the bottom of the list.

### Editing a Task
- Click the ✎ (pencil) button next to a task.
- A prompt appears; edit the text and confirm. The task updates in place.

### Deleting a Task
- Click the ✖ (cross) button next to the task you want to remove.
- The task disappears instantly.

### Completing a Task
- Toggle the checkbox on the left side of a task.
- Completed tasks get a line‑through style and can be filtered.

### Filtering Tasks
- The navigation bar under the header contains three filter options:
  - **All** – shows every task.
  - **Active** – shows only tasks that are not completed.
  - **Completed** – shows only tasks that have been marked complete.
- Click a filter to switch the view; the active filter is highlighted.

### Drag‑and‑Drop Reordering
1. Hover over a task; a drag handle (≡) appears on the right.
2. Click and hold the task row, then drag it to the desired position.
3. Release to drop – the list order updates instantly and is saved to `localStorage`.

### Persistence
All changes (add, edit, delete, complete, reorder) are saved to the browser's **localStorage** under the key `tasks`.  When you reload the page or close/re‑open the browser, your list is restored automatically.

---

## Responsive Design

- **Mobile** – The layout collapses to a single‑column view. Buttons and inputs stretch to full width for easy tapping.
- **Desktop** – The task list is centered with a max‑width, and the filter navigation is displayed horizontally.
- The colour scheme and spacing adapt to different screen sizes using CSS media queries defined in `styles.css`.

---

## Customization

The colour palette is defined as CSS variables at the top of **`styles.css`**.  To change the look of the app:
1. Open `styles.css`.
2. Locate the `:root` selector – it contains variables like `--primary-color`, `--accent-color`, `--bg-color`, etc.
3. Modify the hex values to your preferred colours.
4. Save the file and refresh the browser to see the new theme.

Example:
```css
:root {
  --primary-color: #ff6f61;   /* change this to your favourite colour */
  --accent-color: #4a90e2;
  --bg-color: #fafafa;
  /* ... */
}
```

---

## Contribution Guidelines (optional)

Contributions are welcome! If you would like to improve the app:
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Make your changes, ensuring the existing functionality is not broken.
4. Test the app in multiple browsers and screen sizes.
5. Submit a pull request with a clear description of the changes.

Please keep the code style consistent with the existing files (`app.js`, `styles.css`) and update the README if you add new features.

---

## License

[Insert License Here] – e.g., MIT License.

---

## File Structure
```
ColorfulTodoApp/
├─ index.html      # Main HTML entry point
├─ styles.css      # Styling, colour variables, responsive layout
├─ app.js          # Core JavaScript logic (task model, UI rendering, drag‑and‑drop, persistence)
└─ README.md       # Documentation (you are reading it!)
```

The **`app.js`** file contains all the interactive behaviour of the app, from loading tasks from `localStorage` to handling drag‑and‑drop reordering.

---

Enjoy using **ColorfulTodoApp** to stay organized with a splash of colour!