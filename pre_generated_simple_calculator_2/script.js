// Define variables for storing the current calculation
let currentCalculation = '';
let currentResult = '';

// Function to handle button clicks
function handleButtonClick(value) {
  // Check if the value is a number or an operator
  if (!isNaN(value) || value === '.' || value === '+' || value === '-' || value === '*' || value === '/') {
    // Append the value to the current calculation
    currentCalculation += value;
    updateDisplay();
  } else if (value === '=') {
    // Perform the calculation when '=' is clicked
    currentResult = performCalculation(currentCalculation);
    updateDisplay();
    currentCalculation = currentResult;
  } else if (value === 'C') {
    // Clear the calculation and result when 'C' is clicked
    currentCalculation = '';
    currentResult = '';
    updateDisplay();
  }
}

// Function to perform calculations
function performCalculation(calculation) {
  try {
    return eval(calculation);
  } catch (error) {
    return 'Error';
  }
}

// Function to update the display
function updateDisplay() {
  // Assuming there's an element with the id 'display' in your HTML
  document.getElementById('display').innerText = currentCalculation ? currentCalculation : currentResult;
}