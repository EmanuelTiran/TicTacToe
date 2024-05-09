import React from 'react'
import styles from './style.module.css'
import { PiArrowArcLeftThin } from "react-icons/pi";



export default function BtnSold() {
  return (
    <div className={styles.container}>
        <PiArrowArcLeftThin className={styles.arrow} />

    </div>
  )
}
