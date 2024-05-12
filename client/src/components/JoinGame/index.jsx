import { useState, useContext } from 'react';
import Btn from '../Btn';
import style from "./style.module.css"
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useSocket from '../../socket';
import DataContext from '../DataContext';



export default function JoinGame() {
    const { setPlayer } = useContext(DataContext);

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const socket = useSocket()

    const handleJoinClick = () => {
        socket.emit('joinGame', inputValue);
        socket.on('checkRoom', flag => {
            flag ? navigate('/board') : alert("roomm is not avaiable")
        })
    };
    const handleCreateGame = () => {
        socket.emit('createGame')
        socket.on('numRoom', ({ roomId, socketId }) => {
            setPlayer(prev => ({ ...prev, roomId, socketId }));
        })
    };

    return (
        <div className={style.joinGame}>
            <div className={style.sqr}>
                <IoReturnUpBack />
            </div>
            join to a game
            <input
                className={style.input}
                placeholder='enter code game'
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div onClick={handleJoinClick} >
                <Btn value={'JOIN'} />
            </div>
            <div className={style.lines}>
                <span className={style.line}></span>
                OR
                <span className={style.line}></span>
            </div>
            <div onClick={handleCreateGame} >
                <Btn value={'create a game'} />
            </div>
        </div>
    )
}
