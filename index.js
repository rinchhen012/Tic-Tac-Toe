'use strict';

//  player turn starting from player X
let xTurn = true;

//  top input field menu
const inputMenu = document.querySelector('.name-input');

const homeBtn = document.querySelector('.home-button');
homeBtn.addEventListener('click', () => {
    inputMenu.style.visibility = "initial";
    //  clears input field
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    Gameboard.gameBoardObj.gameBoard = [];
});

const startBtn = document.querySelector('.start-button');
startBtn.addEventListener('click', () => {
    //  player names from input field
    const p1Name = document.getElementById('player1').value;
    const p2Name = document.getElementById('player2').value;

    //  making sure players names are entered
    if (p1Name === '' || p2Name === '' || p1Name === p2Name) {
        alert('Please enter unique player names to proceed')
    }
    else {
        inputMenu.style.visibility = "hidden";
    }
});

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        let playerChoice = box.dataset.number;
        Render(box, playerChoice);
        PlayerVsPlayer();
    });
});

//  Gameboard module is the powerhouse of the game
const Gameboard = (function () {
    const winPattern =
        [[0, 1, 2], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]];
    const gameBoardObj = {
        gameBoard: [],
        round: 0,
    };

    //  player selection from select list
    let playerSelect1 = document.getElementById('player-select1');
    let playerSelect2 = document.getElementById('player-select2');
    let p1 = playerSelect1.options[playerSelect1.selectedIndex].text;
    let p2 = playerSelect2.options[playerSelect2.selectedIndex].text;



    return {
        gameBoardObj,
        p1,
        p2,
    };
})();

const PlayerVsPlayer = function () {
    let strike = false;
    //  X vs O
    if ((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Player O') ||
        (Gameboard.p2 === 'Player X') && (Gameboard.p1 === 'Player O')) {
            
    }
    //  AI vs AI
    if ((Gameboard.p1 === 'Beta AI' || Gameboard.p1 === 'Alpha AI') &&
        (Gameboard.p2 === 'Beta AI' || Gameboard.p2 === 'Alpha AI')) {
        AiBattle(Gameboard.p1, Gameboard.p2);
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
    if (!(Gameboard.gameBoardObj.gameBoard.includes(playerChoice))) {
        Gameboard.gameBoardObj.gameBoard.push(playerChoice);
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
};


