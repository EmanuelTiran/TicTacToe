const { readOneGame, updateData } = require('./Db/controller');

function checkWin(filePath, id) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let data = readOneGame(filePath, id);
    let { gameMoves, step } = data;

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (gameMoves[a] === 'X' && gameMoves[b] === 'X' && gameMoves[c] === 'X') {
            return `X win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()}  ${step.toString()}`;

        }
        if (gameMoves[a] === 'O' && gameMoves[b] === 'O' && gameMoves[c] === 'O') {
            return `O win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()} ${step.toString()}`;

        }
    }
}
const isTurnX = (filePath, id) => {
    let step = readOneGame(filePath, id)['step'];
    return step % 2 == 0;
}
const isValidQueue = (path, numRoom, socketId) => {
    let game = readOneGame(path, numRoom);
    return (socketId === game.players[0].socketId && isTurnX(path, numRoom)
        || socketId === game.players[1].socketId && !isTurnX(path, numRoom))
        && game.players[1].socketId !== "";
}


const isValidJoin = (path, numRoom, socketId) => {
    let game = readOneGame(path, numRoom);
    return game.players[1].socketId === ""
        || socketId === game.players[0].socketId
        || socketId === game.players[1].socketId
}

const newGame = (path, numRoom) => {
    const newGame = ["", "", "", "", "", "", "", "", ""];
    updateData(path, numRoom.numRoom, "step", 0);
    const gameMoves = updateData(path, numRoom.numRoom, 'gameMoves', newGame);
    return gameMoves;
}

module.exports = { checkWin, isTurnX, isValidQueue, isValidJoin, newGame };