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

    function playRound() {

        const p1Selected = [];
        const p2Selected = [];
        const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        let player1 = players.player1;
        let player2 = players.player2;

        let currentPlayer = player1;
        let currentSelected = p1Selected;

        const findCommonElements = function(arr1, arr2) {
            return arr1.every(item => arr2.includes(item));
        }

        const input = (function() {
            for (let btn of btns) {
                btn.addEventListener('click', (e) => {
                    let playerName = currentPlayer.name;
                    let charSelection = currentPlayer.charSelection;

                    btn.textContent = charSelection;

                    let cellId = e.target.id;

                    if (cellId !== ''){
                        console.log(`${playerName} input = ${cellId}`);
                    }


                    if (currentPlayer === player1) {
                        currentSelected = p1Selected;
                    } else if (currentPlayer === player2) {
                        currentSelected = p2Selected;
                    }


                    for (let cell of cells) {
                        if (cellId == cell && p1Selected.includes(cell)) {
                            alert(`${cell} already selected, try again between 0-8`);
                        } else if (cellId == cell && p2Selected.includes(cell)) {
                            alert(`${cell} already selected, try again between 0-8`);
                        } else if (cellId == cell && !currentSelected.includes(cell)) {
                            currentSelected.push(cell);
                            console.log(`  p1Selected = ${p1Selected}`);
                            console.log(`  p2Selected = ${p2Selected}`);
                        }
                    }
            

                    for (combo of winCombo) {
                        if(findCommonElements(combo, currentSelected)) {
                            console.log(`${playerName} Wins!`)
                            return;
                        }
                    }


                    if (btn.textContent == 'X' || btn.textContent == 'O'){
                        if (currentPlayer === player1){
                            currentPlayer = player2;
                        } else {
                            currentPlayer = player1;
                        }
                    }

                    const totalSelected = p1Selected.concat(p2Selected);

                    const incAll = (array, data) => data.every(v => array.includes(v));
                    const allTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            
                    if (incAll(totalSelected, allTiles)){
                        console.log(`It's a Tie!`);
                    }
                })
            }

        })();

    }

    playRound();

})();