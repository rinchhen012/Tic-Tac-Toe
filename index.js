'use strict';


const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        let playerChoice = box.dataset.number;
        Render();
    });
});

let playerSelect1 = document.getElementById('player-select1');
let playerSelect2 = document.getElementById('player-select2');
let p1 = playerSelect1.options[playerSelect1.selectedIndex].value;

const Gameboard = (function () {
    const winPattern =
        [[0, 1, 2], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]];
    let gameBoard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    return {
        gameBoard,
        winPattern
    };
})();

const Players = function (name, position) {

};

const DiplayController = (function () {

})();

const Render = function () {
    if () {
        box.innerHtml = 'X';
    }
};


Render();