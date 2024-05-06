import React from 'react'
import style from "./style.module.css"
import Btn from '../Btn'

export default function O() {
    return (
        <div className={style.menu}>
            <img className={style.img} src="/img/LogoSmall.svg" alt="" />
            <div className={style.btns}>
                <Btn value={"play solo"} />
                <Btn value={"play with a friend"} />
            </div>
        </div>
    )
}
