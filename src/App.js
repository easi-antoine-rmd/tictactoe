import "./App.css";
import "./components/Square";
import { useEffect, useState } from "react";
import Square from "./components/Square";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);

  const calculateWinner = (b) => {
    const winPossibilites = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8],
      [0, 3, 6],[1, 4, 7],[2, 5, 8],
      [0, 4, 8],[2, 4, 6],
    ];

    for (let i = 0; i < winPossibilites.length; i++) {
      const [a, c, d] = winPossibilites[i];
      if (b[a] !== null && b[a] === b[c] && b[c] === b[d]) {
        return b[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = board.every((cell) => cell !== null) && winner === null;

  const currentSymbol = isXNext ? "X" : "O";
  const isPlayerTurn = currentSymbol === playerSymbol;

  const getEmptyIndexes = (b) => {
    const empties = [];
    for (let i = 0; i < b.length; i++) {
      if (b[i] === null) empties.push(i);
    }
    return empties;
  };

  useEffect(() => {
    if (playerSymbol === null || computerSymbol === null) return;
    if (winner || isDraw) return;

    if (isPlayerTurn) return;

    const empties = getEmptyIndexes(board);
    if (empties.length === 0) return;

    const timer = setTimeout(() => {
      const randomEmptyIndex =
        empties[Math.floor(Math.random() * empties.length)];

      const newBoard = [...board];
      newBoard[randomEmptyIndex] = computerSymbol;

      setBoard(newBoard);
      setIsXNext((prev) => !prev);
    }, 1500);

    return () => clearTimeout(timer);
  }, [board, isXNext, playerSymbol, computerSymbol, winner, isDraw, isPlayerTurn]);

  const updateSquareValue = (index) => {
    if (playerSymbol === null) return;
    if (winner || isDraw) return;
    if (!isPlayerTurn) return;
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;

    setBoard(newBoard);
    setIsXNext((prev) => !prev);
  };

  const chooseSymbol = (value) => {
    if (value === "X") {
      setPlayerSymbol("X");
      setComputerSymbol("O");
      setBoard(Array(9).fill(null));
      setIsXNext(true); 
    } else {
      setPlayerSymbol("O");
      setComputerSymbol("X");
      setBoard(Array(9).fill(null));
      setIsXNext(true); 
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let status = "";
  if (playerSymbol === null) {
    status = "Choisis ton symbole";
  } else if (winner) {
    status = "Le gagnant est " + winner;
  } else if (isDraw) {
    status = "Match nul !";
  } else {
    status = isPlayerTurn
      ? `À toi (${playerSymbol})`
      : `Ordinateur (${computerSymbol})...`;
  }

  return (
    <div className="App">
      {playerSymbol === null ? (
        <div>
          <h1>{status}</h1>
          <button onClick={() => chooseSymbol("X")}>X</button>
          <button onClick={() => chooseSymbol("O")}>O</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
