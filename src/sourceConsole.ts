import { addClicks } from "./gabenClicker"
import { muteMusic } from "./main"

const srcConsole = document.getElementById("source-console") as HTMLDivElement
const consoleInput = document.getElementById("console-input") as HTMLInputElement
const consoleLogs = document.getElementById("inner-contents") as HTMLDivElement

//Audio stuff

const barneyDroppedThis = new Audio("audio/voicelines/dropped-blackmesa.mp3")

//cool vars
let sv_cheats: boolean = false

//console commands use underscore like the valve naming convention
function _add_gabes(args: string[]): string[] {
    if (!sv_cheats) return ["Can't use cheat command add_gabes in multiplayer, unless the server has sv_cheats set to 1.", "false"]

    let gabesToAdd = parseInt(args[0], 10)

    addClicks(gabesToAdd)

    return [`Added ${gabesToAdd} GabeNs`, "true"]
}

function _crowbar(args: string[]): string[] {
    barneyDroppedThis.play()
    return ["Crowbar found and activated", "true"]
}

function _mute_music(args: string[]): string[] {
    if (!(["True", "true", "1", "False", "false", "0"].includes(args[0]))) {
        return ["Invalid arg", "false"]
    }
    let value: boolean

    //@ts-ignore
    if (args[0] == "0" && args[0] == false) {
        value = false
    } else if (args[0].toLowerCase() === "true" || args[0] === "1") {
        value = true
    } else {
        value = false
    }

    if (value) {
        localStorage.setItem("musicMuted", "true")
        muteMusic()
        return ["muted", "true"]
    } else {
        localStorage.setItem("musicMuted", "false")
        return ["unmuted", "true"]
    }
}

function _sv_cheats(args: string[]): string[] {
    if (!(["True", "true", "1", "False", "false", "0"].includes(args[0]))) {
        return ["Invalid arg", "false"]
    }

    let value: boolean
    //@ts-ignore
    //In case they put "0", "0" is equal to false but converting "0" to boolean is true
    //Considering i had to put ts ignore there is probably a better way to express it...
    // BUT I DONT GIVE A FUCK!
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
    "add_gabes",
    "crowbar",
    "mute_music",

]

const commandToFunc: Record<string, CallableFunction> = {
    "sv_cheats" : _sv_cheats,
    "add_gabes" : _add_gabes,
    "crowbar" : _crowbar,
    "mute_music" : _mute_music,
}

function submitCommand(command: string, args: string[]): void {
    let output: string[] = []
    console.log(`Command: ${command}, args: ${args}`)
    if (functions.includes(command)) {
        console.log("Command found")
        output = commandToFunc[command](args)
    } else {
        output = [`Unknown command: ${command}`, "false"]
    }
    console.log("Command output: ", output)
    addOutputToConsole(command, args, output[0])
}

function addOutputToConsole(input: string, optArgs: string[], output: string): void {
    if (input) {
        let inputString: string = input
        for (let e of optArgs) {
            inputString += " " + e
        }
        const pTag = document.createElement("p")
        pTag.style.color = "#b9babc"
        pTag.innerText = "> " + inputString
        consoleLogs.appendChild(pTag)
    }
    if (output) {
        const pTag = document.createElement("p")
        pTag.style.color = "#f5f7f7"
        pTag.innerText = output
        consoleLogs.appendChild(pTag)
    }
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