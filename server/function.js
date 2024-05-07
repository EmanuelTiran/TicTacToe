const fs = require('fs');

const readData = (path) => {
    return fs.readFileSync(path, 'utf8');
}

function checkWin() {
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
    let data = readData('gameData.json');
    data = JSON.parse(data);
    let { gameMoves } = data;


    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (gameMoves[a] && gameMoves[a] === 'X' && gameMoves[b] === 'X' && gameMoves[c] === 'X') {
            // data.gameMoves =  ["","","","","","","","",""]
            // fs.writeFileSync('gameData.json', JSON.stringify(data));
            return `X win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()}`;

        }
        if (gameMoves[a] && gameMoves[a] === 'O' && gameMoves[b] === 'O' && gameMoves[c] === 'O') {
            // data.gameMoves =  ["","","","","","","","",""]
            // fs.writeFileSync('gameData.json', JSON.stringify(data));
            return `O win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()}`;

        }
    }
}
const isTurnX = () => {
    let data = readData('gameData.json');
    data = JSON.parse(data);
    const { step } = data;
    return step % 2 == 0;
}

module.exports = { readData, checkWin, isTurnX };