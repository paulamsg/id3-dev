const firstNumber = [];
const secondNumber = [];
let typingSecond = false;
let typeOperator = null;
// 0BTENEMOS EL VALOR DE LA TECLA CUANDO HACEMOS CLICK
document.querySelectorAll('.keys div').forEach(key => {
    key.addEventListener('click', (event) => {   
        let valueKey = event.currentTarget.id;
        createNumbersArray(valueKey)
    });
});

// AÑADIR Q SE VEA POR PANTALLA
function createNumbersArray(valueKey){
    const isOperationKey = ["+","-","/","%","X"].includes(valueKey);
    let operator = null;
    let n1 ="";
    let n2 ="";

    if(valueKey !== "="){
        if(isOperationKey && typingSecond===false){
            operator = true;
            typeOperator = valueKey;
            typingSecond = true;
            console.log("Operator:", typeOperator);
            return;
        }if (!isOperationKey && !typingSecond  ){
            firstNumber.push(valueKey);
            console.log("Primer numero:", firstNumber);
            return;
        }
        if(typingSecond && !isOperationKey ){
            secondNumber.push(valueKey);
            console.log("Segundo numero:", secondNumber);
            return;
        }
    }else{
        console.log("operadorrrrr:", valueKey)
        for(let i =0; i<firstNumber.length; i++){
            n1 += firstNumber[i];
            console.log("n1:", n1)
        }
        for(let i=0; i<secondNumber.length; i++){
            n2 += secondNumber[i];
            console.log("n2:", n2)
        }
        
    }
    console.log("NUMERO 1:",n1);
    console.log("NUMERO 2:",n2);
    console.log("TYPE OPERATOR:",typeOperator);
    operations(n1,n2,typeOperator);
}

function operations(n1,n2, typeOperator){
    console.log("Voy a operar con estos daots:", n1, n2, typeOperator)
}
