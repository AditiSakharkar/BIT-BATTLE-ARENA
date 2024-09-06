import React from 'react';
import './Controls.css'; 


const Controls = ({ onOperationChange, onReset, onFinish, currentPlayer, operation, scores, winner }) => {
  const handleOperationClick = (op) => {
    if (!operation) {
      onOperationChange(op);
    }
  };

  return (
    <div className="controls">
      <div className="operations">
        <button onClick={() => handleOperationClick('AND')} disabled={operation}>AND</button>
        <button onClick={() => handleOperationClick('OR')} disabled={operation}>OR</button>
        <button onClick={() => handleOperationClick('XOR')} disabled={operation}>XOR</button>
        <button onClick={() => handleOperationClick('NOT')} disabled={operation}>NOT</button>
      </div>
     
      <div>Current Operation: {operation || 'None'}</div>
      <div className='scoreboard'>
        <div>Player A Score (1s): {scores.A}</div>
        <div>Player B Score (0s): {scores.B}</div>
      </div>
      <div className='btnclass'>
      <button onClick={onReset}>Reset</button>
      <button onClick={onFinish}>Finish</button>
      </div>
      
    </div>
  );
};

export default Controls;
