import React, { useState, useContext ,useEffect} from 'react'
import style from "./style.module.css"
import DataContext from "../DataContext";
import useSocket from '../../socket';

import { axiosReq } from '../apiReq'
import X from '../X'
import O from '../O'

export default function Square({ index, setSymbols, symbols, setPlayAgain }) {
  const socket = useSocket()
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { setText, setOpen, player } = useContext(DataContext);

  useEffect(()=>{
    socket.on('updated',(updatedData)=>{
      console.log(updatedData);
      if (Array.isArray(updatedData)) {
        setSymbols(updatedData);
      } else {
        setPlayAgain(true)
        setSymbols(updatedData.gameMoves);
        setOpen(true)
        setText(updatedData.win)
      }
    })
  },[symbols])

  const fetchData = async () => {
    try {

      // const isTurnX = await axiosReq({ url: `isTurnX/45` })
      // const gameMoves = {
      //   index: index,
      //   value: isTurnX ? 'X' : 'O'
      // };
      console.log(player);
      socket.emit('updateData', {index, socketId: player.socketId});
      socket.on('updated',(updatedData)=>{
        console.log(updatedData);
        if (Array.isArray(updatedData)) {
          setSymbols(updatedData);
        } else {
          setPlayAgain(true)
          setSymbols(updatedData.gameMoves);
          setOpen(true)
          setText(updatedData.win)
        }
      })


   
      // const updatedData = await axiosReq({ method: 'post', url: `updateData/45`, body: gameMoves });
      // if (Array.isArray(updatedData)) {
      //   setSymbols(updatedData);
      // } else {
      //   setPlayAgain(true)
      //   setSymbols(updatedData.gameMoves);
      //   setOpen(true)
      //   setText(updatedData.win)
      // }
    } catch (error) {
      console.error("Error fetching data: ", error?.response);
    }
  };


  function fillSquare() {
    if (!symbols[index]) {
      setIsMouseDown(true);
      fetchData();
    }
  }

  const releaseSquare = () => {
    setIsMouseDown(false);
  };


  return (
    <div className={`${style.square} ${isMouseDown ? style.noBoxShadow : ''}`}
      onMouseDown={fillSquare}
      onMouseUp={releaseSquare}
    >
      {symbols[index] === '' ? null : (symbols[index] === 'X' ? <X /> : <O />)}
    </div>
  );
}
