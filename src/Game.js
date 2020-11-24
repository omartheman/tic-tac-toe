import React from 'react';
import Board from './Board';

//If you time-travel and then click on a square, delete all history after clicked phase.

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: [],
      currentPhase: -1
    }
    this.handleClick = this.handleClick.bind(this);
    this.returnToPhase = this.returnToPhase.bind(this);
  }
  handleClick(i){
    const squares = this.state.squares.slice(); 
    let {currentPhase} = this.state;
    currentPhase++;
    const history = this.state.history.slice(0, currentPhase);
    if (calculateWinner(squares) || squares[i]){return}
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
      history: [...history, {squares: squares}],
      currentPhase: history.length
    })
  }
  returnToPhase(i){
    const {history} = this.state;
    this.setState({
      squares: history[i].squares,
      currentPhase: i,
      xIsNext: i % 2 ? true : false
    });
  }
  render() {
    const {squares, history} = this.state;
    let status = calculateWinner(squares) ? `Winner is: ${calculateWinner(squares)}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    const phases =  history.map((e, i) => (
      <li 
        key={i} 
        id={i}
        onClick={() => {this.returnToPhase(i)}}
        className="mb-2"
      >
        <button className="btn btn-outline-success">Go to Move #{i+1}</button>
      </li>
    ))

    return (
      <div className="mt-3 ml-3 container">
        <h1>Tic-Tac-Toe</h1>
        <div className="game container mt-5">
          <div className="game-board">
            <Board 
              squares={this.state.squares}
              handleClick={this.handleClick}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{/* TODO Add phases here */}
              {phases}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;