const add = (num1, num2) => num1 + num2

const subtract = (num1, num2) => num1 - num2

const multiply = (num1, num2) => num1 * num2

const divide = (num1, num2) => {
  if (num2 === 0) {
    throw new Error(`Nice try! Can't divide by zero.`)
  }
  return num1 / num2
}

const operate = (operator, num1, num2) => {
  switch (operator) {
    case '+': return add(num1, num2)
    case '-': return subtract(num1, num2)
    case 'x': return multiply(num1, num2)
    case '÷': return divide(num1, num2)
    default: return num2
  }
}

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
   // Add slider effect for long numbers
   display.style.overflow = 'auto' // Enable horizontal scrolling
   display.style.whiteSpace = 'nowrap' // Prevent text wrapping

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
  zero.classList.add('number')
  numbers.appendChild(zero)
  const equals = document.createElement('button')
  equals.textContent = '='
  equals.classList.add('equals')
  numbers.appendChild(equals)

  // create operators
  const operators = document.createElement('div')
  operators.classList.add('operators')
  buttons.appendChild(operators)
  const cancel = document.createElement('button')
  cancel.classList.add('cancel')
  cancel.textContent = 'C'
  operators.appendChild(cancel)
  const operatorsArray = ['+', '-', 'x', '÷']
  operatorsArray.forEach(symbol => {
    const operatorBtn = document.createElement('button')
    operatorBtn.textContent = symbol
    operatorBtn.classList.add('operator')
    operators.appendChild(operatorBtn)
  })
}

let firstNumber = null
let secondNumber = null
let currentOperator = null
let resetDisplay = false
let resultDisplayed = false

// Helper function to format numbers for display
const formatDisplayNumber = (number) => {
  const numStr = number.toString()

  if (numStr.length > 12) {
    return parseFloat(number).toExponential(8)
  }

  return numStr
}

// Scroll display to the end when content changes
const scrollDisplayToEnd = (display) => {
  // Use setTimeout to ensure this runs after the display content has been updated
  setTimeout(() => {
    display.scrollLeft = display.scrollWidth
  }, 0)
}

const setupCalculator = () => {
  createCalculator()

  const display = document.querySelector('.display')
  const numberButtons = document.querySelectorAll('.number')
  const operatorButtons = document.querySelectorAll('.operator')
  const equalsButton = document.querySelector('.equals')
  const cancelButton = document.querySelector('.cancel')

  numberButtons.forEach(button => button.addEventListener('click', () => {
    // clear display if we just got a result or need to reset
    if (resetDisplay || resultDisplayed) {
      display.textContent = ''
      resetDisplay = false
      resultDisplayed = false
    }

    // don't allow multiple leading zeros
    if (display.textContent === '0' && button.textContent === '0') return

    if (display.textContent === '0' && button.textContent !== '0') {
      display.textContent = button.textContent
    } else {
      display.textContent += button.textContent
    }

    scrollDisplayToEnd(display)
  }))

  operatorButtons.forEach(button => button.addEventListener('click', () => {
    // if we've just displayed a result, just set it as the first number
    // else if we already have a first number and operator, evaluate the current pair
    // otherwise this is our first operation, so store the first number
    if (resultDisplayed) {
      firstNumber = parseFloat(display.textContent)
      resultDisplayed = false
    } else if (firstNumber && currentOperator && !resetDisplay) {
      try {
        secondNumber = parseFloat(display.textContent)
        const result = operate(currentOperator, firstNumber, secondNumber)
        display.textContent = formatDisplayNumber(result)
        firstNumber = result

        scrollDisplayToEnd(display)
      } catch (error) {
        display.textContent = error.message
        firstNumber = null
        currentOperator = null
        resetDisplay = true

        scrollDisplayToEnd(display)
        return
      }
    } else if (!resetDisplay) {
      firstNumber = parseFloat(display.textContent)
    }

    currentOperator = button.textContent
    resetDisplay = true
  }))

  equalsButton.addEventListener('click', () => {
    // Don't do anything if we don't have all needed components
    if (!firstNumber || resetDisplay || !currentOperator) return

    try {
      secondNumber = parseFloat(display.textContent)
      const result = operate(currentOperator, firstNumber, secondNumber)
      display.textContent = result.toString()

      firstNumber = null
      secondNumber = null
      resetDisplay = true

      scrollDisplayToEnd(display)
    } catch (error) {
      display.textContent = error.message
      firstNumber = null
      secondNumber = null
      currentOperator = null
      resetDisplay = true

      scrollDisplayToEnd(display)
    }
  })

  cancelButton.addEventListener('click', () => {
    display.textContent = '0'
    firstNumber = null
    secondNumber = null
    currentOperator = null
    resetDisplay = false

    // reset scroll position
    display.scrollLeft = 0
  })
}

setupCalculator()