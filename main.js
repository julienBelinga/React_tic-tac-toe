import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({value, onclick}) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onclick}
    >
      {value}
    </div>
  );
}

function Board() {
  const [squares,setSquares] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState(true);
  const winner = calculateWin(squares);
  let status;

  const handleClick = (e) => {
    const newSquares = squares.slice();
    if(winner || newSquares[e]){
      return;
    }
    newSquares[e] = nextPlayer ? 'X' : 'O';
    setSquares(newSquares);
    setNextPlayer(!nextPlayer);
  }

  const renderSquare = (e) => {
    return(
      <Square
        value={squares[e]}
        onclick={() => handleClick(e)}
      />
    );
  }

  const reset = () => {
    setSquares(Array(9).fill(null));
    setNextPlayer(true);
  }

  function calculateWin(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];

    for(let i=0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }

    return null;
  }

  if(winner){
    status = 'Winner: ' +  winner;
  }else if (squares.every(square => square != null)){
    status = 'Draw';
  }else{
    status = 'Next player: ' + (nextPlayer ? 'X' : 'O')
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>{status}</div>
      <button style={buttonStyle} onClick={reset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);