'use strict';

// changes player turn starting from player X
let xTurn = true;

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        let playerChoice = box.dataset.number;
        Render(box, playerChoice);
    });
});

// Gameboard module is the powerhouse the game
const Gameboard = (function () {
    const winPattern =
        [[0, 1, 2], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]];
    let gameBoard = [];
    let playerSelect1 = document.getElementById('player-select1');
    let playerSelect2 = document.getElementById('player-select2');
    let p1 = playerSelect1.innerHTML;
    let p2 = playerSelect2.innerHTML;

    return {
        gameBoard,
        winPattern,
        p1,
        p2
    };
})();

const Players = function (name, position) {

};

const DiplayController = (function () {

})();

const Render = function (box, playerChoice) {
    // prevents redundancy in array
    if (!(Gameboard.gameBoard.includes(playerChoice))) {
        Gameboard.gameBoard.push(playerChoice);
        if (xTurn) {
            box.innerHTML = 'X';
            xTurn = false;
        }
        else {
            box.innerHTML = 'O';
            xTurn = true;
        }
    }

};



