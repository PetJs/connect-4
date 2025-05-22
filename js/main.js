import createBoard from './utils/helpers.js'


const landing     = document.getElementById('landing');
const modeSelect  = document.getElementById('select-mode');
const gameSection = document.getElementById('game');

document.getElementById('start-btn').addEventListener('click', () => {
    landing.hidden     = true;
    modeSelect.hidden  = false;
});

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
