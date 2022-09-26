import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import {useWindowSize} from '@react-hook/window-size'
import Confetti from 'react-confetti'

function App() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isXturn, setIsXturn] = useState(true);
  const { width, height } = useWindowSize()

  const handleClick = (i) => {
    if (!winner && board[i] === null) {
      const copyBoard = [...board];
      copyBoard[i] = isXturn ? "x" : "0";
      setBoard(copyBoard);
      setIsXturn(!isXturn);
    }
  };

  const decideWinner = (board) => {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for(let i=0 ; i < lines.length ; i++)
    {
      const [a,b,c] = lines[i] ; 

      if(board[a] != null && board[a] === board[b] && board[b] === board[c])
      {
        console.log(board[a]);
        return board[a];
      }
    }
    return null;

  };
  const winner = decideWinner(board);

  return (
    <>
      <h1 className="winner text-center m-3"> Tic Tac Toe</h1>
      <div className="full-board">
        <div className="board">
          {board.map((val, i) => {
            return (
              <GameBox key={i} val={val} onPlayerClick={() => handleClick(i)} />
            );
          })}
        </div>
        {winner ? <><Confetti
      width={width}
      height={height}
    /><h2 className="winner mt-3">Winner is {winner}</h2></> : ""}
        <Button
          variant="primary"
          className="mt-5"
          onClick={() => {
            setBoard([null, null, null, null, null, null, null, null, null]);
            setIsXturn(true);
          }}
        >
          Restart
        </Button>
      </div>
    </>
  );
}

export default App;

const GameBox = ({ val, onPlayerClick }) => {
  const styles = { color: val === "x" ? "green" : "red" };

  return (
    <div className="game-box" style={styles} onClick={() => onPlayerClick()}>
      {val}
    </div>
  );
};
