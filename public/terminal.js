const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector(".terminal-output");
const terminalResult = document.querySelector("#terminal-result");

const commands = {
    // "ls",
    // "cat",
    whoami: "My name is Joel Limbu",
    ls: "Empty",
};

// For head of terminal like usr@local$- 
const head = document.querySelector("#head");
head.textContent = "usr@local ~ $ ";


function commandProcess(cmd){
  

}

terminalInput.addEventListener("keydown", function(e) {
    if(e.key === "Enter" && !e.shiftKey){
        const terminalValue = terminalInput.value;
        terminalInput.value = "";

        commandProcess(terminalValue);

        const inputHead = document.createElement("p");
        inputHead.textContent = head.textContent + terminalValue;
        terminalOutput.append(inputHead);

        // terminalResult.append(commandInput);

    }
})

