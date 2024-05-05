import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from "./style.module.css"
import X from '../X'
import O from '../O'

export default function Square({ index, player, setPlayers, isTurnX, setIsTurnX, players }) {
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const updatedData = {
  //         game_moves: {
  //           index: 0,
  //           value: "client"
  //         }
  //       };

  //       const response = await axios.post('http://localhost:3000/updateData', updatedData);
  //       console.log(response.data);
  //       // setGameData(response.data);
  //       // setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching game data:', error);
  //       // setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [players[index]]);

  const releaseSquare = () => {
    setIsMouseDown(false);
  };

  function fillSquare() {
    if (!player) {
      const newPlayer = isTurnX ? <X /> : <O />;
      const newPlayers = [...players];
      newPlayers[index] = newPlayer;
      setPlayers(newPlayers);
      setIsTurnX(!isTurnX);
      setIsMouseDown(true);
    }
  }
  useEffect(() => {
    console.log(players[index]?.type?.name);
  }, [players[index]])

  return (
    <div className={`${style.square} ${isMouseDown ? style.noBoxShadow : ''}`}
      onMouseDown={fillSquare}
      onMouseUp={releaseSquare}
    >
      {player}
    </div>
  );
}
