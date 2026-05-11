let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (op === '+/-') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
        return;
    }

    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput + ' ' + (op === '*' ? '×' : op === '/' ? '÷' : op);
    currentInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        case '%': result = prev % current; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}