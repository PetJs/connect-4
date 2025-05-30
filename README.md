# CONNECT 4 

## TECH STACK
- HTML5
- CSS3
- JS

## GAME FEATURES
- Two-player mode with alternating turns
- Color-coded chips for each player
- Visual board updates with animated chip drops
- Win detection for horizontal, vertical, and diagonal lines
- Game reset functionality
- Sound effects with mute/unmute support

## HOW TO PLAY
1. Tap to place a chip in the selected column
2. Alternate turns with another player to drop colored chips.
3. First player to align four chips horizontally, vertically, or diagonally wins the game.


### CONTROLS

- **TOUCH** : Place Color
- **M Key**: Mute/unmute Sounds


## TECHNICAL IMPLEMENTATION

### ARCHITECTURE
The game follows a component-based arcitecture with:
- A main game controller handling state, rendering, and game logic. 
- A board renderer that dynamically updates UI with animations
- A utility module to handle win detection and user interactions

### KEY TECHNICAL FEATURES
- Uses CSS Grid to layout the Connect 4 board.
- Debounced input handling for smoother gameplay.
- Modular JS structure for better readability and maintainability.

## CODE STRUCTURE
```bash
CONNECT-4/
    |---- index.html  # Main game HTML
    |---- assets/
        |---- audio/
        |---- fonts/
        |---- images/
    |---- css/
        |---- main.css # Game styles
    |---- js/
        |---- utils/
            |---- audio.js # Main Game Functions
            |---- helper.js # Main Game Functions
            |---- storage.js # Main Game Functions
        |---- main.js # Main Game Functions
    |---- README.md  # Documentation
```

## DEVEOPMENT NOTES

### DESIGN DECISIONS
- Uses CSS Grid for responsive and easily manageable board layout
- Implemented a modular structure for scalability and clarity ...
- Created animation for fun user experience

### KNOWN ISSUES

### FUTURE IMPROVEMENTS
- Improve opponent logic for player vs cpu mode
- Implement mobile responsiveness with larger buttons
- Improve accessibility with keyboard navigation and ARIA labels