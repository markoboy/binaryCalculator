// Create the results container element.
const res = document.createElement('div');
res.id = 'res';

document.body.appendChild(res);

// Create the buttons container element.
const btns = document.createElement('div');
btns.id = 'btns';

// Create the buttons data that we need to create.
const btnsData = [
    { id: 'btn0', text: 0},
    { id: 'btn1', text: 1},
    { id: 'btnClr', text: 'C'},
    { id: 'btnEql', text: '='},
    { id: 'btnSum', text: '+'},
    { id: 'btnSub', text: '-'},
    { id: 'btnMul', text: '*'},
    { id: 'btnDiv', text: '/'},
];

const operators = /(\+|\-|\*|\/)$/;

// Clear the results container.
const clearRes = () => res.innerHTML = '';

// Evaluate the results.
const evalRes = () => {
    // If the results container ends with an operator or is empty then return.
    if (operators.test(res.innerHTML) || res.innerHTML === '') return;
    
    // Create a regExp to match all the binary and convert them to decimal.
    let binary = /(0|1)+/g;
    
    // Replace the binary with decimals.
    let replaced = res.innerHTML.replace(binary, (match) => parseInt(match, 2));
    
    // Evaluate the expression and round to the nearest integer.
    let results = Math.round(eval(replaced));
    
    // Convert the results into binary.
    results = results.toString(2);
    
    // Display the results to the res container.
    res.innerHTML = results;
};

// Add the operand to the results container.
const addOperand = (e) => {
    // Get the operand from the button clicked.
    let operand = e.target.innerHTML;
    // Add the operand to the res container.
    res.innerHTML += operand;
};

// Add the operator to the results container.
const addOperator = (e) => {
    // If the results screen is empty then return.
    if (res.innerHTML === '') return;
    
    // Get the operator from the button clicked.
    let operator = e.target.innerHTML;
    
    // Check if there is an operator already.
    if (operators.test(res.innerHTML)) {
        // Replace the operator if there is already an operator.
        res.innerHTML = res.innerHTML.replace(operators, operator);
    } else {
        // Add the operator to the res container.
        res.innerHTML += operator;
    }
}

// Loop through the buttons and create them.
btnsData.forEach( btn => {
    // Create the button element.
    let el = document.createElement('button');
    // Add the appropriate id and inner text.
    el.id = btn.id;
    el.innerHTML = btn.text;
    // Append the button to the btns container.
    btns.appendChild(el);
    
    // Add a click listener for the operands.
    let operands = /btn(0|1)$/;
    if (operands.test(btn.id)) el.addEventListener('click', addOperand);
    
    // Add a click listener for the operators.
    if (operators.test(btn.text)) el.addEventListener('click', addOperator);
    
    // Add a click listener for the clear and evaluation buttons.
    if (btn.text === 'C') el.addEventListener('click', clearRes);
    if (btn.text === '=') el.addEventListener('click', evalRes);
});

document.body.appendChild(btns);