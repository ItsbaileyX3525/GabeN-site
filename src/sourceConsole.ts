const srcConsole = document.getElementById("source-console") as HTMLDivElement
const consoleInput = document.getElementById("console-input") as HTMLInputElement

//cool vars
let sv_cheats: boolean = false

function _sv_cheats(arg: string[]): string[] {
    if (!(arg[0] in ["True", "true", "1", "False", "false", "0"])) {
        return ["Invalid arg", "false"]
    }
    sv_cheats = Boolean(arg)
    return ["changed value successfully", "true"]
}

const functions: string[] = [
    "sv_cheats",

]

const commandToFunc: Record<string, CallableFunction> = {
    "sv_cheats" : _sv_cheats,
}

function submitCommand(command: string, args: string[]) {
    let output: string = ""
    console.log(`Command: ${command}, args: ${args}`)
    if (command in functions) {
        console.log("Command found")
        output = commandToFunc[command](args)
    }
    console.log("Command output: ", output)
    return [command, args[0]]
}

document.addEventListener("keypress", (key) => {
    if (!srcConsole) return

    if (key.key === "`" || key.key === "~") {
        if (srcConsole.classList.contains("hidden")) {
            srcConsole.classList.remove("hidden")
            srcConsole.classList.add("absolute")
        } else {
            srcConsole.classList.remove("absolute")
            srcConsole.classList.add("hidden")
        }

    }
})

consoleInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        const args = consoleInput.value.split(" ")
        const cmd = args[0]
        args.shift()
        submitCommand(cmd, args)
    }
})