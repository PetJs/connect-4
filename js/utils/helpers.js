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
 * - storage.js
 * - audio.js
 *
 */

import { clickSound, loseSound } from "./audio.js";
import { winSound } from "./audio.js";
import { landing, gameSection, modeSelect } from "../main.js";
import { getUserData, saveUserData } from "./storage.js";

const STORAGE_USER = 'Human';
const STORAGE_CPU  = 'CPU';

const rows = 6;
const cols = 7;
const board = [];
let currentColor = "red";

const boardContainer = document.getElementById("board");
const scoreOne = document.getElementById("scoreone")
const scoreTwo = document.getElementById("scoretwo")


// for moile
const scoreOneMobile = document.getElementById("sm-scoreone")
const scoreTwoMobile = document.getElementById("sm-scoretwo")

// Score variable

let playerOneScore = parseInt(scoreOne.textContent);
let playerTwoScore = parseInt(scoreTwo.textContent);

// Player mode
let gameMode = 'pvp'

// Game over variable
let gameOver = false;

// Level
let playerWins = 0;

/**
 * Initializes and displays the current game level for the human player.
 */

function initializeGameStats() {
    const humanData = getUserData(STORAGE_USER); // Get human data
    const currentLevel = humanData && humanData.level !== undefined ? humanData.level : 0; // Get level, default to 0
    const levelDsiplay = document.getElementById("level-display");
    if(levelDsiplay){
        levelDsiplay.innerHTML = `<span class="badge">Level ${currentLevel}</span>`;
    } 
}
initializeGameStats()

/**
 * Creates and initializes the game board, resetting game state and scores.
 * @param {string} [mode] - The game mode ('pvp' or 'pvcpu'). If not provided, it attempts to retrieve from localStorage.
 */
function createBoard(mode) {
    gameOver = false;
    resetSessionScores();
    currentColor = 'red';
    board.length = 0; // Clear existing board
    boardContainer.innerHTML = "";

    // Store mode in localStorage if provided
    if (mode) {
        localStorage.setItem("gameMode", mode);
    }

    // Retrieve mode from localStorage if not passed
    gameMode = mode || localStorage.getItem("gameMode") || "pvp";

    console.log("Game mode:", gameMode);

    if (gameMode === 'pvcpu') {
        const humanData = getUserData(STORAGE_USER);
        const cpuData   = getUserData(STORAGE_CPU);

        playerOneScore = humanData.wins;
        playerTwoScore = cpuData.wins;

        // update both desktop & mobile UIs
        updateScoreUI();
    }

    // create the 2D array 
    const newBoard = Array.from(Array(rows), () => Array(cols).fill(null));
    board.push(...newBoard);
    console.log(board);

    // render each row and col to a div
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const disc = document.createElement('div');
            disc.className = 'col';
            disc.dataset.row = i;
            disc.dataset.col = j;
            disc.addEventListener('click', handleDiscClick);

            disc.innerHTML = newBoard[i][j];
            boardContainer.appendChild(disc);
        }
    }

    // initial turn alert
    displayTurnAlert()
    // alert(`Player ${currentColor === 'red' ? 'One' : 'Two'} turn`);
}

/**
 * Handles a disc click event, dropping a disc and checking for win/tie conditions.
 * Triggers CPU move if in 'pvcpu' mode.
 * @param {MouseEvent} e - The click event object.
 */
function handleDiscClick(e){
    if(gameOver){
        return // Stop clicks
    }
    clickSound();
    const { row, col } = fillHoles(e);
    if (row >= 0) {
        if (calcWin(row, col)) {
            gameOver = true
            // you’ve got a winner! 
            displayWinModal(currentColor)
            trackScore(currentColor);
            winSound();
            addConfetti();
        } else if(isBoardFull()) {
            gameOver = true;
            displayTieModal();
        } else{
            console.log(gameMode);
            switchPlayer()
            if(gameMode == "pvcpu" && currentColor == "yellow"){
            setTimeout(()=>{
                cpu();
            }, 500)
            }
        }
    }
    console.log(board[row][col]);
}

