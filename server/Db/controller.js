const fs = require('fs');

const readData = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const readOneGame = (path, id) => readData(path)[id];

const lastRoomId = (path) => {
    const keys = Object.keys(readData(path));
    return keys[keys.length - 1];
};

const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
    return readData(path);
};

const updateData = (path, id, field, newData) => {
    let data = readData(path);
    // field === 'players' ?
    //     data[id][field][1]['name'] = newData : data[id][field] = newData;
    field === 'socketId' ?
        data[id]['players'][1]['socketId'] = newData : data[id][field] = newData;
    return writeData(path, data)[id][field];
}

const createGame = (path, id, name ,socketId) => {

    const newGame = {
        "players": [
            { "socketId": socketId, "name": name, "symbol": "X", 'avatar': "", 'numberVictories': "" },
            { "socketId": '', "name": "Player 2", "symbol": "O", 'avatar': "", 'numberVictories': "" }
        ],
        "gameMoves": ["", "", "", "", "", "", "", "", ""],
        "step": 0
    };
    let data = readData(path);
    data[id] = newGame;
    return writeData(path, data)[id];

}

module.exports = { readOneGame, writeData, updateData, createGame, lastRoomId };