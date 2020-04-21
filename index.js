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

    Gameboard.gameBoardObj.gameBoardX = [];
    Gameboard.gameBoardObj.gameBoardO = [];
    Gameboard.gameBoardObj.round = 0;
    boxes.forEach((box) => {
        box.innerText = '';
    });
    scoreBoard.innerText = '';
    xTurn = true;
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

//  score board
const scoreBoard = document.querySelector('.score-board');

//  even listener for every box click
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
    const winPattern = {
        '0': '012',
        '1': '036',
        '2': '147',
        '3': '258',
        '4': '345',
        '5': '678',
        '6': '048',
        '7': '246',
    }

    const gameBoardObj = {
        gameBoardX: [],
        gameBoardO: [],
        round: 0,
    };

    //  player selection from select dropdown list
    let playerSelect1 = document.getElementById('player-select1');
    let playerSelect2 = document.getElementById('player-select2');
    let p1 = playerSelect1.options[playerSelect1.selectedIndex].text;
    let p2 = playerSelect2.options[playerSelect2.selectedIndex].text;

    const winnerChecker = function (len) {
        let strX,
            strO;

        if (len === 3) {
            strX = Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2];
            strX = strX.split('').sort((a, b) => a - b).join('');
            strO = Gameboard.gameBoardObj.gameBoardO[0] +
                Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[2];
            strO = strO.split('').sort((a, b) => a - b).join('');
        }
        if (len === 4) {
            strX = Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3];
            strX = strX.split('').sort((a, b) => a - b).join('');
            strO = Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[2] +
                Gameboard.gameBoardObj.gameBoardO[3];
            strO = strO.split('').sort((a, b) => a - b).join('');
        }
        if (len === 5) {
            strX = Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3] +
                Gameboard.gameBoardObj.gameBoardX[4];
            strX = strX.split('').sort((a, b) => a - b).join('');
            console.log(strX);
        }

        //  loop to check if win pattern matches
        for (let i = 0; i <= 7; i++) {
            if (strX === winPattern[i])
                return 'x';
            if (strO === winPattern[i])
                return 'o';
        }

        if (len === 5 && strX === undefined) return 'tie';
    };

    return {
        gameBoardObj,
        p1,
        p2,
        winnerChecker
    };
})();

const PlayerVsPlayer = function () {
    let strike,
        xCounter = 0,
        oCounter = 0,
        tieCounter = 0;

    //  X vs O
    if ((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Player O')) {

        if (Gameboard.gameBoardObj.gameBoardX.length === 3 ||
            Gameboard.gameBoardObj.gameBoardO.length === 3)
            strike = Gameboard.winnerChecker(3);
        if (Gameboard.gameBoardObj.gameBoardX.length === 4 ||
            Gameboard.gameBoardObj.gameBoardO.length === 4)
            strike = Gameboard.winnerChecker(4);
        if (Gameboard.gameBoardObj.gameBoardX.length === 5)
            strike = Gameboard.winnerChecker(5);

        //  if X wins 
        if (strike === 'x') {
            xCounter++;
            scoreBoard.innerText =
                `Score
            ${Gameboard.p1} : ${xCounter}
            ${Gameboard.p2} : ${oCounter}
            Tie : ${tieCounter}`;
        }
        //  if O wins
        if (strike === 'o') {
            oCounter++;
            scoreBoard.innerText =
                `Score
            ${Gameboard.p1} : ${xCounter}
            ${Gameboard.p2} : ${oCounter}
            Tie : ${tieCounter}`;
        }
        //  if tie
        if (strike === 'tie') {
            tieCounter++;
            scoreBoard.innerText =
                `Score
            ${Gameboard.p1} : ${xCounter}
            ${Gameboard.p2} : ${oCounter}
            Tie : ${tieCounter}`;
        }
    };

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

const Render = function (box, PlayerChoice) {
    //  prevents redundancy in array
    if (!(Gameboard.gameBoardObj.gameBoardX.includes(PlayerChoice))) {
        if (xTurn && box.innerText === '') {
            Gameboard.gameBoardObj.gameBoardX.push(PlayerChoice);
            box.innerText = 'X';
            xTurn = false;
        }
        if (!xTurn && box.innerText === '') {
            Gameboard.gameBoardObj.gameBoardO.push(PlayerChoice);
            box.innerText = 'O';
            xTurn = true;
        }
    }
};

const AiBattle = function (p1, p2) {
    console.log(p1, p2);
};


