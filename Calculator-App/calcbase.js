let runningTotal = 0;
let buffer = "0";
let previousOperator= null;


const screen = document.querySelector('.screen');
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
            
            case '.':
                if (!buffer.includes('.')) {
                    buffer += '.';
                }
                break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    const floatBuffer = parseFloat(buffer);
    const prevTotal = parseFloat(runningTotal);
    
    if (previousOperator === '+') {
        runningTotal = prevTotal + floatBuffer;
    } else if (previousOperator === '-') {
        runningTotal = prevTotal - floatBuffer;
    } else if (previousOperator === 'x') {
        runningTotal = prevTotal * floatBuffer;
    } else if (previousOperator === '÷') {
        runningTotal = prevTotal / floatBuffer;
    }
}


function handleNumber(numberString) {
    if (numberString === "." && buffer.includes(".")) {
        return;
    }
    if (buffer === "0") {
        if (numberString === ".") {
            buffer = "0.";
        } else {
            buffer = numberString;
        }
    } else {
        buffer += numberString;
    }
}

function init() {
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        });
    });
}

init();