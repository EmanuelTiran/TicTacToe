const express = require('express');
const { readData, checkWin, isTurnX } = require('./function');
const fs = require('fs');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/gameData', (req, res) => {

    try {
        const data = readData('gameData.json');
        res.json(JSON.parse(data));

    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

});


app.get('/isTurnX', (req, res) => {

    try {
        res.send(isTurnX());

    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

});

app.post('/newGame', (req, res) => {
    try {
        let data = readData('gameData.json');
        data = JSON.parse(data);
        data.gameMoves = ["", "", "", "", "", "", "", "", ""]
        fs.writeFileSync('gameData.json', JSON.stringify(data));
        const updatedData = JSON.parse(readData('gameData.json'))
        const {  gameMoves } = updatedData
        res.send(gameMoves);
    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

})

app.post('/updateData', (req, res) => {
    let { players } = req.body || {};
    let { index, value } = req.body || {};

    try {
        const data = JSON.parse(readData('gameData.json'));

        //עדכון שמות השחקנים
        if (players) {
            data.players[0].name = players.name1;
            data.players[1].name = players.name2;
        }

        //עדכון מהלך וצעדים
        if (index !== undefined && index !== null && value) {
            data.gameMoves[index] = value;
            data.step++;
        }

        // כתיבת הנתונים חזרה לקובץ
        fs.writeFileSync('gameData.json', JSON.stringify(data));
        const win = checkWin()
        const updatedData = JSON.parse(readData('gameData.json'))
        const { step, gameMoves } = updatedData
        let result = win ? { win, step, gameMoves } : gameMoves

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