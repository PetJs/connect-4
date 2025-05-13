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

const rows = 6;
const cols = 7;
const board = [];
let currentColor = "red";

const boardContainer = document.getElementById("board");

function createBoard() {
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
            disc.addEventListener('click', (e) => {
                const { row, col } = fillHoles(e);
                switchPlayer();
                console.log(board[row][col]);
            });

            disc.innerHTML = newBoard[i][j];
            boardContainer.appendChild(disc);
        }
    }

    // initial turn alert
    alert(`Player ${currentColor === 'red' ? 'One' : 'Two'} turn`);
}

/**
 * Drops a disc in the clicked column, updates the board array,
 * and returns the row and col of the placed disc.
 * @param {MouseEvent} e
 * @returns {{row: number, col: number}}
 */
function fillHoles(e) {
    const col = parseInt(e.target.dataset.col, 10);

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

function switchPlayer() {
    currentColor = currentColor === 'red' ? 'yellow' : 'red';
    alert(`Player ${currentColor === 'red' ? 'One' : 'Two'} turn`);
}

export default createBoard;
