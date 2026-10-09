let prices: Record<string, number> = {
    "sv_cheats" : 100,
}

let defaultUnlocks: Record<string, boolean> = {
    "sv_cheats" : false
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