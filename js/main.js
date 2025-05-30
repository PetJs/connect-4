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
const container = document.getElementById("instruction-container")
const howToPlay = document.getElementById("how-to-play");
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


// Show Insruction
howToPlay.addEventListener("click", displayHowToPlay);

function displayHowToPlay(){
    const existing = document.querySelector(".how-to-play");
    if (existing) {
        existing.remove();
    }
    const instruction = document.createElement("div");
    instruction.className = "how-to-play"
    instruction.innerHTML =
    `
        <h2 class="text-head">How To Play</h2>
        <ul class="text-list">
            <li>For PVP, it is played by two peaople suing a shared computer, each player takes turn to add a disc.</li>
            <li>A winner is gotten, when either of the player stack their disc 4 in a row. Either horizontally, vertically or diagonally</li>
            <li>For PvCPU, You are playing against the computer, in this there is a levelling system</li>
            <li>At the beginning, you start in level zero, and your level keeps increasing each time you win against the computer 5 times. </li>
        </ul>
        <button id="close" class="close">X</button>
    `
    container.appendChild(instruction);

    const btnClose = document.getElementById("close");

    btnClose.addEventListener("click", ()=>{
        console.log("it is removed")
        instruction.remove();
    })
}

function startGame(mode){
    createBoard(mode);
}
