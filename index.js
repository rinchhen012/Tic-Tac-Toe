'use strict';

//  player turn starting from player X
let xTurn = true;

const inputMenu = document.querySelector('.name-input');

const homeBtn = document.querySelector('.home-button');
homeBtn.addEventListener('click', () => {
    inputMenu.style.visibility = "initial";
    //  clears input field
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';

});
const startBtn = document.querySelector('.start-button');
startBtn.addEventListener('click', () => {
    //  player names from input field
    const p1Name = document.getElementById('player1').value;
    const p2Name = document.getElementById('player2').value;
    if (p1Name === '' || p2Name === '') {
        alert('Please enter names to proceed')
    } else {
        inputMenu.style.visibility = "hidden";
    }
});

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        let playerChoice = box.dataset.number;
        Render(box, playerChoice);
    });
});

//  Gameboard module is the powerhouse of the game
const Gameboard = (function () {
    const winPattern =
        [[0, 1, 2], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]];
    let gameBoard = [];
    let playerSelect1 = document.getElementById('player-select1');
    let playerSelect2 = document.getElementById('player-select2');
    let p1 = playerSelect1.options[playerSelect1.selectedIndex].text;
    let p2 = playerSelect2.options[playerSelect2.selectedIndex].text;
    const inputMenu = document.getElementById('name-input');

    return {
        gameBoard,
        winPattern,
        p1,
        p2,
        inputMenu
    };
})();

const Players = function () {
    //  AI vs AI
    if ((Gameboard.p1 === 'Beta AI' || Gameboard.p1 === 'Alpha AI') &&
        (Gameboard.p2 === 'Beta AI' || Gameboard.p2 === 'Alpha AI')) {
        AiBattle(Gameboard.p1, Gameboard.p2);
    }
    //  X vs O
    if ((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Player O')) {
        console.log('Player X vs Player O');
    }
    //  Player vs AI
    if (((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Beta AI'
        || Gameboard.p2 === 'Alpha AI')) || ((Gameboard.p1 === 'Beta AI'
            || Gameboard.p1 === 'Alpha AI') && (Gameboard.p2 === 'Player O'))) {
        console.log('Player vs AI');
    }
};

const Render = function (box, playerChoice) {
    //  prevents redundancy in array
    if (!(Gameboard.gameBoard.includes(playerChoice))) {
        Gameboard.gameBoard.push(playerChoice);
        if (xTurn) {
            box.innerText = 'X';
            xTurn = false;
        }
        else {
            box.innerText = 'O';
            xTurn = true;
        }
    }

};

const AiBattle = function (p1, p2) {
    console.log(p1, p2);
}

Players();


