const previousOperationText = document.getElementById("previous-operations");
const currentOperationText = document.getElementById("current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }


    // Adiciona digitos na tela da calculadora
    addDigit(digit){
        //Checar se a operação já tem um ponto
        if(digit == "." && this.currentOperationText.innerText.includes(".")){
            return;
        }


        this.currentOperation = digit;
        this.updateScreen();
    }


    //Processa todas as operações da calculadora
    processOperation(operation){
        //checar se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !==""){
                //trocar operações
                this.changeOperation(operation);
            }
            return;
        }

        //Pega o valor atual e o valor anterior
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;


        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue,operation, current, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }
    

    //Muda o value da tela da calculadora
    updateScreen(operationValue = null, operation = null, current=null, previous = null){
        
        console.log(operationValue,operation,current,previous)
        if(operation == null){
            this.currentOperationText.innerText +=this.currentOperation;
        }
        else{
            //Checando se o valor é zero. Se for adiciona o valor q está sendo processado
            if(previous === 0){
                operationValue = current;
            }

            //adiciona o valor atual para o valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
    changeOperation(operation){
        const mathOperations = ["+","-","*","/"];

        
        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText =
         this.previousOperationText.innerText.slice(0, -1) + operation;

    }

    //Apagar o ultimo número
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
        
    }
}

const calc = new Calculator(previousOperationText,currentOperationText);


buttons.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        const value = e.target.innerText;
        

        if(+value>=0 || value === "."){
            calc.addDigit(value)
        }
        else{
            calc.processOperation(value)
        }
    })
})
    
