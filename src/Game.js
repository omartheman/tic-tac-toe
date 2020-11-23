import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: []
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h2>Heyder Britt, wanna play sum tiktakto?</h2>
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;