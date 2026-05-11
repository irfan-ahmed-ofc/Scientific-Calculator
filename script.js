let expression = "0";
let isEvaluated = false;

const displayEl = document.getElementById('display');
const historyEl = document.getElementById('history');

function updateDisplay() {
    let formatted = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    displayEl.innerText = formatted;
}

function pushSymbol(symbol) {
    if (expression === "0" || isEvaluated) {
        expression = symbol;
        isEvaluated = false;
    } else {
        expression += symbol;
    }
    updateDisplay();
}

function pushFunc(func) {
    if (expression === "0" || isEvaluated) {
        expression = func;
        isEvaluated = false;
    } else {
        expression += func;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = "0";
    historyEl.innerText = "";
    updateDisplay();
}

function backspace() {
    if (expression.length > 1) {
        expression = expression.slice(0, -1);
    } else {
        expression = "0";
    }
    updateDisplay();
}

function calculate() {
    try {
        let result = math.evaluate(expression);  
        historyEl.innerText = expression.replace(/\*/g, '×').replace(/\//g, '÷') + " =";   
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(5));
        }
        
        expression = result.toString();
        isEvaluated = true;
        updateDisplay();
    } catch (error) {
        displayEl.innerText = "Error";
        expression = "0";
        isEvaluated = true;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') pushSymbol(e.key);
    if (e.key === '+') pushSymbol('+');
    if (e.key === '-') pushSymbol('-');
    if (e.key === '*') pushSymbol('*');
    if (e.key === '/') pushSymbol('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
});