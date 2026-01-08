import './App.css';
import './components/Square'
import { useState } from 'react';
import Square from './components/Square';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  return (
    <div className="App">
      {board.map((value, index) => {
        return (
          <Square
            key={index}
            value={value}
            onSquareClick={() => console.log(index)}
          />
        );
      })}
    </div>
  );
}

export default App;
