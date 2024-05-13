const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require("socket.io")
cors = require("cors");

const { checkWin, isTurnX } = require('./function');
const { readOneGame, updateData, createGame, newRoomId, roomIds } = require('./Db/controller');
const filePath = './DB/gameData.json';

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', mehodes: '*' } });

io.on('connection', socket => {

    socket.on('createGame', (name) => {
        let numRoom = newRoomId(filePath);
        createGame(filePath, numRoom, name, socket.id)
        socket.join(numRoom)
        socket.emit('numRoom', { roomId: numRoom, socketId: socket.id })
    })

    socket.on('joinGame', (numRoom) => {
        const checkRoom = roomIds(filePath).includes(numRoom.toString())
        if (checkRoom) {
            let data = readOneGame(filePath, numRoom)
            socket.join(numRoom);
            if (data.players[0].socketId !== socket.id) {
                updateData(filePath, numRoom, "socketId", socket.id, 1)
            }
        }
        socket.emit('checkRoom', { flag: checkRoom, roomId: numRoom, socketId: socket.id })
    })

    socket.on('updateData', ({ index, socketId, numRoom }) => {
        let data = readOneGame(filePath, numRoom)
        data.gameMoves[index] = (data.players[0].socketId === socket.id ? 'X' : 'O')
        const result = updateData(filePath, numRoom, "gameMoves", data.gameMoves)
        updateData(filePath, numRoom, "step", ++data.step);
        data = readOneGame(filePath, numRoom)
        io.to(numRoom).emit('updated', data.gameMoves)
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

app.get('/isTurnX/:id', (req, res) => {
    const { id } = req.params;

    try {
        res.send(isTurnX(filePath, id));

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

app.post('/updateData/:id', (req, res) => {

    const { id } = req.params;
    const { name, index, value } = req.body || {};

    try {
        let result = checkWin(filePath, id);
        //update second name player
        if (name) {
            result = updateData(filePath, id, "players", name)
        }

        // update steps
        if (!result && index !== undefined && index !== null && value) {
            let data = readOneGame(filePath, id)
            data.gameMoves[index] = value;
            result = updateData(filePath, id, "gameMoves", data.gameMoves)
            updateData(filePath, id, "step", ++data.step);

            const win = checkWin(filePath, id);
            if (win) {
                const updatedData = readOneGame(filePath, id);
                const { step, gameMoves } = updatedData;
                result = { win, step, gameMoves };
            }
        }
        res.send(result).status(200);
    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});