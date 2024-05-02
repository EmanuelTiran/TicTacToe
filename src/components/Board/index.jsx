import React from 'react'
import style from "./style.module.css"
import Squre from '../Squre'
import X from '../X';
import O from '../O';
export default function Board() {
    const squares = [];

    for (let i = 0; i < 9; i++) {
        i%2==0?
      squares.push(<Squre key={i} player={<X/>} />):
      squares.push(<Squre key={i} player={<O/>} />)
    }
  
    return (
      <div className={style.board}>
        {squares}
      </div>
    );
}
