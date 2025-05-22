import createBoard from './utils/helpers.js';
import { enterSound } from './utils/audio.js';


const landing     = document.getElementById('landing');
const modeSelect  = document.getElementById('select-mode');
const gameSection = document.getElementById('game');
const bgMusic = document.getElementById("bg-music");
const startBtn = document.getElementById("start-btn")
const audio = document.getElementById("audio")

if(bgMusic){
    bgMusic.loop = true;
    bgMusic.currentTime = 0;
    bgMusic.play().catch(err => console.warn('Audio play prevented:', err));
    bgMusic.volume = 0.4;
}

startBtn.addEventListener('click', () => {
    enterSound();
    landing.hidden     = true;
    modeSelect.hidden  = false;
});

audio.addEventListener('click', ()=> {
    if (!bgMusic.muted) {
        bgMusic.muted = true;
        audio.src = '/assets/images/audio-off-svgrepo-com.svg';
    } else {
        bgMusic.muted = false;
        audio.src = '/assets/images/audio-svgrepo-com.svg';
    }
})


modeSelect.addEventListener('click', e => {
    const mode = e.target.dataset.mode;           // "pvp" or "pvcpu"
    if (!mode) return;                            // ignore clicks outside buttons
  
    modeSelect.hidden = true;
    gameSection.hidden = false;
  
    // Pass the chosen mode into your game setup:
    startGame()
    // startGame({ mode });
});

  

function startGame(){
    createBoard();
}
