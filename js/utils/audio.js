/**
 * @file audio.js
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


const entersfx = new Audio('/assets/audio/the-notification-email-143029.mp3');
const clicksfs = new Audio('assets/audio/click-151673.mp3');
const winsfs = new Audio("assets/audio/brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3")
const losesfx = new Audio("assets/audio/mixkit-player-losing-or-failing-2042.wav")

/**
 * Plays the enter sound effect at a volume of 0.75.
 */
export function enterSound(){
    entersfx.volume = 0.75;
    entersfx.play()
}

/**
 * Plays the click sound effect at a volume of 0.75.
 */
export function clickSound(){
    clicksfs.volume = 0.75;
    clicksfs.play()
}

/**
 * Plays the win sound effect at a volume of 0.75.
 */
export function winSound(){
    winsfs.volume = 0.75;
    winsfs.play()
}

/**
 * Plays the lose sound effect at a volume of 0.75.
 */
export function loseSound(){
    losesfx.volume = 0.75;
    losesfx.play()
}