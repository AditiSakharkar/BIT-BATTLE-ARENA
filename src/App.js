import React, { useState } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('A');
  const [playerValues, setPlayerValues] = useState({ A: 1, B: 0 });
  const [operation, setOperation] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (operation === null) {
      const newBoard = [...board];
      if (newBoard[index] === null) {
        newBoard[index] = playerValues[currentPlayer];
        setBoard(newBoard);
        setOperation(null);
        setSelectedCells([]);
        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
      }
    } else {
      if (operation === 'NOT') {
        const newBoard = [...board];
        newBoard[index] = ~newBoard[index] & 1;
        setBoard(newBoard);
        setOperation(null);
        setSelectedCells([]);
        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
      } else {
        if (selectedCells.length === 0) {
          setSelectedCells([index]);
        } else if (selectedCells.length === 1) {
          performOperation(selectedCells[0], index);
        }
      }
    }
  };

  const performOperation = (index1, index2) => {
    const adjacent = 
      (Math.abs(index1 - index2) === 1 && Math.floor(index1 / 4) === Math.floor(index2 / 4)) ||
      (Math.abs(index1 - index2) === 4);

    if (!adjacent) return;

    const newBoard = [...board];
    const value1 = newBoard[index1];
    const value2 = newBoard[index2];
    let result;

    switch (operation) {
      case 'AND':
        result = value1 & value2;
        break;
      case 'OR':
        result = value1 | value2;
        break;
      case 'XOR':
        result = value1 ^ value2;
        break;
      default:
        return;
    }

    newBoard[index1] = result;
    newBoard[index2] = null;
    setBoard(newBoard);
    setOperation(null);
    setSelectedCells([]);
    setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
  };

  const handleOperationChange = (op) => setOperation(op);
  const resetGame = () => {
    setBoard(Array(16).fill(null));
    setWinner(null);
  };

  const finishGame = () => {
    const scores = getScores();
    if (scores.A > scores.B) {
      setWinner('Player A');
    } else if (scores.B > scores.A) {
      setWinner('Player B');
    } else {
      setWinner('It\'s a tie!');
    }
  };

  const getScores = () => {
    const playerAScore = board.filter(cell => cell === playerValues.A).length;
    const playerBScore = board.filter(cell => cell === playerValues.B).length;
    return { A: playerAScore, B: playerBScore };
  };

  return (
    <div className="app">
      <h1>Boolean Grid Game</h1>
      <div>Player {currentPlayer}'s Turn</div>
      <Board board={board} onCellClick={handleCellClick} />
      <Controls
        onOperationChange={handleOperationChange}
        onReset={resetGame}
        onFinish={finishGame}
        currentPlayer={currentPlayer}
        operation={operation}
        scores={getScores()}
        winner={winner}
      />
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
};

export default App;
