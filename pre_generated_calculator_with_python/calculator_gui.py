import tkinter as tk
from tkinter import ttk, messagebox


class CalculatorEngine:
    """Encapsulates basic arithmetic operations with error handling.

    Methods:
        add(a, b): Returns the sum of a and b.
        subtract(a, b): Returns the difference a - b.
        multiply(a, b): Returns the product a * b.
        divide(a, b): Returns the quotient a / b, handling division by zero.
    """

    @staticmethod
    def _validate_number(value):
        """Validate that the input can be converted to a float.

        Raises:
            ValueError: If the value cannot be converted to a float.
        """
        try:
            return float(value)
        except (TypeError, ValueError) as e:
            raise ValueError(f"Invalid numeric input: {value}") from e

    def add(self, a, b):
        a, b = self._validate_number(a), self._validate_number(b)
        return a + b

    def subtract(self, a, b):
        a, b = self._validate_number(a), self._validate_number(b)
        return a - b

    def multiply(self, a, b):
        a, b = self._validate_number(a), self._validate_number(b)
        return a * b

    def divide(self, a, b):
        a, b = self._validate_number(a), self._validate_number(b)
        if b == 0:
            raise ZeroDivisionError("Division by zero is undefined.")
        return a / b


class CalculatorGUI(tk.Tk):
    """Graphical user interface for the calculator.

    Inherits from ``tk.Tk`` and sets up the main window, display, and buttons.
    An instance of :class:`CalculatorEngine` is stored as ``self.engine`` for
    performing calculations.
    """

    def __init__(self):
        """Initialize the main window and its components.

        - Sets window title and geometry.
        - Instantiates ``CalculatorEngine``.
        - Calls helper methods to build the display and button layout.
        """
        super().__init__()
        self.title("Calculator")
        self.geometry("300x400")  # Width x Height
        # Engine responsible for arithmetic operations
        self.engine = CalculatorEngine()
        # Internal state for calculation logic
        self.current_input = ""   # String being typed
        self.operand = None        # First operand (float)
        self.operator = None       # Pending operator as string ('+', '-', '*', '/')
        # Build UI components
        self._create_display()
        self._create_buttons()

    def _create_display(self):
        """Create the entry widget that serves as the calculator display.

        The display is a right‑justified ``ttk.Entry`` with a larger font for
        readability. It is stored as ``self.display`` for later access.
        """
        # Use ttk.Entry for built‑in "readonly" state support
        self.display = ttk.Entry(self, font=("Arial", 24), justify="right")
        # Place the widget at the top of the window, filling horizontally
        self.display.pack(fill="x", padx=10, pady=10)
        # Initialise with zero while the widget is in normal state
        self.display.insert(0, "0")
        # Make the entry read‑only so the user cannot type directly
        self.display.configure(state="readonly")

    def _create_buttons(self):
        """Create a 4x5 grid of calculator buttons.

        The layout includes digits 0‑9, a decimal point, basic arithmetic
        operations (+, -, *, /), an equals sign, a clear button (C) and a reset
        button (R). Each button is bound to ``self._on_button_click`` with the
        button's label as the argument.
        """
        button_frame = ttk.Frame(self)
        button_frame.pack(expand=True, fill="both", padx=10, pady=10)

        # Define a 4x5 layout. Empty strings represent unused cells.
        buttons = [
            ["7", "8", "9", "/", "C"],
            ["4", "5", "6", "*", "R"],
            ["1", "2", "3", "-", "="],
            ["0", ".", "+", "", ""],
        ]

        for r, row in enumerate(buttons):
            for c, label in enumerate(row):
                if not label:  # Skip empty placeholder cells
                    continue
                btn = ttk.Button(
                    button_frame,
                    text=label,
                    command=lambda val=label: self._on_button_click(val),
                )
                btn.grid(row=r, column=c, sticky="nsew", padx=2, pady=2)

        # Configure grid to make all cells expand equally.
        for col_index in range(5):
            button_frame.columnconfigure(col_index, weight=1)
        for row_index in range(4):
            button_frame.rowconfigure(row_index, weight=1)

    def _update_display(self, text: str):
        """Utility to safely update the readonly display widget.

        The widget is temporarily switched to ``normal`` state, cleared, the
        new text inserted, and then set back to ``readonly``.
        """
        self.display.configure(state="normal")
        self.display.delete(0, tk.END)
        self.display.insert(0, text)
        self.display.configure(state="readonly")

    def _evaluate(self):
        """Perform the pending arithmetic operation and show the result.

        This method is invoked when the ``=`` button is pressed. It uses the
        stored ``self.operand`` and ``self.operator`` together with the current
        input to compute the final value via ``self.engine``. After a successful
        evaluation the result becomes the new ``self.operand`` and the input is
        cleared, allowing further chained calculations.
        """
        # If there is no pending operator or operand, just display the current input.
        if self.operator is None or self.operand is None:
            self._update_display(self.current_input or "0")
            return

        # Determine the right‑hand operand.
        try:
            # Prefer the number the user is currently typing; fall back to the
            # value currently shown on the display.
            right_str = self.current_input if self.current_input else self.display.get()
            right = float(right_str)
        except ValueError:
            messagebox.showerror("Error", f"Invalid numeric input: {self.current_input}")
            self._reset_all()
            return

        # Map the operator symbol to the corresponding engine method.
        ops = {
            "+": self.engine.add,
            "-": self.engine.subtract,
            "*": self.engine.multiply,
            "/": self.engine.divide,
        }
        func = ops.get(self.operator)
        if func is None:
            messagebox.showerror("Error", f"Unknown operator: {self.operator}")
            self._reset_all()
            return

        try:
            result = func(self.operand, right)
        except ZeroDivisionError as zde:
            messagebox.showerror("Error", str(zde))
            self._reset_all()
            return
        except ValueError as ve:
            messagebox.showerror("Error", str(ve))
            self._reset_all()
            return

        # Store result for possible further operations.
        self.operand = result
        self.operator = None
        self.current_input = ""

        # Format the result to avoid trailing zeros like "5.0" -> "5".
        if isinstance(result, float):
            display_text = ("%f" % result).rstrip('0').rstrip('.')
        else:
            display_text = str(result)
        self._update_display(display_text)

    def _reset_all(self):
        """Reset the calculator to its initial state (clear everything)."""
        self.current_input = ""
        self.operand = None
        self.operator = None
        self._update_display("0")

    def _clear_entry(self):
        """Clear only the current entry (keeps any stored operand/operator)."""
        self.current_input = ""
        self._update_display("0")

    def _on_button_click(self, label: str):
        """Handle button clicks for digits, operators, and control keys.

        The method updates internal state (`self.current_input`, `self.operand`,
        `self.operator`) and refreshes the display accordingly.
        """
        # Digits and decimal point – build the current number string.
        if label.isdigit() or label == ".":
            # Prevent multiple decimal points in a single number.
            if label == "." and "." in self.current_input:
                return
            self.current_input += label
            self._update_display(self.current_input)
            return

        # Clear current entry.
        if label == "C":
            self._clear_entry()
            return

        # Reset entire calculator.
        if label == "R":
            self._reset_all()
            return

        # Operators (+, -, *, /)
        if label in {"+", "-", "*", "/"}:
            # If there is already a pending operation and we have a number,
            # compute the intermediate result first.
            if self.operator is not None and self.current_input:
                try:
                    ops = {
                        "+": self.engine.add,
                        "-": self.engine.subtract,
                        "*": self.engine.multiply,
                        "/": self.engine.divide,
                    }
                    intermediate = ops[self.operator](self.operand, self.current_input)
                except Exception as e:
                    messagebox.showerror("Error", str(e))
                    self._reset_all()
                    return
                self.operand = intermediate
                self._update_display(str(intermediate).rstrip('0').rstrip('.'))
            else:
                # No pending operation – store the displayed/current value as operand.
                if self.current_input:
                    self.operand = self.current_input
                else:
                    # Use whatever is shown on the display.
                    self.operand = self.display.get()
            # Set the new operator and prepare for the next number.
            self.operator = label
            self.current_input = ""
            return

        # Equals – compute final result.
        if label == "=":
            self._evaluate()
            return

        # Fallback – ignore unknown labels.
        return

    def run(self):
        """Start the Tkinter main loop for the calculator GUI."""
        self.mainloop()


if __name__ == "__main__":
    app = CalculatorGUI()
    app.run()
