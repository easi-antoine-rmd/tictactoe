# Tic Tac Toe – Technical Exercise

This project is a **Tic Tac Toe game** developed as part of a technical interview process.

The goal of this exercise is to serve as a **technical support for discussion during the interview**, focusing on code structure, logic, and evolutivity rather than pure visuals.

👉 The application is also **available online**:  
🔗 **Live demo**: [https://tictactoe-kappa-ruddy.vercel.app/](https://tictactoe-kappa-ruddy.vercel.app/)

---

## 🎯 Features

- Classic Tic Tac Toe rules
- Player can **choose their symbol (X or O)** before starting
- Player vs **Computer (random moves)**
- Computer plays automatically when it’s its turn
- Winner and draw detection
- Possibility to **restart the game without reloading**
- Clean and readable UI
- Code structured to allow **easy evolutivity** (ex: 4×4 grid)

---

## 🧠 Technical choices

- **React** (Create React App)
- Functional components
- State management with `useState`
- Side effects handled with `useEffect`
- Game logic separated from UI logic
- Board represented as a **1D array** to simplify evolutions
- Winner detection isolated in a dedicated function

---

## 🚀 Installation & Run locally

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Steps

```bash
git clone https://github.com/easi-antoine-rmd/tictactoe.git
cd tictactoe
npm install
npm start
```

The application will be available at:  
👉 http://localhost:3000

---

## 🧪 How to play

1. Choose your symbol (**X** or **O**)
2. Click on an empty square to play
3. The computer will automatically play a random move
4. The game ends when:
   - a player wins
   - or the board is full (draw)
5. Click **"Rejouer"** to restart without reloading the page

---

## 🔧 Evolutivity (4×4 example)

The code was written to allow **easy evolutions with minimal changes**, for example:
- Changing the grid size (3×3 → 4×4)
- Changing the number of aligned symbols required to win

This can be achieved by:
- Parameterizing the board size
- Using a generic winner detection algorithm
- Keeping UI logic independent from game rules

---

## 👤 Author

**Antoine Raimand**  
🔗 Portfolio / CV: https://cv.antoineraimand.fr

---

Feel free to explore the code — it is intended to be **read, discussed, and evolved**.
