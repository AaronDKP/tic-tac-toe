const gameboard = (function() {
    const gameCells = [];

    for(let i = 0; i < 9; i++){
        gameCells.push(i)
    }

    return {gameCells};

})();


const players = (function() {
    const player1 = (function() {
        const charSelection = 'X';
        const name = 'Player 1';

        return {charSelection, name};
    })();

    const player2 = (function() {
        const charSelection = 'O';
        const name = 'Player 2';

        return {charSelection, name}
    })();

    return {player1, player2};
})();


const game = (function () {
    const cells = gameboard.gameCells;
    const btns = document.querySelectorAll('.cell');

    const startScreen = document.querySelector('#startScreen');
    const startButton = document.querySelector('#startButton');
    const gameContainer = document.querySelector('#gameContainer');
    const resultsScreen = document.querySelector('#resultsScreen');
    const resultsMsg = document.querySelector('#resultsMsg');
    const retryButton = document.querySelector('#retryBtn');

    let p1Selected = [];
    let p2Selected = [];

    function playRound() {
        const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        let player1 = players.player1;
        let player2 = players.player2;

        let currentPlayer = player1;
        let currentSelected = p1Selected;

        const findCommonElements = function(arr1, arr2) {
            return arr1.every(item => arr2.includes(item));
        }


            for (let btn of btns) {
                btn.addEventListener('click', (e) => {
                    let playerName = currentPlayer.name;
                    let charSelection = currentPlayer.charSelection;
                    let cellId = e.target.id;

                    const changeTurn = function () {
                        if (btn.textContent == 'X' || btn.textContent == 'O'){
                            if (currentPlayer === player1){
                                currentPlayer = player2;
                            } else {
                                currentPlayer = player1;
                            }
                        }
                    }


                    if (currentPlayer === player1) {
                        currentSelected = p1Selected;
                    } else if (currentPlayer === player2) {
                        currentSelected = p2Selected;
                    }


                    for (let cell of cells) {
                        if (cellId == cell && p1Selected.includes(cell)) {
                            // alert(`${cell} already selected, try again between 0-8`);
                        } else if (cellId == cell && p2Selected.includes(cell)) {
                            // alert(`${cell} already selected, try again between 0-8`);
                        } else if (cellId == cell && !currentSelected.includes(cell)) {
                            let selectedCell = document.getElementById(`${cellId}`);
                            selectedCell.classList.add('selected');

                            btn.textContent = charSelection;
                            currentSelected.push(cell);
                            changeTurn();
                        }
                    }
            

                    for (combo of winCombo) {
                        if(findCommonElements(combo, currentSelected)) {
                            for(int of combo){
                                let winBtn = document.getElementById(`${int}`);

                                winBtn.classList.add('win');
                            }

                            setTimeout(function(){
                                resultsScreen.style.display = 'flex';
                                gameContainer.style.display = 'none';
    
                                resultsMsg.textContent = `${playerName} Wins!`;

                                currentPlayer = player1;
                            }, 1800);

                            return;
                        }
                    }


                    const totalSelected = p1Selected.concat(p2Selected);

                    const incAll = (array, data) => data.every(v => array.includes(v));
                    const allTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            
                    if (incAll(totalSelected, allTiles)){
                        for(btn of btns){
                            btn.classList.add('loss');
                        }

                        setTimeout(function(){
                            resultsScreen.style.display = 'flex';
                            gameContainer.style.display = 'none';

                            resultsMsg.textContent = `It's a Tie!`;

                            currentPlayer = player1;
                        }, 1800);
                    }
                })
            }
    }

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
        playRound();
    });

    retryButton.addEventListener('click', () => {
        resultsScreen.style.display = 'none';
        gameContainer.style.display = 'flex';

        for(btn of btns) {
            btn.textContent = '';
            btn.classList.remove('win');
            btn.classList.remove('loss');
            btn.classList.remove('selected');
        }

        p1Selected = [];
        p2Selected = [];
    })

})();