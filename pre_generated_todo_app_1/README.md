# SimpleToDoApp

## Description
A lightweight, client‑side To‑Do list web application that lets users manage tasks directly in the browser. All data is stored locally using `localStorage`, so no backend or database is required.

## Features
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks (All / Active / Completed)
- Persist tasks across sessions via `localStorage`
- Responsive design for mobile and desktop

## Tech Stack
- **HTML** – Structure of the application (`index.html`)
- **CSS** – Styling and responsive layout (`styles.css`)
- **JavaScript** – Application logic, DOM manipulation, and data persistence (`app.js`)

## Setup
```bash
# Clone the repository
git clone https://github.com/your-username/SimpleToDoApp.git

# Navigate into the project directory
cd SimpleToDoApp

# Open the application in a browser (no build steps required)
# You can double‑click `index.html` or use a local server if preferred
open index.html   # macOS
# or
xdg-open index.html   # Linux
# or simply open the file via your file explorer
```

## Usage
1. **Add a task** – Type a task description into the input field at the top and press **Enter** or click the **Add** button.
2. **Edit a task** – Click the edit icon next to a task, modify the text, and press **Enter** or click the save icon.
3. **Delete a task** – Click the trash icon to remove a task permanently.
4. **Complete a task** – Click the checkbox to toggle a task's completed state. Completed tasks are styled differently.
5. **Filter tasks** – Use the filter buttons (All, Active, Completed) to view specific subsets of tasks.
6. **Persistence** – All tasks are saved in the browser's `localStorage`, so they remain after page reloads or browser restarts.

## Responsive Design
The app uses flexible CSS layout and media queries to ensure a seamless experience on both desktop and mobile devices. Elements resize and re‑flow appropriately for smaller screens.

## License
[Insert License Here]

---
### File Purposes (for contributors)
- **`index.html`** – Contains the markup structure of the To‑Do app.
- **`styles.css`** – Provides styling, theming, and responsive behavior.
- **`app.js`** – Implements all interactive functionality, including task CRUD operations and `localStorage` handling.
