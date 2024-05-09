const fs = require('fs');

const readData = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const readOneGame = (path, id) => JSON.parse(fs.readFileSync(path, 'utf8'))[id];

const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
    return readData(path);
};

const updateData = (path, id, field, newData) => {
    let data = readData(path);
    field === 'players' ?
        data[id][field][1]['name'] = newData : data[id][field] = newData;
    return writeData(path, data)[id][field];
}

const createGame = (path, id, name) => {

    const newGame = {
        "players": [
            { "name": name, "symbol": "X" },
            { "name": "Player 2", "symbol": "O" }
        ],
        "gameMoves": ["", "", "", "", "", "", "", "", ""],
        "step": 0
    };
    let data = readData(path);
    data[id] = newGame;
    return writeData(path, data)[id];

}


module.exports = { readOneGame, writeData, updateData, createGame };