/**
 * Drops a disc in the clicked column, updates the board array,
 * and returns the row and col of the placed disc.
 * @param {MouseEvent} e
 * @returns {{row: number, col: number}}
 */
function fillHoles(e) {
    // let col;
    // if (typeof eOrCol === "number") {
    // col = eOrCol;
    // } else {
    // col = parseInt(eOrCol.target.dataset.col, 10);
    // }

    const col = typeof e === "number"
        ? e
        : parseInt(e.target.dataset.col, 10);

    for (let r = rows - 1; r >= 0; r--) {
        const targetDisc = document.querySelector(
            `[data-row="${r}"][data-col="${col}"]`
        );
        const bgcolor = window.getComputedStyle(targetDisc).backgroundColor;

        if (
            bgcolor === 'rgb(255, 255, 255)' ||
            bgcolor === 'rgb(128, 128, 128)'
        ) {
            // color the cell
            targetDisc.style.backgroundColor = currentColor;
            // update the in-memory board
            board[r][col] = currentColor;
            return { row: r, col };
        }
    }
    // no empty slot found
    return { row: -1, col };
}

/**
 * Switch Player(i.e color) and displays an alert modal,
 */
function switchPlayer() {
    currentColor = currentColor === 'red' ? 'yellow' : 'red';
    setTimeout(()=>{
        displayTurnAlert();
    }, 1000)
}

/**
 * Displays an alert modal,
 */

const turnAlert = document.getElementById('turn-alert')

/**
 * Displays an animated alert indicating whose turn it is.
 */
function displayTurnAlert(){
    turnAlert.textContent = `Player ${currentColor === 'red' ? 'One' : 'Two'} turn`;
    turnAlert.classList.remove('alert-player-turn');
    void turnAlert.offsetWidth;           // trigger reflow
    turnAlert.classList.add('alert-player-turn');
}


/**
 * Displays a generic modal with a message and "Quit!" and "Play Again" buttons.
 * @param {string} message - The message to display in the modal.
 */
function showModal(message){
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.className = "modal"
    modal.innerHTML = 
    `
        <h2>${message}</h2>
        <div class= "modal-btn-container">
            <button class= "btn-quit" id="btn-quit">Quit!</button>
            <button class= "btn-try-again" id="btn-try-again">Play Again</button>
        </div>
    `

    document.body.appendChild(modal);

    const btnQuit = document.getElementById("btn-quit");
    const btnTryAgain = document.getElementById("btn-try-again");

    btnQuit.addEventListener("click", ()=> {
        quitGame()
        modal.remove()
    })

    btnTryAgain.addEventListener('click', ()=>{
        createBoard();
        modal.remove()
    })
}


/**
 * Displays a win modal for the winning player.
 * @param {string} color - The color of the winning player ('red' or 'yellow').
 */
function displayWinModal(color) {
  showModal(`Player ${color==='red'?'One':'Two'} Wins!`);
}


/**
 * Displays a modal indicating a tie game.
 */
function displayTieModal() {
  showModal("It's a tie!");
}

/**
 * Displays a "You Lose" modal with "Quit!" and "Play Again" buttons.
 */
function displayLoseModal(){
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.className = "modal"
    modal.innerHTML = 
    `
        <h2>You Lose</h2>
        <div class= "modal-btn-container">
            <button class= "btn-quit" id="btn-quit">Quit!</button>
            <button class= "btn-try-again" id="btn-try-again">Play Again</button>
        </div>
    `

    document.body.appendChild(modal);

    const btnQuit = document.getElementById("btn-quit");
    const btnTryAgain = document.getElementById("btn-try-again");

    btnQuit.addEventListener("click", ()=> {
        quitGame()
        modal.remove()
    })

    btnTryAgain.addEventListener('click', ()=>{
        createBoard();
        modal.remove()
    })
}


/**
 * Checks if the game board is completely full, indicating a tie.
 * @returns {boolean} True if the board is full, false otherwise.
 */
function isBoardFull() {
  return board[0].every(cell => cell !== null);
}

/**
 * Checks if placing at (row, col) creates a connect four
 * @param {number} row
 * @param {number} col
 * @returns {boolean}
 */

