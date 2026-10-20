let prices: Record<string, number> = {
    "sv_cheats" : 100,
}

let defaultUnlocks: Record<string, boolean> = {
    "sv_cheats" : false
}

let helpDescriptions: Record<string, string> = {
    "soundlist" : "soundlist [sound type]\nCurrent sound types: hl2, meme\nUse without arg to see all available sounds\nExample: soundlist hl2",
    "goon" : "Play a spicey video that shouldn't be played in work!",
    "play" : "play [hl2/meme] [sound]\nPlays a sound effect from the soundlist\nExample: play hl2 donuts",
    "crowbar" : "Use this command to retrieve your lost crowbar from black mesa - Thank you Barney!",
    "stop_time" : "stop_time [duration]\nStops time for either 4 seconds or specifed duration\nExample: stop_time 12",
    "add_gabes" : "add_gabes [amount]\nAdds a specifed amount of gabes to your score\nExample: add_gabes 69\nRequires sv_cheats to be set to 1 (true)",
    "remove_gabes" : "remove_gabes [amount]\nRemoves a specifed amount of gabes from your score\nExample: remove_gabes 420\nRequires sv_cheats to be set to 1 (true)",
    "mute_music" : "mute_music [1/true/0/false]\nMutes or unmutes the music playing in the background\nExmaple: mute_music 1 (mutes the music)",
    "patch_notes" : "Displays the latest patch notes of the website",
    "optimise" : "optimises the website to perform better on lower-end devices",
    "set_music" : "set_music [link.mp3]\nSets the background music to your specified link\nNote: the music must be mp3 only because I'm file typist",
    "sv_cheats" : "sv_cheats [1/true/0/false]\nSets the servers cheat state to allow using server-side commands\nExmaple: sv_cheats 1 (enables cheats)",
    "clear" : "Clears the console of all contents",
}

let unlocks: Record<string, boolean> = {}

function saveUnlocks(): void {
    localStorage.setItem("unlocks", JSON.stringify(unlocks))
}

export function getPrice(item: string): number | undefined {
    if (prices[item] !== undefined) {
        return prices[item]
    } else {
        return undefined
    }
}

export function getHelpDesc(command: string): string {
    const desc: string = helpDescriptions[command]
    if (desc === null || desc === "") {
        return "Command doesn't have help description yet or doesn't exist!"
    }
    return desc
}

export function purchase(item: string): void {
    switch (item) {
        case "sv_cheats":
            localStorage.setItem("sv_cheats_unlocked", "true")
            unlocks[item] = true
            saveUnlocks()
    }
}

export function checkOwnership(item: string): boolean {
    return unlocks[item]
}


document.addEventListener("DOMContentLoaded", () => {
    //Load unlocks and shit

    let unlocksTemp: Record<string, boolean> = {}

    //Just in case no save data
    if (localStorage.getItem("unlocks") === null) {
        Object.assign(unlocksTemp, defaultUnlocks)
        localStorage.setItem("unlocks", JSON.stringify(unlocksTemp))
    } else {
        unlocksTemp = JSON.parse(localStorage.getItem("unlocks") as string) as Record<string, boolean>
    }

    Object.assign(unlocks, unlocksTemp)

    console.log(unlocks)
    console.log(unlocks["sv_cheats"])
})