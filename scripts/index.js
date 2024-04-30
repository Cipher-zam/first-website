
const buttonsList = [
    '1', '2', '3', '%', 'AC',
    '4', '5', '6', '/', '*',
    '7', '8', '9', '+', '-', 
    '0', '.', '(', ')', '='
]

let instruction = '';
let lastInstructionError = false;


function buttonCommand(buttonTxt)
{   
    console.log(lastInstructionError);

    if(buttonTxt === 'AC')
    {
        resetInstruction();
        resetError();
        return undefined;
    }   
    else if(buttonTxt === '=')
    {
        let temp_instruction = instruction;
        try {
            temp_instruction = eval(temp_instruction);
        } catch (error) {
            temp_instruction = error;
            lastInstructionError = true;
        }
        resetInstruction();
        return temp_instruction;
    }
    else
        if(!lastInstructionError)
            return buttonTxt;
        else{
            resetInstruction();
            resetError();
            return buttonTxt;
        }
}

function resetInstruction()
{
    instruction = '';
}

function resetError()
{
    if(lastInstructionError)
        lastInstructionError = false;
}

function setValueOnScreen(value)
{
    const screenElemnt = document.querySelector('.js-screen');
    if(value)
        screenElemnt.value = value;
    else
        screenElemnt.value = '0';
}

function renderAll()
{
    const buttonsContainerElement = document.querySelector('.js-buttons-container');
    

    html = '';

    buttonsList.forEach(
        (button)=>{
            html += `
                <button class='js-button'>${button}</button>
            `;
        }
    );


    buttonsContainerElement.innerHTML = html;

    setValueOnScreen(instruction);
    
    
}

function addEventsListener()
{
    document.querySelectorAll('.js-button').forEach( (button)=>{
        button.addEventListener('click', ()=>{

            const retButtonCommand = buttonCommand(button.innerText);
            if(retButtonCommand)
                instruction += retButtonCommand;

            update();
            
        })
    }

    );
}

function update()
{
    renderAll();
    addEventsListener();
}




update();