function calcWin(row, col){
    const color = board[row][col]

    // Define the four directions to check: horizontal, vertical, two diagonals
    const directions = [
        { dr: 0, dc: 1 },   // horizontal
        { dr: 1, dc: 0 },   // vertical
        { dr: 1, dc: 1 },   // diagonal \ 
        { dr: 1, dc: -1 }   // diagonal /
    ];
    // When a hole is fill, check left
    // 1. if same color, add unto a variable +1, note the variable is initialized to one
    // 2. Check the next color beside it, if same color, variable ++, 
    // 3. If var == 4, The color wins, or set winner variable to that color
    // 4. But if you check the left and it is not the same color, check the right, then repeat step 1 - 3
    // 5. If left or right id=s not the same color, check top, repeat step 1-3

    for (const { dr, dc } of directions) {
        let winCount = 1;
        // in the forward direction (dr, dc)
        winCount += countInDirection(row, col, dr, dc, color);
        // Count in the backward/opposite direction (-dr, -dc)
        winCount += countInDirection(row, col, -dr, -dc, color);
        if (winCount >= 4) return true;
    }
    // No One Wins
    return false;

}

/**
 * Count consecutive discs of same color starting from (r, c) in given direction
 * @param {number} r - starting row index
 * @param {number} c - starting column index
 * @param {number} dr - row direction increment (+1, 0, or -1)
 * @param {number} dc - column direction increment (+1, 0, or -1)
 * @param {string} color
 * @returns {number}
 */
function countInDirection(r, c, dr, dc, color) {
    let count = 0;
    // Move one step from the starting cell
    let row = r + dr;
    let col = c + dc;

    // Keep going while we're inside the board and colors match
    while (
        row >= 0 && row < rows &&
        col >= 0 && col < cols &&
        board[row][col] === color
    ) {
        count++; // found a matching disc
        row += dr; // move further in row direction
        col += dc; // move further in column direction
    }
    return count;
}


// function cpu(){
//     // Find available column to place the disc
//     const validCols = [];
//     for (let c = 0; c < cols; c++) {
//         if (board[0][c] === null) validCols.push(c);
//     }

//     // Pick a random index of any available column
//     const randomIndex = Math.floor(Math.random() * validCols.length);
//     const availCol   = validCols[randomIndex];
//     // Fill the column
//     const {row, col} = fillHoles(availCol)
//     if(row >= 0 && calcWin(row, col)){
//         gameOver = true;
//         displayWinModal(currentColor);
//         trackScore(currentColor);
//         winSound();
//         addConfetti();
//     }else{
//         switchPlayer();
//     }
// }


/**
 * Implements the CPU's move logic. It attempts to win, then to block the human player,
 * and finally plays a random valid move.
 */
function cpu() {
  const validCols = [];
  for (let c = 0; c < cols; c++) {
    if (board[0][c] === null) validCols.push(c);
  }


  /**
   * Helper function to simulate placing a disc and check for a win without
   * actually modifying the board permanently.
   * @param {string} color - The color to simulate placing.
   * @param {number} col - The column to simulate placing in.
   * @returns {boolean} True if the simulated move results in a win, false otherwise.
   */
  // Helper to simulate placing a disc
  function simulateMove(color, col) {
    for (let r = rows - 1; r >= 0; r--) {
      if (board[r][col] === null) {
        board[r][col] = color;
        const isWin = calcWin(r, col);
        board[r][col] = null; // Undo move
        return isWin;
      }
    }
    return false;
  }

  // 1. Try to win
  for (let col of validCols) {
    if (simulateMove("yellow", col)) {
      const { row } = fillHoles(col);
      if (calcWin(row, col)) {
        gameOver = true;
        displayLoseModal()
        trackScore("yellow");
        loseSound();
      }
      return;
    }
  }

  // 2. Try to block the human
  for (let col of validCols) {
    if (simulateMove("red", col)) {
      const { row } = fillHoles(col);
      switchPlayer(); // No win, just block and switch
      return;
    }
  }

  // 3. Otherwise, play randomly
  const randomIndex = Math.floor(Math.random() * validCols.length);
  const col = validCols[randomIndex];
  const { row } = fillHoles(col);
  if (calcWin(row, col)) {
    gameOver = true;
    displayWinModal("yellow");
    trackScore("yellow");
    winSound();
    addConfetti();
  } else {
    switchPlayer();
  }
}


