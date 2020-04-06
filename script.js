class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    appendNumber(number) {
        // includes: 배열이 특정 요소를 포함하고 있는지 판별합니다.
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number 
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return // 숫자없이 연산자를 클릭할 수 없으니
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand + this.operation
        this.currentOperand = ''
    }

    clear() {
        this.currentOperand = '' 
        this.previousOperand = ''
        this.operation = undefined // ????
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    compute() {      
        let computation
        const prev = parseFloat(this.previousOperand) // parseFloat 안하면 '' 도 숫자로 인식함
        const current = parseFloat(this.currentOperand)
        // prev가 숫자가 아니면 -> 연산자를 입력한 상태면 또는 current에 값이 없는데 계산 시도 시
        if (isNaN(prev) || isNaN(current)) return         
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        // 만약 클릭한게 equals이면 previous는 초기화
        this.previousOperand = ''
        //this.operation = undefined // 초기화 하지 않으면 무슨 에러가 발생할까?
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString() // 천 단위마다 쉼표 표시
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.currentOperand
            // this.getDisplayNumber(this.currentOperand)
        this.previousTextElement.innerText = this.previousOperand        
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousTextElement = document.querySelector('[data-previous-operand]')
const currentTextElement = document.querySelector('[data-current-operand]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete')

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// 연산자를 클릭하면 current에 있던 숫자가 previous로 이동하면서 연산자도 같이 표시됨
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()    
    calculator.updateDisplay()    
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})