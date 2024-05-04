import React from 'react'
import style from "./style.module.css"
import X from '../X'
import O from '../O'

export default function Square({ index, player, setPlayers, isTurnX, setIsTurnX, players }) {

  function fillSquare() {
    if (!player) {
      const newPlayer = isTurnX ? <X /> : <O />;
      const newPlayers = [...players];
      newPlayers[index] = newPlayer;
      setPlayers(newPlayers);
      setIsTurnX(!isTurnX);
    }
  }

  return (
    <div className={style.square} onClick={() => fillSquare()}>
      {player}
    </div>
  );
}
