/**
 * @file storage.js
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
 * - storage.js
 */

export function getUserData(username) {
    const data = JSON.parse(localStorage.getItem("connect4_users")) || {};
    return data[username] || { wins: 0, losses: 0, level: 0 };
}

export function saveUserData(username, userData) {
    const data = JSON.parse(localStorage.getItem("connect4_users")) || {};
    data[username] = userData;
    localStorage.setItem("connect4_users", JSON.stringify(data));
}

