// DOM references
const GabenMusic = document.getElementById("gaben-music") as HTMLAudioElement
const GabenFullMusic = document.getElementById("gaben-music-full") as HTMLAudioElement
const GabenSong = document.getElementById("gaben-song") as HTMLAudioElement
const subtitles = document.getElementById("song-subtitles") as HTMLParagraphElement
const app = document.getElementById("app") as HTMLDivElement
const clicker = document.getElementById("click") as HTMLDivElement
const gabenface = document.getElementById("gaben-face") as HTMLDivElement

//Music n shi
const click1: HTMLAudioElement = new Audio("audio/clicks/gaben-no.mp3")
const click2: HTMLAudioElement = new Audio("audio/clicks/gaben.mp3")
const click3: HTMLAudioElement = new Audio("audio/clicks/thanks-and-have-fun-gabe-newell.mp3")

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

//misc other stuff
let windowX: number
let windowY: number

let subtitleText = [
  "G", "A", "B", "E",
  "G", "A", "B", "E", "N"
]

document.addEventListener("click", () => {
  if (!(GabenFullMusic && GabenMusic)) {
    return
  }

  const rng: number = Math.floor(Math.random() * 100) + 1
  console.log(rng)

  if (GabenFullMusic.paused && GabenMusic.paused) {
    if (rng > 89 && rng < 97) {
      GabenFullMusic.play()
    } else if (rng < 89){
      GabenMusic.play()
    } else if (rng >= 97) {
      GabenSong.play()
    }
  }
})

function doSubtitles() {
  console.log("Doing subtitles")
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

clicker.addEventListener("click", () => {
  const click_rng = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  console.log(click_rng)
  if (click_rng == 1) {
    click1.play()
  } else if (click_rng == 2) {
    click2.play()
  } else {
    click3.play()
  }

  if (!gabenface) return

  let newFace = gabenface.cloneNode(true) as HTMLDivElement

  const face_rngX = (Math.floor(Math.random() * (windowX - 10 + 10)) + 10).toString();
  const face_rngY = (Math.floor(Math.random() * (windowY - 10 + 10)) + 10).toString();

  console.log(`X: ${face_rngX}, Y: ${face_rngY}`)

  app.appendChild(newFace)

  newFace.classList.remove("hidden")
  newFace.style.display = "absolute"
  newFace.classList.add("absolute")
  newFace.style.right = face_rngX + "px"
  newFace.style.bottom = face_rngY + "px"

  setTimeout(() => {
    newFace.remove()
  }, 700);
})

document.addEventListener("DOMContentLoaded", () => {
  var bgRNG = Math.floor(Math.random()*10)+1
  if (bgRNG > 5) {
    app.style.backgroundImage = "url('images/gaben freeman.jpg')"
  } else {
    app.style.backgroundImage = "url('images/Lord_Gaben.webp')"
  }

  windowY = window.screen.height
  windowX = window.screen.width
})