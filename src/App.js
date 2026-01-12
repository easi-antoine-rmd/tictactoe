import "./App.css";
import "./components/Square";
import { useEffect, useState } from "react";
import Square from "./components/Square";

function App() {
  const SIZE = 5;

  const [board, setBoard] = useState(Array(SIZE * SIZE).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);

  const calculateWinner = (b) => {
    const winPossibilites = [];

    for (let r = 0; r < SIZE; r++) {
      const row = [];
      for (let c = 0; c < SIZE; c++) {
        row.push(r * SIZE + c);
      }
      winPossibilites.push(row);
    }

    for (let c = 0; c < SIZE; c++) {
      const col = [];
      for (let r = 0; r < SIZE; r++) {
        col.push(r * SIZE + c);
      }
      winPossibilites.push(col);
    }

    const diag1 = [];
    for (let i = 0; i < SIZE; i++) {
      diag1.push(i * SIZE + i);
    }
    winPossibilites.push(diag1);

    const diag2 = [];
    for (let i = 0; i < SIZE; i++) {
      diag2.push(i * SIZE + (SIZE - 1 - i));
    }
    winPossibilites.push(diag1);

    for (const possibility of winPossibilites) {
      const firstSymbol = b[possibility[0]];
      if (firstSymbol === null) continue;

      let hasWon = true;
      for (const index of possibility) {
        if (b[index] !== firstSymbol) {
          hasWon = false;
          break;
        }
      }

      if (hasWon) {
        return firstSymbol;
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
      setBoard(Array(SIZE * SIZE).fill(null));
      setIsXNext(true);
    } else {
      setPlayerSymbol("O");
      setComputerSymbol("X");
      setBoard(Array(SIZE * SIZE).fill(null));
      setIsXNext(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(SIZE * SIZE).fill(null));
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
          <div className="select">
            <button onClick={() => chooseSymbol("X")}>X</button>
            <button onClick={() => chooseSymbol("O")}>O</button>
          </div>
        </div>
      ) : (
        <>
          <h1>{status}</h1>

          <div className="board" style={{gridTemplateColumns: `repeat(${SIZE}, 80px)`}}>
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