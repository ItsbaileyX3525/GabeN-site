import { addClicks } from "./gabenClicker"

const srcConsole = document.getElementById("source-console") as HTMLDivElement
const consoleInput = document.getElementById("console-input") as HTMLInputElement
const consoleLogs = document.getElementById("inner-contents") as HTMLDivElement
const crowbarCursor = document.getElementById("crowbar-cursor") as HTMLDivElement
const app = document.getElementById("app") as HTMLDivElement
const hl2 = document.getElementById("literally-hl2") as HTMLIFrameElement

//Audio stuff
const GabenMusic = document.getElementById("gaben-music") as HTMLAudioElement
const GabenFullMusic = document.getElementById("gaben-music-full") as HTMLAudioElement
const GabenSong = document.getElementById("gaben-song") as HTMLAudioElement

const barneyDroppedThis = new Audio("audio/voicelines/dropped-blackmesa2.mp3")
const crowbarHit: HTMLAudioElement = new Audio("audio/clicks/half-life-crowbar.mp3")

//cool vars
let sv_cheats: boolean = false

let validSoundPaths: string[] = []

//console commands use underscore like the valve naming convention
function _add_gabes(args: string[]): string[] {
    if (!sv_cheats) return ["Can't use cheat command add_gabes in multiplayer, unless the server has sv_cheats set to 1.", "false"]

    let gabesToAdd = parseInt(args[0], 10)

    addClicks(gabesToAdd)

    return [`Added ${gabesToAdd} GabeNs`, "true"]
}

function _connect(args: string[]): string[] {
    console.log("Connecting to server!")

    const ip: string = args[0]
    if (!ip) return ["Invalid args", "false"]
    if (ip.length < 7) return ["Invalid ip", "false"] //IPs are at least 8 chars, 0.0.0.0

    //do more stuff here.
    
    return ["Connected to server", "true"]
}

function _goon(_args: string[]): string[] {
    const pregoon: string = localStorage.getItem("musicMuted") || "false"
    const videoTag = document.createElement("video")
    videoTag.src = "images/rise and shine mr freeman.mp4"
    videoTag.classList.add("absolute", "h-screen", "w-screen")
    localStorage.setItem("musicMuted", "true")
    GabenFullMusic.pause()
    GabenMusic.pause()
    GabenSong.pause()
    //Tailwind doesn't eval at runtime obvs so because these aren't added to the bundle, we have to manually style these 2
    videoTag.style.objectFit = "fill"
    videoTag.style.zIndex = "100"
    videoTag.play()
    app.appendChild(videoTag)
    setTimeout(() => {
        videoTag.remove()
        if (pregoon == "false") {
            localStorage.setItem("musicMuted", "false")
        }
    }, 24000);
    return ["Gooned", "true"]
}

function _soundlist(_args: string[]): string[] {
    fetch("audio/hlSounds/map.json")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (const [key, value] of Object.entries(data)) {
                console.log(key, value)
                addOutputToConsole("", [], `${(value as { name?: string }).name ?? ""} at: ${(value as {path?: string}).path}`)
            }
        })
    return ["", "true"]
}

function _crowbar(_args: string[]): string[] {
    barneyDroppedThis.play()
    crowbarCursor.classList.remove("hidden")
    crowbarCursor.classList.add("absolute")
    document.body.style.cursor = "none"
    return ["Crowbar found and activated", "true"]
}

function _playsound(args: string[]): string[] {
    let soundToPlay = args[0]
    const vol = parseFloat(args[1]) || 1.0

    if (!soundToPlay) return ["invalid args", "false"]

    if (!soundToPlay.endsWith(".mp3")) {
        soundToPlay += ".mp3"
    }

    const src = "audio/hlSounds/" + soundToPlay

    if (!validSoundPaths.includes(src)) return ["Sound not found", "false"]

    const audio = new Audio(src)
    audio.volume = vol
    audio.play()

    setTimeout(() => {
        audio.remove()
    }, audio.duration * 100);

    return [`Playing sound, ${soundToPlay.replace(".mp3", "")}`, "true"]
}

function _load_hl2(_args: string[]): string[] {
    hl2.classList.remove("hidden")
    hl2.classList.add("absolute")
    return ["Loaded hl2", "true"]
}

function _set_music(args: string[]): string[] {
    const musicURL = args[0]
    if (!musicURL) {
        localStorage.removeItem("musicURL")
        return ["Removed custom music", "true"]
    }

    if (!musicURL.endsWith(".mp3")) {
        return ["Invalid file, mp3, im feeling file-typist today", "false"]
    }

    localStorage.setItem("musicURL", musicURL)

    return ["Set custom music", "true"]
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
        GabenFullMusic.pause()
        GabenMusic.pause()
        GabenSong.pause()
        return ["Muted", "true"]
    } else {
        localStorage.setItem("musicMuted", "false")
        return ["Unmuted", "true"]
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
    return ["Changed value", "true"]
}

const commandToFunc: Record<string, CallableFunction> = {
    "sv_cheats" : _sv_cheats,
    "add_gabes" : _add_gabes,
    "crowbar" : _crowbar,
    "mute_music" : _mute_music,
    "goon" : _goon,
    "play" : _playsound,
    "soundlist" : _soundlist,
    "set_music" : _set_music,
    "load_hl2" : _load_hl2,
    "connect" : _connect,
}

function submitCommand(command: string, args: string[]): void {
    let output: string[] = []
    console.log(`Command: ${command}, args: ${args}`)
    for (const [key, _value] of Object.entries(commandToFunc)) { //Isn't that many to loop however for optimisation i can just save the commands to a list for easy lookup
        console.log(key)
        if (command == key) {
            console.log("Command found")
            output = commandToFunc[command](args)
            break
        } else {
            output = [`Unknown command: ${command}`, "false"]
        }
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
    
    if (key.key == "#") {
        hl2.classList.add("hidden")
        hl2.classList.remove("absolute")
        hl2.src = hl2.src //reload the iframe
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

document.addEventListener("mousemove", (e) => {
    crowbarCursor.style.left = (e.clientX - 25) + "px"
    crowbarCursor.style.top = (e.clientY - 5) + "px"
})

document.addEventListener("mousedown", () => {
    if (crowbarCursor.classList.contains("absolute")) {
        let newAudio: HTMLAudioElement = new Audio(crowbarHit.src)
        newAudio.play()
        setTimeout(() => {
            newAudio.remove()
        }, newAudio.duration * 100);
    }

    crowbarCursor.style.transform =`rotate(-40deg)`
})

document.addEventListener("mouseup", () => {
    crowbarCursor.style.transform =`rotate(0deg)`
})

document.addEventListener("DOMContentLoaded", async () => {
    interface SoundItem {
    name: string;
    path: string;
    }

    const response = await fetch("audio/hlSounds/map.json");
    const data: SoundItem[] = await response.json(); // Type the parsed JSON directly

    data.forEach((element) => {
        validSoundPaths.push(element.path)
    });

    
})