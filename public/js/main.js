const GabeNMusic = document.getElementById("gabe-music")
const GabeNFullMusic = document.getElementById("gabe-full-music")

document.addEventListener("click", () => {
    if (GabeNMusic.paused || GabeNFullMusic.paused) {
        GabeNMusic.play()
    }
})

while (true) {
    console.log(GabeNMusic.currentTime)
}