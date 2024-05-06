import { useContext, useState } from 'react';
import DataContext from "../DataContext";

import style from "./style.module.css"
import Square from '../Square'

export default function Board() {
  const { text, setText, open, setOpen } = useContext(DataContext);
  const [symbols, setSymbols] = useState(Array(9).fill(''));

  const players = Array(9).fill(null);

  return (
    <div className={style.board}>
      {symbols && symbols.map((value, index) => (
        <Square key={index} index={index} setSymbols={setSymbols} symbols={symbols} />
      ))}
      <button onClick={() => checkWin(players)}>Check Win</button>
    </div>
  );
}

