import React, { useState } from 'react';
import { useContext } from 'react';

import DataContext from "../DataContext";

import style from "./style.module.css"
import Square from '../Square'
import X from '../X';
import O from '../O';
export default function Board() {
  const { pop } = useContext(DataContext);

  const [isTurnX, setIsTurnX] = useState(true);
  const [players, setPlayers] = useState(Array(9).fill(null));
  
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

  function checkWin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a].type?.name === 'X' && squares[b].type?.name === 'X' && squares[c].type?.name === 'X') {
        console.log("X win at cells:", a, b, c);
      }
      if (squares[a] && squares[a].type?.name === 'O' && squares[b].type?.name === 'O' && squares[c].type?.name === 'O') {
        console.log("O win at cells:", a, b, c);
      }
    }

    return null;
  }

  return (
    <div className={style.board}>
      {players.map((value, index) => (
        <Square key={index} index={index} player={value} setPlayers={setPlayers} isTurnX={isTurnX} setIsTurnX={setIsTurnX} players={players} />
      ))}
      <button onClick={() => checkWin(players)}>Check Win</button>
    </div>
  );
}

