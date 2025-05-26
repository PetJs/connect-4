/**
 * @file helpers.js
 * @game Connect 4
 * @author Fagoroye Peter
 * @date 2025-05-08
 *
 * @description
 * Helper game logic for the Connect 4 game. To handle sub functions used in the game
 * Board creation, scoring etc
 *
 * @dependencies
 * - helpers.js
 * - audio.js
 *
 */


import createBoard from './utils/helpers.js';
import { enterSound, clickSound } from './utils/audio.js';


export const landing     = document.getElementById('landing');
export const modeSelect  = document.getElementById('select-mode');
export const gameSection = document.getElementById('game');
const bgMusic = document.getElementById("bg-music");
const startBtn = document.getElementById("start-btn")
const audio = document.getElementById("audio")

const playerTwo = document.getElementById("player-two")
const smplayerTwo = document.getElementById("sm-player-two")


window.onload = function (){
    if(bgMusic){
        bgMusic.loop = true;
        bgMusic.currentTime = 0;
        bgMusic.play().catch(err => console.warn('Audio play prevented:', err));
        bgMusic.volume = 0.4;
    }
}


startBtn.addEventListener('click', () => {
    enterSound();
    landing.hidden     = true;
    modeSelect.hidden  = false;
});

audio.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;

    if (bgMusic.muted) {
        audio.src = '/assets/images/audio-off-svgrepo-com.svg';
    } else {
        audio.src = '/assets/images/audio-svgrepo-com.svg';
    }
});


modeSelect.addEventListener('click', e => {
    const mode = e.target.dataset.mode;           // "pvp" or "pvcpu"
    if (!mode) return;                            // ignore clicks outside buttons
    
    clickSound();

    if(mode === "pvcpu"){
        playerTwo.innerHTML = "CPU";
        smplayerTwo.innerHTML = "CPU"
    }

    modeSelect.hidden = true;
    gameSection.hidden = false;
  
    // Pass the chosen mode into your game setup:
    // startGame()
    startGame( mode );
});

  

function startGame(mode){
    createBoard(mode);
}
