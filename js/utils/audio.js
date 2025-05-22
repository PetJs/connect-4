const entersfx = new Audio('/assets/audio/the-notification-email-143029.mp3');

export function enterSound(){
    enterSound.volume = 0.75;
    entersfx.play()
}