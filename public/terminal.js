// /public/terminal.js

// const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector(".terminal-output");

// Global variables
let waitingForPassword = false;
let currentUsername = null;

function getPrompt(){
    // return "terminal@local ~ $ "
    return currentUsername === null ? "terminal@local ~ $ "
    : `${currentUsername}@local ~ $ `;  
}

// For head of terminal like usr@local$- 
function headTerminal(){
    head.textContent = getPrompt();
}
headTerminal();


// Actual commands
function clear(){
    terminalOutput.innerHTML = "";
}

function createDate(){
    let paragraph = document.createElement('p');
    paragraph.textContent = new Date();
    terminalOutput.append(paragraph);
}

function newUser(args){
    if(!args || args.length === 0){
        const paragraph = document.createElement('p');
        paragraph.textContent = "invalid username";
        terminalOutput.append(paragraph);
        console.log("invalid username");
    } 
    else {
        currentUsername = args[0];
        head.textContent = `password for ${currentUsername}: `;
        console.log("Username: ", currentUsername);
        waitingForPassword = true;
    }       
}

function newPassword(passwd){
    passwd;
    const paragraph = document.createElement("p");
    paragraph.textContent = "User created";
    terminalOutput.append(paragraph);
    headTerminal();
}

// List of commands
const commands = {
    whoami: "I am Vergil.",
    ls: "currently empty",
    touch: " creates new file",
    date: createDate,
    help: " List of commands available: whoami, ls, touch, date, useradd",
    clear: clear,
    useradd : newUser
};

// Takes the argument from the user with the commands/key and values
function commandProcess(cmd){
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

        terminalValue = terminalInput.value;
        terminalInput.value = ""; 
     
        if(waitingForPassword){
            newPassword(terminalValue);
            waitingForPassword = false;
            console.log("USer", waitingForPassword);
        } else {
            headTerminal();
            const inputHead = document.createElement("p");
            inputHead.className = "input";
            inputHead.textContent = head.textContent + terminalValue;
            terminalOutput.append(inputHead);
            commandProcess(terminalValue);
            console.log("Normal Commands");
        }
    } 
})
