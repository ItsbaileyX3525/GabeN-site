//GabenClicker

//DOM references
const app = document.getElementById("app") as HTMLDivElement
const clicker = document.getElementById("click") as HTMLDivElement
const gabenface = document.getElementById("gaben-face") as HTMLDivElement

//Vars for the game
let gabeClicks: number = 0

//Click sounds
const click1: HTMLAudioElement = new Audio("audio/clicks/gaben-no.mp3")
const click2: HTMLAudioElement = new Audio("audio/clicks/gaben.mp3")
const click3: HTMLAudioElement = new Audio("audio/clicks/thanks-and-have-fun-gabe-newell.mp3")

clicker.addEventListener("click", () => {
  const click_rng = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  if (click_rng == 1) {
    click1.play()
  } else if (click_rng == 2) {
    click2.play()
  } else {
    click3.play()
  }

  if (!gabenface) return

  let newFace = gabenface.cloneNode(true) as HTMLDivElement

  const face_rngX = (Math.floor(Math.random() * (window.screen.width - 10 + 10)) + 10).toString();
  const face_rngY = (Math.floor(Math.random() * (window.screen.height - 10 + 10)) + 10).toString();

  app.appendChild(newFace)

  newFace.classList.remove("hidden")
  newFace.style.display = "absolute"
  newFace.classList.add("absolute")
  newFace.style.right = face_rngX + "px"
  newFace.style.bottom = face_rngY + "px"

  gabeClicks++

  console.log(gabeClicks)

  setTimeout(() => {
    newFace.remove()
  }, 700);
})