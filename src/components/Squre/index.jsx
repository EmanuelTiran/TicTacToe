import React from 'react'
import style from "./style.module.css"
import X from '../X'

export default function Squre({player}) {
  return (
    <div className={style.squre}>
      {player}
    </div>
  )
}
