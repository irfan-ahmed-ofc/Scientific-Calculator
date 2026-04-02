let currentInput = "0";
let shouldResetDisplay = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = currentInput;
}

function pushSymbol(symbol) {
    if (currentInput === "0" || shouldResetDisplay) {
        if (symbol === '.') {
            currentInput = "0.";
        } else if (symbol === 'π') {
            currentInput = Math.PI.toString();
        } else if (symbol === 'e') {
            currentInput = Math.E.toString();
        } else if (symbol === 'EXP') {
            currentInput = "0*10^";
        } else {
            currentInput = symbol;
        }
        shouldResetDisplay = false;
    } else {
        if (symbol === 'π') {
            currentInput += Math.PI;
        } else if (symbol === 'e') {
            currentInput += Math.E;
        } else if (symbol === 'EXP') {
            currentInput += "*10^";
        } else {
            currentInput += symbol;
        }
    }
    updateDisplay();
}

function pushFunction(func) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = func + "(";
        shouldResetDisplay = false;
    } else {
        currentInput += func + "(";
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}

function calculate() {
    try {
       
        let result = eval(currentInput.replace('^', '**')); 
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
        shouldResetDisplay = true;
    }
}