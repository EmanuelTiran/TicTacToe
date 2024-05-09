import { useContext, useState } from 'react';

import style from "./style.module.css"
import Square from '../Square'
import Btn from '../Btn';
import { axiosReq } from '../apiReq'
// import { useNavigate } from "react-router-dom";

export default function Board() {
  const [symbols, setSymbols] = useState(Array(9).fill(''));
  const [playAgain, setPlayAgain] = useState(false);
  // const navigate = useNavigate();

  const players = Array(9).fill(null);
  const backToWelcome = async () => {
    // navigate("chooseplayer");
  }
  const newGame = async () => {
    try {

      const updatedData = await axiosReq({ method: 'post', url: `newGame/45` });
      console.log(updatedData);
      setSymbols(updatedData.gameMoves);
      setPlayAgain(false)
    } catch (error) {
      console.log(error);
      console.error("Error fetching data: ", error?.response);
    }
  }
  return (<div className={style.boardGame}>
    <div>
      <div className={style.borderTop}></div>
      <div className={style.container}></div>
      <div className={style.borderBottom}></div>
    </div>
    <div className={style.board}>
      {symbols && symbols.map((value, index) => (
        <Square key={index} index={index} setSymbols={setSymbols} symbols={symbols} setPlayAgain={setPlayAgain} />
      ))}
    </div>

    {playAgain && <div onClick={newGame}><Btn value={"play again"} /></div>}
    {!playAgain && <div onClick={backToWelcome}><Btn value={"back"} /></div>}
  </div>
  );
}

