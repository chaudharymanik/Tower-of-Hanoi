# Tower of Hanoi

A modern implementation of the classic Tower of Hanoi puzzle game built with React. The game features drag-and-drop functionality, customizable number of disks, move counter, and audio effects.

## Features

- Drag and drop interface for moving disks
- Adjustable number of disks (3-8)
- Move counter
- Background music and victory sound effects
- Responsive design
- Modern UI with smooth animations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd toh
```

2. Install dependencies:
```bash
npm install
```

3. Add audio files:
   - Create an `audio` folder in the `public` directory
   - Add two audio files:
     - `background-music.mp3` - Background music for the game
     - `win-music.mp3` - Victory sound effect

4. Start the development server:
```bash
npm start
```

The game will open in your default browser at `http://localhost:3000`.

## How to Play

1. Use the slider to select the number of disks (3-8)
2. Drag and drop disks between towers
3. Only smaller disks can be placed on top of larger ones
4. Try to move all disks to the rightmost tower in the minimum number of moves
5. Use the mute button to toggle sound effects

## Technologies Used

- React
- HTML5 Drag and Drop API
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 