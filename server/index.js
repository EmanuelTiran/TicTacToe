const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require("socket.io")
cors = require("cors");

const { checkWin, isValidQueue, isValidJoin, newGame } = require('./function');
const { readOneGame, updateData, createGame, newRoomId, roomIds } = require('./Db/controller');
const filePath = './DB/gameData.json';

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', mehodes: '*' } });

io.on('connection', socket => {

    socket.on('createGame', (name) => {
        try {
            let numRoom = newRoomId(filePath);
            createGame(filePath, numRoom, name, socket.id)
            socket.join(numRoom)
            socket.emit('numRoom', { roomId: numRoom, socketId: socket.id })
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('joinGame', (numRoom) => {
        try {

            if (!roomIds(filePath).includes(numRoom.toString())) {
                throw new Error('The room does not exist');
            }

            let checkJoin = isValidJoin(filePath, numRoom, socket.id);
            if (checkJoin) {
                let data = readOneGame(filePath, numRoom)
                socket.join(numRoom)
                if (data.players[0].socketId !== socket.id) {
                    updateData(filePath, numRoom, "socketId", socket.id, 1)
                }
            }

            socket.emit('checkRoom', { flag: checkJoin, roomId: numRoom, socketId: socket.id })
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('updateData', ({ index, socketId, numRoom }) => {
        try {
            let result;
            let win = checkWin(filePath, numRoom);
            if (win) {
                const { step, gameMoves } = readOneGame(filePath, numRoom);
                result = { win, step, gameMoves };
            }
            else {
                if (!isValidQueue(filePath, numRoom, socket.id)) {
                    throw new Error('Invalid turn or player not authorized.');
                }
                let { gameMoves, step, players } = readOneGame(filePath, numRoom)
                gameMoves[index] = (players[0].socketId === socket.id ? 'X' : 'O')
                result = updateData(filePath, numRoom, "gameMoves", gameMoves)
                updateData(filePath, numRoom, "step", ++step);
                let win = checkWin(filePath, numRoom);
                if (win) {
                    const { step, gameMoves } = readOneGame(filePath, numRoom);
                    result = { win, step, gameMoves };
                }
            }
            io.to(numRoom).emit('updated', result)
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('newGame', (numRoom) => {
        try {
            const result = newGame(filePath, numRoom);
            io.to(numRoom).emit('updatedNew', result);
            io.emit('updatedNew', result);
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })  

})


app.use(express.json());

app.get('/gameData/:id', (req, res) => {
    const { id } = req.params;
    try {
        res.json(readOneGame(filePath, id));
    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

});

app.post('/newGame/:id', (req, res) => {
    const { id } = req.params;

    try {
        const newGame = ["", "", "", "", "", "", "", "", ""];
        const gameMoves = updateData(filePath, id, 'gameMoves', newGame);
        const step = updateData(filePath, id, "step", 0);
        res.send({ gameMoves, step });

    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

})

// app.post('/updateData/:id', (req, res) => {

//     const { id } = req.params;
//     const { name, index, value } = req.body || {};

//     try {
//         let result = checkWin(filePath, id);
//         //update second name player
//         if (name) {
//             result = updateData(filePath, id, "players", name)
//         }

//         // update steps
//         if (!result && index !== undefined && index !== null && value) {
//             let data = readOneGame(filePath, id)
//             data.gameMoves[index] = value;
//             result = updateData(filePath, id, "gameMoves", data.gameMoves)
//             updateData(filePath, id, "step", ++data.step);

//             const win = checkWin(filePath, id);
//             if (win) {
//                 const updatedData = readOneGame(filePath, id);
//                 const { step, gameMoves } = updatedData;
//                 result = { win, step, gameMoves };
//             }
//         }
//         res.send(result).status(200);
//     } catch (error) {
//         console.log({ error });
//         res.status(500).send('Internal Server Error');
//     }

// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});