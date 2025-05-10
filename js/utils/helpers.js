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
 * 
 */


/**
 * Creates game board using 2D array
 * 
 * @param{Arrays}
 */

const rows = 6;
const cols = 7;
const board = [];

const boardContainer = document.getElementById("board");

function createBoard() {
    // create the 2D array 
    const newBoard = Array.from(Array(rows), ()=> Array(cols).fill(null));
    board.push(...newBoard)
    console.log(board);

    // render each row and col to a div
    for(let i = 0; i < rows; i++){
        for(let j = 0; j< cols; j++){
            const disc = document.createElement('div');
            disc.className = 'col'
            disc.innerHTML = newBoard[i][j];
            boardContainer.appendChild(disc)
        }
    }
}

export default createBoard;