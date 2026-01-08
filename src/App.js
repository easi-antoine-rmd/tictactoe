import './App.css';
import './components/Square'
import { useState } from 'react';
import Square from './components/Square';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const updateSquareValue = (index) => {
    if (winner) return;
    if (board[index] !== null) return;

    const myNewBoard =  [...board];

    if (board[index] === null) {
      myNewBoard[index] = isXNext ? "X" : "O";
      setBoard(myNewBoard);
      setIsXNext(!isXNext);
    }
  }

  const calculateWinner = (board) => {
    const winPossibilites = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let i = 0; i < winPossibilites.length; i++) {
      const [a,b,c] = winPossibilites[i];
      if ((board[a] !== null) && (board[a] === board[b]) && (board[b] === board[c])){
        return board[a];
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const winner = calculateWinner(board);
  const isDraw = board.every(cell => cell !== null) && winner === null;
  let status = "Next " + (isXNext ? "X" : "O");

  if (winner) {
    status = "Le gagnant est " + winner;
  } else if (isDraw) {
    status = "Match nul !"
  }

  return (
    <div className="App">
      <h1>{status}</h1>
        <div className="board">
          {board.map((value, index) => (
            <Square
              key={index}
              value={value}
              onSquareClick={() => updateSquareValue(index)}
            />
          ))}
        </div>
      <button onClick={resetGame}>Rejouer</button>
    </div>
  );
}

export default App;
