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
  //To Do to lift state:
  // 1. Move relevant functions if necessary
  // 2. Pass state as props to relevant components 
  // 3. Change "this.state...." to "this.props..." in Board Component
  
  handleClick(i){
    const squares = this.state.squares.slice(); 
    const history = this.state.history.slice();
    //state needs to be set so that Game gets info about "squares"
    //since handleClick needs to be used to set the state of "squares", handleClick needs to be lifted. 
    if (calculateWinner(squares) || squares[i]){return}
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
      history: [...history, {squares: squares}]
    }, ()=>{console.log('history',this.state.history)})
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