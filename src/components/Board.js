import React from 'react';
import './Board.css';

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <div
          key={index}
          className={`cell ${value !== null ? 'filled' : ''}`}
          onClick={() => onCellClick(index)}
        >
          {value !== null ? value : ''}
        </div>
      ))}
    </div>
  );
};

export default Board;
