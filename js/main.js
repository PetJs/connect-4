/**
 * @file main.js
 * @game Connect 4
 * @author Fagoroye Peter
 * @date 2025-05-08
 *
 * @description
 * Main game script for the Connect 4 game. Handles initial setup, UI interactions,
 * and switching between different game sections and modes.
 *
 * @dependencies
 * - helpers.js
 * - audio.js
 *
 */

import createBoard from './utils/helpers.js';
import { enterSound, clickSound } from './utils/audio.js';


export const landing     = document.getElementById('landing');
export const modeSelect  = document.getElementById('select-mode');
export const gameSection = document.getElementById('game');
const bgMusic = document.getElementById("bg-music");
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("instruction-container")
const howToPlay = document.getElementById("how-to-play");
const audio = document.getElementById("audio")

const playerTwo = document.getElementById("player-two")
const smplayerTwo = document.getElementById("sm-player-two")


/**
 * Initializes background music settings when the window loads.
 * Sets the music to loop, plays it, and sets its volume.
 */
window.onload = function (){
    if(bgMusic){
        bgMusic.loop = true;
        bgMusic.currentTime = 0;
        bgMusic.play().catch(err => console.warn('Audio play prevented:', err));
        bgMusic.volume = 0.4;
    }
}

/**
 * Event listener for the start button.
 * Plays an enter sound, then hides the landing page and shows the mode selection page.
 */
startBtn.addEventListener('click', () => {
    enterSound();
    landing.hidden     = true;
    modeSelect.hidden  = false;
});

/**
 * Event listener for the audio toggle button.
 * Mutes/unmutes the background music and updates the button icon accordingly.
 */
audio.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;

    if (bgMusic.muted) {
        audio.src = '/assets/images/audio-off-svgrepo-com.svg';
    } else {
        audio.src = '/assets/images/audio-svgrepo-com.svg';
    }
});


/**
 * Event listener for the mode selection section.
 * Determines the chosen game mode ('pvp' or 'pvcpu'), updates player names if necessary,
 * hides the mode selection, shows the game section, and starts the game.
 */
modeSelect.addEventListener('click', e => {
    const mode = e.target.dataset.mode; // "pvp" or "pvcpu"
    if (!mode) return; // ignore clicks outside buttons
    
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
/**
 * Event listener for the "How To Play" button.
 * Displays a modal with game instructions.
 */
howToPlay.addEventListener("click", displayHowToPlay);

/**
 * Creates and displays a modal containing instructions on how to play the game.
 * Includes details for both PvP and PvCPU modes, and a closing button.
 */
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
            <li><img src="/assets/images/pin.png" alt="pin" width="16px" height="16px"> For PVP, it is played by two peaople suing a shared computer, each player takes turn to add a disc.</li>
            <li><img src="/assets/images/pin.png" alt="pin" width="16px" height="16px"> A winner is gotten, when either of the player stack their disc 4 in a row. Either horizontally, vertically or diagonally</li>
            <li><img src="/assets/images/pin.png" alt="pin" width="16px" height="16px"> For PvCPU, You are playing against the computer, in this there is a levelling system</li>
            <li><img src="/assets/images/pin.png" alt="pin" width="16px" height="16px"> At the beginning, you start in level zero, and your level keeps increasing each time you win against the computer 5 times. </li>
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

/**
 * Initiates the game by creating the board with the specified game mode.
 * @param {string} mode - The game mode ('pvp' or 'pvcpu').
 */
function startGame(mode){
    createBoard(mode);
}