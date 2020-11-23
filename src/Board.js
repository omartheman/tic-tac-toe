import React from 'react';
import Square from './Square';

//tell each square it's state
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: []
      //after each move, on handleClick, store the current state of the board (this.state.squares) in history.
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i){
    const squares = this.state.squares.slice(); 
    const history = this.state.history.slice();
    //stop here, last i did was make the tic tac toe winner message work, and deactivated clicking once a square was filled
    if (calculateWinner(squares) || squares[i]){return}
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    })
  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick = {() => {this.handleClick(i)}}
      />);
  }
  render() {
    const squares = this.state.squares.slice();
    let status = calculateWinner(squares) ? `Winner is: ${calculateWinner(squares)}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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

export default Board;