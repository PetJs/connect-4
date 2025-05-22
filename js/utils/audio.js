const entersfx = new Audio('/assets/audio/the-notification-email-143029.mp3');
const clicksfs = new Audio('assets/audio/click-151673.mp3');
const winsfs = new Audio("assets/audio/brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3")

export function enterSound(){
    entersfx.volume = 0.75;
    entersfx.play()
}

export function clickSound(){
    clicksfs.volume = 0.75;
    clicksfs.play()
}

export function winSound(){
    winsfs.volume = 0.75;
    winsfs.play()
}