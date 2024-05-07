import React from 'react'
import style from "./style.module.css"
import Btn from '../Btn'
import X from '../X'
import O from '../O'

export default function Menu() {
    return (
        <div className={style.menu}>
            <img className={style.img} src="/img/LogoSmall.svg" alt="" />
            {/* <O id={style.blurO}/>
            <O className={style.blurO}/>
            <X className={style.blurX}/>
            <X className={style.regularO}/> */}
            <div className={style.btns}>
                <Btn value={"play solo"} />
                <Btn value={"play with a friend"} />
            </div>
        </div>
    )
}
