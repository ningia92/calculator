const add = (num1, num2) => num1 + num2

const subtract = (num1, num2) => num1 - num2

const multiply = (num1, num2) => num1 * num2

const divide = (num1, num2) => num1 / num2

let num1 = 2
let num2 = 3
let operator = add

const operate = (operator, num1, num2) => operator(num1, num2)

const createCalculator = () => {
  const container = document.querySelector('.container')
  const calculator = document.createElement('div')
  calculator.classList.add('calculator')
  container.appendChild(calculator)

  // create display
  const display = document.createElement('div')
  display.classList.add('display')
  display.textContent = '0'
  calculator.appendChild(display)

  // create buttons container
  const buttons = document.createElement('div')
  buttons.classList.add('buttons')
  calculator.appendChild(buttons)

  // create numbers grid (3x3 + 0)
  const numbers = document.createElement('div')
  numbers.classList.add('numbers')
  buttons.appendChild(numbers)

  // create numbers from 1 to 9 into a 3x3 grid
  const numOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3]
  numOrder.forEach(num => {
    const numButton = document.createElement('button')
    numButton.textContent = num
    numButton.classList.add('number')
    numbers.appendChild(numButton)
  })

  // add zero and equals under the 3x3 grid
  const zero = document.createElement('button')
  zero.textContent = '0'
  zero.classList.add('number', 'zero')
  numbers.appendChild(zero)
  const equals = document.createElement('button')
  equals.textContent = '='
  equals.classList.add('equals')
  numbers.appendChild(equals)

  // create operators
  const operators = document.createElement('div')
  operators.classList.add('operators')
  buttons.appendChild(operators)
  const operatorsArray = ['C', '+', '-', 'x', '÷']
  operatorsArray.forEach(symbol => {
    const operatorBtn = document.createElement('button')
    operatorBtn.textContent = symbol
    operatorBtn.classList.add('operator')
    operators.appendChild(operatorBtn)
  })
}

const populateDisplay = () => {
  const digits = document.querySelectorAll('.number')
  const display = document.querySelector('.display')
  digits.forEach(digit => digit.addEventListener('click', () => display.textContent = digit.textContent))
}

createCalculator()

populateDisplay()