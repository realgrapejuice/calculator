"use strict";
class Calculator {
  constructor(previousOperandValue, currentOperandValue) {
    this.previousOperandValue = previousOperandValue;
    this.currentOperandValue = currentOperandValue;
    this.clear();
  }

  clear() {
    this.previousValue = "";
    this.currentValue = "";
    this.operation = "";
  }

  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  appendNum(num) {
    if (num === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue + num;
  }

  chooseOperation(operation) {
    if (this.currentValue === "") return;
    if (this.currentValue !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentValue = computation;
    this.operation = "";
    this.previousValue = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number;
    let integerDisplay;
    if (isNaN(integerDisplay)) {
      integerDisplay = "";
    } else {
      integerDisplay = stringNumber;
    }
    if (stringNumber !== null) {
      return stringNumber;
    }
  }

  updateDisplay() {
    this.currentOperandValue.innerText = this.getDisplayNumber(
      this.currentValue
    );
    if (this.operation !== null) {
      this.previousOperandValue.innerText = `${this.getDisplayNumber(
        this.previousValue
      )} ${this.operation}`;
    } else {
      this.previousOperandValue.innerText = ``;
    }
  }
}

const previousOperandValue = document.querySelector(".previous-operand");
const currentOperandValue = document.querySelector(".current-operand");
const clearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");
const numBtn = document.querySelectorAll("[data-number]");
const operBtn = document.querySelectorAll("[data-operation]");

const calculator = new Calculator(previousOperandValue, currentOperandValue);

numBtn.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  })
);

operBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
