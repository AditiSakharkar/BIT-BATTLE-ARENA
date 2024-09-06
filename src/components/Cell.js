import React from 'react';

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value !== null ? value : ''}
    </div>
  );
};

export default Cell;
