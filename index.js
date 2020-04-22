'use strict';

//  player turn starting from player X
let xTurn = true;

let xCounter = 0,
    oCounter = 0,
    tieCounter = 0,
    round = 1;

//  top input field menu
const inputMenu = document.querySelector('.name-input');

//  div that hides the container
const hidden = document.getElementById('hidden');

//  bottom display
const bottomDisplay = document.getElementById('bottom');

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
    scoreBoard.innerText = 'Score';
    hidden.style.zIndex = 1;
    xTurn = true;
    bottomDisplay.innerText = '';
    xCounter = 0;
    oCounter = 0;
    tieCounter = 0;
    round = 1;
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
        bottomDisplay.innerText = `${p1Name} turn`;
        inputMenu.style.visibility = "hidden";
        hidden.style.zIndex = -1;
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

    const gameBoardAreas = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const gameBoardObj = {
        gameBoardX: [],
        gameBoardO: [],
    };

    //  player selection from select dropdown list
    let playerSelect1 = document.getElementById('player-select1');
    let playerSelect2 = document.getElementById('player-select2');
    let p1 = playerSelect1.options[playerSelect1.selectedIndex].text;
    let p2 = playerSelect2.options[playerSelect2.selectedIndex].text;

    const winnerChecker = function (len) {
        let strX = [],
            strO = [],
            x = 0;

        //  len is the length of array StrX or StrO
        //  will add an algorithm in the future 
        //  for now this messy amateur code will do 
        //  sorry 
        if (len === 3) {
            Gameboard.gameBoardObj.gameBoardO =
                Gameboard.gameBoardObj.gameBoardO.sort((a, b) => a - b);
            Gameboard.gameBoardObj.gameBoardX =
                Gameboard.gameBoardObj.gameBoardX.sort((a, b) => a - b);

            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2]);
            strO.push(Gameboard.gameBoardObj.gameBoardO[0] +
                Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[2]);
            x = 1;
        }

        if (len === 4) {
            Gameboard.gameBoardObj.gameBoardO =
                Gameboard.gameBoardObj.gameBoardO.sort((a, b) => a - b);
            Gameboard.gameBoardObj.gameBoardX =
                Gameboard.gameBoardObj.gameBoardX.sort((a, b) => a - b);

            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[3]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3]);

            strO.push(Gameboard.gameBoardObj.gameBoardO[0] +
                Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[2]);
            strO.push(Gameboard.gameBoardObj.gameBoardO[0] +
                Gameboard.gameBoardObj.gameBoardO[2] +
                Gameboard.gameBoardObj.gameBoardO[3]);
            strO.push(Gameboard.gameBoardObj.gameBoardO[0] +
                Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[3]);
            strO.push(Gameboard.gameBoardObj.gameBoardO[1] +
                Gameboard.gameBoardObj.gameBoardO[2] +
                Gameboard.gameBoardObj.gameBoardO[3]);
            x = 4;
        }

        if (len === 5) {
            Gameboard.gameBoardObj.gameBoardO =
                Gameboard.gameBoardObj.gameBoardO.sort((a, b) => a - b);
            Gameboard.gameBoardObj.gameBoardX =
                Gameboard.gameBoardObj.gameBoardX.sort((a, b) => a - b);

            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[3]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[1] +
                Gameboard.gameBoardObj.gameBoardX[3] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[3]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[2] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            strX.push(Gameboard.gameBoardObj.gameBoardX[0] +
                Gameboard.gameBoardObj.gameBoardX[3] +
                Gameboard.gameBoardObj.gameBoardX[4]);
            x = 5;
        }

        //  loop to check if an item in array  
        //  StrX matches any item in win pattern obj
        for (let j = 0; j < x; j++) {
            for (let i = 0; i <= 7; i++) {
                if (strX[j] === winPattern[i]) {
                    strX = [];
                    return 'x';
                }
                if (strO[j] === winPattern[i]) {
                    strO = [];
                    return 'o';
                }
            }
        }

        if (len === 5) return 'tie';
    };

    return {
        gameBoardObj,
        gameBoardAreas,
        p1,
        p2,
        winnerChecker,
    };
})();


const PlayerVsPlayer = function () {
    let strike;

    const p1Name = document.getElementById('player1').value;
    const p2Name = document.getElementById('player2').value;

    if (xTurn) bottomDisplay.innerText = `${p1Name} turn`;
    else bottomDisplay.innerText = `${p2Name} turn`;

    const nextRound = function () {
        round++;
        inputMenu.style.visibility = "initial";
        Gameboard.gameBoardObj.gameBoardX = [];
        Gameboard.gameBoardObj.gameBoardO = [];
        boxes.forEach((box) => {
            box.innerText = '';
        });
        scoreBoard.innerText =
            `Score
         Round : ${round}
        ${p1Name} : ${xCounter}
        ${p2Name} : ${oCounter}
        Tie : ${tieCounter}`;
        xTurn = true;
    }

    //  X vs O
    // if ((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Player O')) {

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
        alert(`Congrats! ${p1Name} wins`);
        nextRound();
    }
    //  if O wins
    if (strike === 'o') {
        oCounter++;
        alert(`Congrats! ${p2Name} wins`);
        nextRound();
    }
    //  if tie
    if (strike === 'tie') {
        tieCounter++;
        alert('Tie! Try better dumbos');
        nextRound();
    }
    // };

    //  AI vs AI
    if ((Gameboard.p1 === 'Beta AI' || Gameboard.p1 === 'Alpha AI') &&
        (Gameboard.p2 === 'Beta AI' || Gameboard.p2 === 'Alpha AI')) {
        AiBattle(Gameboard.p1, Gameboard.p2);
    }

    //  Player vs AI
    // if (((Gameboard.p1 === 'Player X') && (Gameboard.p2 === 'Beta AI'
    //     || Gameboard.p2 === 'Alpha AI')) || ((Gameboard.p1 === 'Beta AI'
    //         || Gameboard.p1 === 'Alpha AI') && (Gameboard.p2 === 'Player O'))) {

    //  if Player O is AI
    if (Gameboard.p2 === 'Beta AI') {
        betaAi();
    }
    // }

    //  Best of 3
    if (round > 3) {
        if (xCounter > oCounter)
            alert(`${p1Name} wins Best of 3`);
        else if (xCounter == oCounter == tieCounter)
            alert('TIE DUMBOS');
        else alert(`${p2Name} wins Best of 3`);
        hidden.style.zIndex = 1;
        homeBtn.click();
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

const betaAi = function () {
    if (!xTurn) {
        let i = 0;
        let value = Gameboard.gameBoardObj.gameBoardX[i];
        Gameboard.gameBoardAreas =
            Gameboard.gameBoardAreas.filter(item => item !== value);
        console.log(Gameboard.gameBoardAreas)
        //   random choice for Beta AI
        let betaAiChoice =
            Gameboard.gameBoardAreas[Math.floor(Math.random() *
                Gameboard.gameBoardAreas.length)];
        boxes.forEach(box => {
            if (box.dataset.number == betaAiChoice) {
                alert('hello')
                box.click();
            }
        });
        i++;
    }
};

const AiBattle = function (p1, p2) {
    console.log(p1, p2);
};


