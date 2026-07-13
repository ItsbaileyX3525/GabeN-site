//Imports from things like gabeClicker
import "./gabenClicker"
import "./sourceConsole"

//DOM references
const GabenMusic = document.getElementById("gaben-music") as HTMLAudioElement
const GabenFullMusic = document.getElementById("gaben-music-full") as HTMLAudioElement
const GabenSong = document.getElementById("gaben-song") as HTMLAudioElement
const subtitles = document.getElementById("song-subtitles") as HTMLParagraphElement
const app = document.getElementById("app") as HTMLDivElement

//Timers for subtitles & other stuff related
const GabenMusicTime: number = 2.331
const GabenMusicFullTime: number = 86.2
const MaxGabenMusicTime: number = 4
const MaxGabenMusicFullTime: number = 88

const letterWait: number = 550
const letterWait2: number = 220
let currentLetter: number = 0

let doingSubtitles: boolean = false

let subtitleInterval1: number | undefined
let subtitleInterval2: number | undefined

let subtitleText = [
  "G", "A", "B", "E",
  "G", "A", "B", "E", "N"
]

document.addEventListener("click", () => {
  if (!(GabenFullMusic && GabenMusic && GabenSong)) {
    return
  }

  const rng: number = Math.floor(Math.random() * 100) + 1

  if (GabenFullMusic.paused && GabenMusic.paused && GabenSong.paused) {
    if (rng >= 89 && rng < 97) {
      GabenFullMusic.play()
    } else if (rng < 89){
      GabenMusic.play()
    } else if (rng >= 97) {
      GabenSong.play()
    }
  }
})

function doSubtitles() {
  subtitles.innerText = ""
  subtitles.innerText += subtitleText[currentLetter]
  currentLetter++

  function doFinale() {
    subtitles.innerText = "GabeN"
    setTimeout(() => {
      subtitles.innerText = ""
      doingSubtitles = false
      currentLetter = 0 
    }, 800);
  }

  function doInterval2() {
    subtitles.innerText = ""
    subtitleInterval2 = setInterval(() => {
      subtitles.innerText += "\u00A0"
      subtitles.innerText += subtitleText[currentLetter]
      currentLetter++
      if (currentLetter >= 9) {
        clearInterval(subtitleInterval2)
        setTimeout(() => {
          doFinale()
        },300);
      }
    }, letterWait2);
  }

  subtitleInterval1 = setInterval(() => {
    subtitles.innerText += "\u00A0"
    subtitles.innerText += subtitleText[currentLetter]
    currentLetter++
    if (currentLetter >= 4) {
      clearInterval(subtitleInterval1)
      setTimeout(() => {
        doInterval2()
      }, 240);
    }
  }, letterWait);

}

setInterval(() => {
  if (doingSubtitles) {return}
  if (GabenMusic.currentTime >= GabenMusicTime && GabenMusic.currentTime <= MaxGabenMusicTime) {
    doSubtitles()
    doingSubtitles = true
  }
  if (GabenFullMusic.currentTime >= GabenMusicFullTime && GabenFullMusic.currentTime <= MaxGabenMusicFullTime) {
    doSubtitles()
    doingSubtitles = true
  }
}, 25);

document.addEventListener("DOMContentLoaded", () => {
  var bgRNG = Math.floor(Math.random()*10)+1
  if (bgRNG > 5) {
    app.style.backgroundImage = "url('images/gaben freeman.jpg')"
  } else {
    app.style.backgroundImage = "url('images/Lord_Gaben.webp')"
  }
})