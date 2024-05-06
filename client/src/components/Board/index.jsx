import { useContext, useState } from 'react';

import style from "./style.module.css"
import Square from '../Square'
import Btn from '../Btn';
import { axiosReq } from '../apiReq'

export default function Board() {
  const [symbols, setSymbols] = useState(Array(9).fill(''));
  const [playAgain, setPlayAgain] = useState(true);

  const players = Array(9).fill(null);
  const newGame = async () => {
    try {

      const updatedData = await axiosReq({ method: 'post', url: `newGame` });
      console.log(updatedData);
      setSymbols(updatedData);
      setPlayAgain(true)
    } catch (error) {
      console.log(error);
      console.error("Error fetching data: ", error?.response);
    }
  }
  return (
    <div className={style.board}>
      {symbols && symbols.map((value, index) => (
        <Square key={index} index={index} setSymbols={setSymbols} symbols={symbols} />
      ))}
      {playAgain && <div onClick={newGame}><Btn value={"play again"}/></div>}
    </div>
  );
}