/**
 * Tracks and updates the score for the winning player.
 * Also persists scores in local storage if in 'pvcpu' mode.
 * @param {string} color - The color of the player who scored.
 */
function trackScore(color) {
  const isHuman = color === 'red';

  if (isHuman) playerOneScore++; else playerTwoScore++;
  updateScoreUI();

  // persist only in PVCU mode
  if (gameMode === 'pvcpu') {
    updateScore(
      isHuman ? STORAGE_USER : STORAGE_CPU,
      /* didWin */ true
    );
  }
}


/**
 * Updates the score display on both desktop and mobile UIs.
 */
// Update score ui
function updateScoreUI() {
  scoreOne.textContent = playerOneScore;
  scoreOneMobile.textContent = playerOneScore;
  scoreTwo.textContent = playerTwoScore;
  scoreTwoMobile.textContent = playerTwoScore;
}


/**
 * Resets the current session's scores to zero and updates the UI.
 */
function resetSessionScores() {
  playerOneScore = 0;
  playerTwoScore = 0;
  updateScoreUI();
}


/**
 * Quits the current game, hides the game section, shows the landing page,
 * resets session scores, and displays stored stats if in 'pvcpu' mode.
 */
function quitGame() {
  gameSection.hidden = true;
  landing.hidden = false;
  resetSessionScores();
  if (gameMode === 'pvcpu') displayStoredStats();
}


/**
 * Updates the win/loss and level statistics for a given user in local storage.
 * @param {string} username - The key for the user data in local storage (e.g., 'Human' or 'CPU').
 * @param {boolean} didwin - True if the user won the round, false otherwise.
 */
function updateScore(username, didwin){
    const userData = getUserData(username) || { wins: 0, losses: 0, level: 0 };
    // playerWins++;

    if(didwin){
        userData.wins += 1
    }else {
        userData.losses += 1
    }

    // Levelling
    if (username === STORAGE_USER) { 
        const prevLevel = userData.level;
        const newLevel = Math.floor(userData.wins / 3) ;
        userData.level = newLevel;

        if (newLevel > prevLevel) {
            showLevel(newLevel);
            addConfetti();
        }
    }
    saveUserData(username, userData)
}

/**
 * Displays the all-time win/loss and level statistics for human and CPU players.
 */
function displayStoredStats() {
  const human = getUserData(STORAGE_USER);
  const cpu   = getUserData(STORAGE_CPU);
  const c = document.getElementById('stored-stats');
  c.innerHTML = `
    <h3>All-Time vs CPU</h3>
    <p>You: ${human.wins} W / ${human.losses} L (Lvl ${human.level})</p>
    <p>CPU: ${cpu.wins} W / ${cpu.losses} L (Lvl ${cpu.level})</p>
  `;
}


/**
 * Displays a temporary modal indicating a level-up and updates the level display.
 * @param {number} newLevel - The new level achieved.
 */
function showLevel(newLevel){
    const levelModal = document.createElement("div");
    levelModal.className = "modal level-up";
    levelModal.innerHTML = 
    `
        <h2>🎉 Level Up</h2>
        <div class="badge">Level ${newLevel}</div>
    `
    document.body.appendChild(levelModal);
    const levelDsiplay = document.getElementById("level-display");
    if(levelDsiplay){
        levelDsiplay.innerHTML = `<span class="badge">Level ${newLevel}</span>`; // Update the main display
    }
    setTimeout(()=>{
        levelModal.remove();
    }, 3000)
}

/**
 * Triggers a confetti animation on the screen.
 */
function addConfetti(){
    confetti({
        particleCount: 150,
        spread: 70,
        origin: {
            x: 0.5,
            y: 0.5,
        }
    });
}


export default createBoard;
