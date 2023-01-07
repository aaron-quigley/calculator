
input = document.getElementById('input');
calculation = document.getElementById('calculation')

buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener("click", (e) => enterInput(e.target)));

let operatorSelected = "";
let decimal = false;

function enterInput (number) {
    if (number.innerText === "CLEAR") {
        input.innerText = "";
        calculation.innerText = "";
        operatorSelected = "";
        decimal = false;
        return;
    }

    if (number.innerText === "DELETE") {
        if (checkLastNumber() === "decimal") decimal = false;
        else if (checkLastNumber() === "operator") operatorSelected = "";
        if (input.innerText.length > 0) {
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
        }
        return;
    }
    if (input.innerText.length > 14) return;
    if (number.classList.contains("operator")) {
        handleOperator(number);
        return;
    }
    input.innerText += number.innerText;
}

function handleOperator(operator) {
    if (operator.innerText === "." && decimal === true) return;
    if (operator.innerText === "." && decimal === false) {
        decimal = true;
        input.innerText += ".";
        return;
    }
    if (!operatorSelected) {
        if (operator.innerText === "=") return;
        operatorSelected = operator.innerText;
        input.innerText += operatorSelected;
        decimal = false;
    }
    else if (checkLastNumber() === "number") {
        if (operator.innerText === ".") return;
        answer = calculate();
        input.innerText = Math.round((answer + Number.EPSILON) * 100000) / 100000;
        operatorSelected = "";
        decimal = false;
        return;
    }
}

function checkLastNumber() {
    let lastNumber = input.innerText[input.innerText.length - 1];
    if (lastNumber === ".") return "decimal";
    lastNumber = Number(lastNumber);
    if (lastNumber) return "number";
    else return "operator";
}

function calculate() {
    const string = input.innerText.split(operatorSelected);
    const a = Number(string[0]);
    const b = Number(string[1]);
    calculation.innerText = `${a} ${operatorSelected} ${b}`;
    console.log(`${a} ${operatorSelected} ${b}`)
    switch (operatorSelected) {
        case "x":
            return a * b;
        case "÷":
            return a / b;
        case "+":
            return a + b;
        case "-":
            return a - b;
    }
}



