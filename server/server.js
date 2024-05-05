const express = require('express');
const fs = require('fs');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.get('/gameData', (req, res) => {
    fs.readFile('gameData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.post('/updateData', (req, res) => {

    let { players } = req.body.players || {};

    let { index, value } = req.body.game_moves;

    fs.readFile('gameData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let gameData;
        if (data != {}) {
            gameData = JSON.parse(data);

        }
        // עדכון שמות השחקנים
        if (players) {
            gameData.players[0].name = players.name1;
            gameData.players[1].name = players.name2;
        }

        //עדכון מהלך  
        if (index) {
            gameData.game_moves[index] = value;
        }


        // כתיבת הנתונים חזרה לקובץ
        fs.writeFile('gameData.json', JSON.stringify(gameData), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(gameData).status(200);
            console.log('JSON.parse(data)', gameData);
        });

    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});