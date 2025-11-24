# SimpleCalc

**SimpleCalc** is a lightweight, web‑based calculator that provides basic arithmetic operations with a clean, responsive UI. It runs entirely in the browser using only HTML, CSS, and JavaScript—no build steps or server components are required.

---

## Tech Stack
- **HTML** – Structure of the calculator UI.
- **CSS** – Styling and responsive layout.
- **JavaScript** – Core logic for calculations, event handling, and keyboard shortcuts.

---

## Features
- **Basic Operations**: addition, subtraction, multiplication, division.
- **Clear & Delete**: `C` to reset, `←` to delete the last entry.
- **Keyboard Support**: use numbers, `Enter` (or `=`) for evaluation, `Esc` to clear, `Backspace` to delete, and `+ - * /` for operators.
- **Responsive Design**: works on desktop, tablets, and mobile devices (touch‑friendly buttons).
- **Error Handling**: displays `Error` for invalid expressions (e.g., division by zero).

---

## Installation / Setup
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repository‑folder>
   ```
2. **Open the application**
   - Locate `index.html` in the project root.
   - Open it directly in any modern web browser (Chrome, Firefox, Edge, Safari).
   - No additional build steps, package managers, or server configuration are needed.

---

## Usage Guide
### Mouse / Touch
1. Click (or tap) the calculator buttons to build an expression.
2. Press `=` (or the **Enter** key) to evaluate the expression.
3. Use `C` to clear the current input and `←` to delete the last character.

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0‑9` | Input digit |
| `+ - * /` | Input operator |
| `Enter` or `=` | Evaluate expression |
| `Esc` | Clear all input |
| `Backspace` | Delete last character |
| `.` | Decimal point |

---

## Development Notes
### File Structure
```
SimpleCalc/
├─ index.html          # Main HTML page – loads the UI and scripts
├─ styles/
│   └─ style.css       # All styling for the calculator UI
├─ scripts/
│   └─ calculator.js   # JavaScript logic: event handling, calculations, shortcuts
└─ README.md           # Project documentation (this file)
```

### Extending Functionality
- **Additional Operations**: Add new buttons in `index.html`, style them in `style.css`, and extend the `calculate()` function in `calculator.js` to handle the new operators.
- **Scientific Features**: Implement functions such as `sin`, `cos`, `log` by expanding the parsing logic and providing corresponding UI controls.
- **Theming**: Modify CSS variables in `style.css` (e.g., `--primary-color`) to create dark or custom themes.
- **Persisted History**: Store past calculations in `localStorage` and display them in a sidebar component.

### Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Make your changes, ensuring existing functionality remains intact.
4. Run the application in a browser to manually verify UI/logic.
5. Submit a Pull Request with a clear description of the changes.

---

## Screenshot
![SimpleCalc Screenshot](./screenshot.png)
> *Replace `screenshot.png` with an actual image of the calculator UI.*

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.
