// scripts/calculator.js
// SimpleCalc core logic implementation
// This script is loaded with defer, so DOM is ready when executed.

(() => {
  /**
   * Calculator class encapsulating calculator state and behavior.
   */
  class Calculator {
    /**
     * @param {string} displayId - The id of the display element.
     */
    constructor(displayId) {
      const el = document.getElementById(displayId);
      if (!el) {
        throw new Error(`Display element with id "${displayId}" not found`);
      }
      /** @type {HTMLElement} */
      this.displayElement = el;
      this.currentInput = '';
      this.previousValue = null; // number
      this.operator = null; // '+', '-', '*', '/'
      this.shouldResetDisplay = false;
      this.updateDisplay();
    }

    /** Append a digit or decimal point to the current input. */
    appendNumber(num) {
      if (this.shouldResetDisplay) {
        this.currentInput = '';
        this.shouldResetDisplay = false;
      }
      if (num === '.' && this.currentInput.includes('.')) {
        return; // prevent multiple decimals
      }
      // Avoid leading zeros like "00" unless after decimal point
      if (this.currentInput === '0' && num !== '.') {
        this.currentInput = num;
      } else {
        this.currentInput += num;
      }
      this.updateDisplay();
    }

    /** Choose an operator (+, -, *, /). */
    chooseOperator(op) {
      if (this.currentInput === '' && this.previousValue === null) {
        // No operand yet – ignore
        return;
      }
      if (this.previousValue !== null && this.operator && !this.shouldResetDisplay) {
        // Chain calculations: compute previous pending operation first
        this.compute();
      }
      this.previousValue = parseFloat(this.currentInput) || 0;
      this.operator = op;
      this.shouldResetDisplay = true;
    }

    /** Perform the calculation based on stored operator and values. */
    compute() {
      if (this.operator === null || this.previousValue === null) {
        return;
      }
      const current = parseFloat(this.currentInput) || 0;
      let result;
      switch (this.operator) {
        case '+':
          result = this.previousValue + current;
          break;
        case '-':
          result = this.previousValue - current;
          break;
        case '*':
          result = this.previousValue * current;
          break;
        case '/':
          if (current === 0) {
            this.displayElement.textContent = 'Error';
            this.clear();
            return;
          }
          result = this.previousValue / current;
          break;
        default:
          return;
      }
      // Trim unnecessary trailing zeros
      result = parseFloat(result.toPrecision(12));
      this.currentInput = result.toString();
      this.previousValue = null;
      this.operator = null;
      this.shouldResetDisplay = true;
      this.updateDisplay();
    }

    /** Reset calculator to its initial state. */
    clear() {
      this.currentInput = '';
      this.previousValue = null;
      this.operator = null;
      this.shouldResetDisplay = false;
      this.updateDisplay();
    }

    /** Remove the last character from the current input. */
    backspace() {
      if (this.shouldResetDisplay) {
        this.currentInput = '';
        this.shouldResetDisplay = false;
      }
      this.currentInput = this.currentInput.slice(0, -1);
      if (this.currentInput === '') {
        this.currentInput = '0';
      }
      this.updateDisplay();
    }

    /** Write the current input (or 0) to the display element. */
    updateDisplay() {
      const text = this.currentInput === '' ? '0' : this.currentInput;
      this.displayElement.textContent = text;
    }
  }

  // Expose Calculator globally for potential extensions.
  window.Calculator = Calculator;

  // Helper: map data-action attribute values to calculator methods.
  const actionMap = {
    // Numbers
    '0': (calc) => calc.appendNumber('0'),
    '1': (calc) => calc.appendNumber('1'),
    '2': (calc) => calc.appendNumber('2'),
    '3': (calc) => calc.appendNumber('3'),
    '4': (calc) => calc.appendNumber('4'),
    '5': (calc) => calc.appendNumber('5'),
    '6': (calc) => calc.appendNumber('6'),
    '7': (calc) => calc.appendNumber('7'),
    '8': (calc) => calc.appendNumber('8'),
    '9': (calc) => calc.appendNumber('9'),
    decimal: (calc) => calc.appendNumber('.'),
    // Operators
    add: (calc) => calc.chooseOperator('+'),
    subtract: (calc) => calc.chooseOperator('-'),
    multiply: (calc) => calc.chooseOperator('*'),
    divide: (calc) => calc.chooseOperator('/'),
    // Actions
    equals: (calc) => calc.compute(),
    clear: (calc) => calc.clear(),
    backspace: (calc) => calc.backspace(),
  };

  // Initialize after DOM is ready.
  document.addEventListener('DOMContentLoaded', () => {
    const calc = new Calculator('calc-display');

    // Button click handling
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action && actionMap[action]) {
          actionMap[action](calc);
        }
      });
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      // Digits
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        actionMap[key](calc);
        return;
      }
      // Decimal point
      if (key === '.' || key === ',') {
        e.preventDefault();
        actionMap['decimal'](calc);
        return;
      }
      // Operators
      if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        const map = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
        actionMap[map[key]](calc);
        return;
      }
      // Enter / =
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        actionMap['equals'](calc);
        return;
      }
      // Backspace
      if (key === 'Backspace') {
        e.preventDefault();
        actionMap['backspace'](calc);
        return;
      }
      // Escape (clear)
      if (key === 'Escape') {
        e.preventDefault();
        actionMap['clear'](calc);
        return;
      }
    });
  });
})();
