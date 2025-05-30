

export function getUserData(username) {
    const data = JSON.parse(localStorage.getItem("connect4_users")) || {};
    return data[username] || { wins: 0, losses: 0, level: 0 };
}

export function saveUserData(username, userData) {
    const data = JSON.parse(localStorage.getItem("connect4_users")) || {};
    data[username] = userData;
    localStorage.setItem("connect4_users", JSON.stringify(data));
}

