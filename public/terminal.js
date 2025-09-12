// /public/terminal.js

// const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector(".terminal-output");
// const terminalResult = document.querySelector("#terminal-result");



function clear(){
    terminalOutput.innerHTML = "";
}

function newUser(args){
    if(!args || args.length === 0){
        let add = document.createElement('p');
        add.textContent = "invalid username";
        terminalOutput.append(add);
        console.log("invalid username");
    } else{
        console.log(`new user: ${args}`);
        let add = document.createElement('p');
        add.textContent = `new user: ${args[0]}`;
        terminalOutput.append(add);
    }
}

const commands = {
    whoami: "I am Vergil.",
    ls: "currently empty",
    touch: " creates new file",
    help: " List of commands available: whoami, ls, touch ",
    clear: clear,
    // user: getUser,
    useradd : newUser
};

// For head of terminal like usr@local$- 
const head = document.querySelector("#head");
head.textContent = "usr@local ~ $ ";


function commandProcess(cmd){
    // Takes the argument from the user with the commands/key and values
    const parts = cmd.split(" ");
    const command = parts[0]; 
    const args = parts.slice(1); 
    let userInput = commands[command];

    if (typeof userInput === "function" ) {
        userInput(args); // function commands run first
    } 
    
    else if (userInput) {
        // handle string responses
        let cmdResult = document.createElement("p");
        cmdResult.textContent = userInput;
        terminalOutput.append(cmdResult);
        } else {
            let error = document.createElement("p");
            error.textContent = "command not found";
            console.log("command not found");
            terminalOutput.append(error);
        }

}

terminalInput.addEventListener("keydown", function(e) {
    if(e.key === "Enter" && !e.shiftKey){
        const terminalValue = terminalInput.value;
        terminalInput.value = "";


        const inputHead = document.createElement("p");
        inputHead.className = "input";
        inputHead.textContent = head.textContent + terminalValue;
        terminalOutput.append(inputHead);

        commandProcess(terminalValue);
    }
})


