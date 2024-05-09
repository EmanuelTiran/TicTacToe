const express = require('express');
const app = express();
const cors = require("cors");

const { checkWin, isTurnX } = require('./function');
const { readOneGame, updateData } = require('./Db/controller');

const filePath = './DB/gameData.json';

app.use(cors());
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});