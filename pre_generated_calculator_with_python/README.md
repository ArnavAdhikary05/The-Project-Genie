# Calculator GUI

## Overview

`calculator_gui.py` provides a simple graphical calculator built with **Tkinter**. It demonstrates a clean separation between the calculation logic (`CalculatorEngine`) and the user interface (`CalculatorGUI`). The application supports basic arithmetic operations, clear and reset functions, and robust error handling for invalid inputs and division by zero.

## Features

- **Basic arithmetic** – addition, subtraction, multiplication, division.
- **Clear (C) and Reset (R)** buttons for easy correction.
- **Error handling** – user‑friendly dialogs for invalid numbers and division‑by‑zero.
- **Responsive UI** – a 4×5 button grid that expands to fill the window.
- **Separation of concerns** – calculation logic is isolated in `CalculatorEngine` making it easy to test or reuse.

## Installation

1. **Python** – Ensure you have Python 3.x installed. You can verify with:
   ```bash
   python --version
   ```
2. **Tkinter** – Tkinter is included with the standard Python distribution on most platforms. If it is missing, install it via your package manager:
   - **Windows/macOS** – typically already available.
   - **Debian/Ubuntu**:
     ```bash
     sudo apt-get install python3-tk
     ```
   - **Fedora**:
     ```bash
     sudo dnf install python3-tkinter
     ```
   - **If you prefer pip** (rarely needed):
     ```bash
     pip install tkinter
     ```
   > **Note:** The `pip` command may not provide Tkinter for all OSes; using the system package manager is recommended.

## Usage

Run the calculator directly from the command line:
```bash
python calculator_gui.py
```
A window titled **Calculator** will appear. Use the buttons to perform calculations.

## GUI Layout

- **Display** – a read‑only entry at the top showing the current number or result.
- **Button grid (4 rows × 5 columns)**:
  | Row | Buttons |
  |-----|---------|
  | 1   | `7  8  9  /  C` |
  | 2   | `4  5  6  *  R` |
  | 3   | `1  2  3  -  =` |
  | 4   | `0  .  +` (two empty cells) |
- **C** – clears the current entry.
- **R** – resets the entire calculator (clears operand, operator, and display).
- **=** – evaluates the pending operation and shows the result.

The layout uses `ttk.Button` widgets arranged with `grid()` and configured to expand equally, ensuring the UI scales nicely when the window is resized.

## Error Handling

- **Invalid numeric input** – If a non‑numeric value somehow reaches the engine, a `ValueError` is raised and a message box displays *"Invalid numeric input: …"*.
- **Division by zero** – The `divide` method raises `ZeroDivisionError`. The GUI catches this and shows *"Division by zero is undefined."*.
- **Unknown operator** – Should an unexpected operator be encountered, an error dialog is shown and the calculator resets.
- All error dialogs are presented using `tkinter.messagebox.showerror`, keeping the user informed without crashing the application.

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository** and clone your fork.
2. Create a new branch for your feature or bug‑fix:
   ```bash
   git checkout -b my-feature
   ```
3. Make your changes. Keep the separation between `CalculatorEngine` (logic) and `CalculatorGUI` (UI).
4. Run the script to verify the UI still works:
   ```bash
   python calculator_gui.py
   ```
5. (Optional) Add unit tests for `CalculatorEngine` in a new `tests/` directory.
6. Commit and push your changes, then open a Pull Request.

Please adhere to the existing coding style (PEP 8) and include a short description of the changes in the PR.
