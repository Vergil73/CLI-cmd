// /public/terminal.js

// const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector(".terminal-output");

// Global variables
let waitingForPassword = false;
let currentUsername = null;

function clear(){
    terminalOutput.innerHTML = "";
}

function createDate(){
    const date = new Date();
    let paragraph = document.createElement('p');
    paragraph.textContent = new Date()
    terminalOutput.append(paragraph);
}

function newPassword(){
    const terminalValue = terminalInput.value;
    terminalInput.value = "";

    const passwdHead = document.createElement("p");
    passwdHead.className = "input";
    passwdHead.textContent = `password for ${currentUsername}: ` + terminalValue;
    terminalOutput.append(passwdHead);    
}

function newUser(args){
    if(!args || args.length === 0){
        const paragraph = document.createElement('p');
        paragraph.textContent = "invalid username";
        terminalOutput.append(paragraph);
        console.log("invalid username");
    } else{
        waitingForPassword = true;
        currentUsername = args[0];
      // console.log(`new user: ${username}`);
    }  
       
}

const commands = {
    whoami: "I am Vergil.",
    ls: "currently empty",
    touch: " creates new file",
    date: createDate,
    help: " List of commands available: whoami, ls, touch, date ",
    clear: clear,
    useradd : newUser
};

// For head of terminal like usr@local$- 
const head = document.querySelector("#head");
head.textContent = `usr@local ~ $ `;

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

        if(waitingForPassword){
            newPassword();
            console.log("waiting for password: ",waitingForPassword);
            waitingForPassword = false;
        } else {
        commandProcess(terminalValue);
            console.log("Normal commands");
        }

    } 
})
