import { addClicks } from "./gabenClicker"

const srcConsole = document.getElementById("source-console") as HTMLDivElement
const consoleInput = document.getElementById("console-input") as HTMLInputElement

//cool vars
let sv_cheats: boolean = false

//console commands use underscore like the valve naming convention
function _add_gabes(args: string[]): string[] {
    if (!sv_cheats) return ["Can't use cheat command add_gabes in multiplayer, unless the server has sv_cheats set to 1.", "false"]

    let gabesToAdd = parseInt(args[0], 10)

    addClicks(gabesToAdd)

    return [`Added ${gabesToAdd} GabeNs`, "true"]
}

function _sv_cheats(args: string[]): string[] {
    if (!(["True", "true", "1", "False", "false", "0"].includes(args[0]))) {
        return ["Invalid arg", "false"]
    }

    let value: boolean
    //@ts-ignore
    //In case they put "0", "0" is equal to false but converting "0" to boolean is true
    if (args[0] == "0" && args[0] == false) {
        value = false
    } else if (args[0].toLowerCase() === "true" || args[0] === "1") {
        value = true
    } else {
        value = false
    }

    sv_cheats = value
    console.log(sv_cheats)
    return ["changed value successfully", "true"]
}

const functions: string[] = [
    "sv_cheats",
    "add_gabes"

]

const commandToFunc: Record<string, CallableFunction> = {
    "sv_cheats" : _sv_cheats,
    "add_gabes" : _add_gabes,
}

function submitCommand(command: string, args: string[]) {
    let output: string = ""
    console.log(`Command: ${command}, args: ${args}`)
    if (functions.includes(command)) {
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
        consoleInput.value = ""
    }
})