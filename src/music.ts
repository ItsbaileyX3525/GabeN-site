const GabenMusic = document.getElementById("gaben-music") as HTMLAudioElement
const GabenFullMusic = document.getElementById("gaben-music-full") as HTMLAudioElement
const GabenSong = document.getElementById("gaben-song") as HTMLAudioElement
const BestSong = document.getElementById("best-song-in-the-world") as HTMLAudioElement

export function muteMusic() {
  localStorage.setItem("musicMuted", "true")
  GabenFullMusic.pause()
  GabenMusic.pause()
  GabenSong.pause()
  BestSong.pause()
}
