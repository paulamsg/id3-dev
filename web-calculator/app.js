const calculation = [];
const calculation_join = [];

let result = 0;
const operators = ["+","-","/","%","x"];
const operatorHTML =  document.querySelector('#operator');
const result_showHTML =  document.querySelector('#result');
result_showHTML.textContent = "0";


document.querySelectorAll('.keys div').forEach(key => {
    key.addEventListener('click', (event) => {  
        let valueKey = event.currentTarget.id;
        
        createNumbersArray(valueKey)
    });
});

function createNumbersArray(valueKey){
    result_showHTML.textContent = "";
    if (valueKey === "C") {
        result_showHTML.textContent = "0";
        operatorHTML.textContent="";
        calculation.length=0;
        calculation_join.length=0;
        return;
    }
    if(valueKey !== "="){
        if(valueKey ==="%"){
            let lastNum = "";
            for(let i = calculation.length - 1; i >= 0 && !operators.includes(calculation[i]); i--) {
                lastNum = calculation[i] + lastNum;
                console.log("lastNum acumulado:", lastNum, "lastNumIndex:", i);
            }
            console.log("lastNum final:", lastNum);
            if(lastNum) {
                const percentage = Number(lastNum) / 100;
                const itemsToRemove = lastNum.length;
                calculation.splice(calculation.length - itemsToRemove, itemsToRemove, String(percentage));
                console.log("Después de splice:", calculation);
            }
        updateDisplay();
        return;
        }
        calculation.push(valueKey);
        console.log("OPERACIONES", calculation);
        updateDisplay();
        return;
    }else{
        normalizeCalculation(calculation);
    }
}

function normalizeCalculation(calculation){
    let numbers = "";
    for(let i = 0; i < calculation.length; i++){
        if(!operators.includes(calculation[i])){
            numbers += calculation[i];
        }else{
            if(numbers) {
                calculation_join.push(numbers);
                numbers = "";
            }
            calculation_join.push(calculation[i]); //metemos el operador
        }
    }
    if(numbers) {
        calculation_join.push(numbers);
    }
    console.log("ARRAY:", calculation_join);
    operations(calculation_join);
}
function updateDisplay() { //mirar
    operatorHTML.textContent = calculation.join("");
}

function operations(calculation_join){
    operator.textContent="";
    console.log("array que le pasamos a los calculos:", calculation_join);
    let numbers_separated =[];
    let operadores_separated =[];
    for(let i=0; i< calculation_join.length;i++){
        if(operators.includes(calculation_join[i])){
            operadores_separated.push(calculation_join[i]);  
            console.log("operadores:", operadores_separated)  
        }else{
            numbers_separated.push(calculation_join[i]);
            console.log("numeros:", numbers_separated)
        }
    }
    result = Number(numbers_separated[0]);
    for(let i=0; i< operadores_separated.length;i++){
        let num = numbers_separated[i + 1];

        if(operadores_separated[i]==="+"){
            result +=Number(num);
        }
        if(operadores_separated[i]==="-"){
            result -= Number(num);
        }
        if(operadores_separated[i]==="x"){
            result *= Number(num);
        }
        if(operadores_separated[i]==="/"){
            result /= Number(num);
        }
    }

    console.log("Resultado",result);
    result_showHTML.textContent = result;
}
