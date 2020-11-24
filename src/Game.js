import React from 'react';
import Board from './Board';

// STOP: Display different states of game on click. 
// 1. List each phase of game next to board
// 2. When you click on one of the phases, make board go back to that phase.
//    a. If you click on a square after going back to a phase "X", delete all phases that came after phase you clicked on, and continue game from phase "X"
// 3. Create a button for each phase. Give these buttons a unique id, so you can click on them and go back to a certain phase. 
// 4. When you click on a phase button, set the state of the board to be that phase.
//    a. The selected phase has id "i", which corresponds to the index of "this.state.history" that matches the phase. 
//    b. When you click on phase 1, use this.state.history[i].
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i){
    const squares = this.state.squares.slice(); 
    const history = this.state.history.slice();
    if (calculateWinner(squares) || squares[i]){return}
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
      history: [...history, {squares: squares}]
    }, ()=>{console.log('history',this.state.history)})
  }
  render() {
    const {squares, history} = this.state;
    let status = calculateWinner(squares) ? `Winner is: ${calculateWinner(squares)}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    //add onClick to each phase, so that you can set state to correct history point.
    const phases =  history.map((e, i) => (
      <li 
        key={i} 
        id={i}
        onClick={() => {
          this.setState({squares: history[i].squares})
        }}
      >
        <button> Go to phase {i+1}</button>
      </li>
    ))

    return (
      <div className="game">
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