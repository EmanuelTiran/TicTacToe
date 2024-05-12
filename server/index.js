const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require("socket.io")
cors = require("cors");

const { checkWin, isTurnX } = require('./function');
const { readOneGame, updateData } = require('./Db/controller');
const filePath = './DB/gameData.json';

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', mehodes: '*' } });
const newGame = {
    "players": [
        { "socketId": '', "name": "player 1", "symbol": "X" },
        { "socketId": '', "name": "Player 2", "symbol": "O" }
    ],
    "gameMoves": ["", "", "", "", "", "", "", "", ""],
    "step": 0
};

io.on('connection', socket => {

    socket.on('createGame', () => {
        newGame.players[0].socketId = socket.id;
        console.log(newGame);
        socket.join(45)
        socket.emit('numRoom', { roomId: 45, socketId: socket.id })
    })

    socket.on('joinGame', (roomNum) => {
        newGame.players[1].socketId = socket.id;
        socket.join(roomNum)
        socket.emit('checkRoom', true)
    })

    socket.on('updateData', ({ index, socketId }) => {
        newGame.gameMoves[index] = newGame.players[0].socketId === socketId ? 'X' : 'O'
        io.to(45).emit('updated', newGame.gameMoves)
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