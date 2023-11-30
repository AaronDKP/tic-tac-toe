const gameboard = (function() {
    const gameCells = [];

    for(let i = 0; i < 9; i++){
        gameCells.push(i)
    }

    return {gameCells};

})();

console.table(gameboard);


const players = (function() {
    const player1 = (function() {
        const charSelection = 'x';

        let p1input = function () {
            const cells = document.querySelectorAll('.cell');

            for (let cell of cells) {
                cell.addEventListener('click', (e) => {
                    cell.textContent = charSelection;

                    let cellId = e.target.id;

                    if (cellId !== ''){
                        console.log(`p1input = ${cellId}`);
                        return cellId;
                    }
                    
                })
            }
        }

        return {charSelection};
    })();

    const player2 = (function() {
        const charSelection = 'o';

        return {charSelection}
    })();

    return {player1, player2};
})();



const game = (function () {
    const cells = gameboard.gameCells;

    function playRound() {

        const p1Selected = [];
        const p2Selected = [];
        const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        const findCommonElements = function(arr1, arr2) {
            return arr1.every(item => arr2.includes(item));
        }


        let p1CharSelection = players.player1.charSelection;

        const btns = document.querySelectorAll('.cell');

        for (let btn of btns) {
            btn.addEventListener('click', (e) => {
                btn.textContent = p1CharSelection;

                let cellId = e.target.id;

                if (cellId !== ''){
                    console.log(`p1input = ${cellId}`);
                }

                for (let cell of cells) {
                    if (cellId == cell && p1Selected.includes(cell)) {
                        cellId = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (cellId == cell && p2Selected.includes(cell)) {
                        cellId = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (cellId == cell && !p1Selected.includes(cell)) {
                        p1Selected.push(cell);
                        console.log(p1Selected);
                    }
                }
        
                for (combo of winCombo) {
                    if(findCommonElements(combo, p1Selected)) {
                        console.log('Player 1 Wins!')
                        return;
                    }
                }
                
            })
        };


        // let p2input = prompt('PLAYER *2* PICK NUMBER BETWEEN 0-8');

        // for (let cell of cells) {
        //     if (p2input == cell && p1Selected.includes(cell)) {
        //         p2input = prompt(`${cell} already selected, try again between 0-8`);
        //     } else if (p2input == cell && p2Selected.includes(cell)) {
        //         p2input = prompt(`${cell} already selected, try again between 0-8`);
        //     } else if (p2input == cell && !p2Selected.includes(cell)) {
        //         p2Selected.push(cell);
        //         console.log(p2Selected);
        //     }
        // }

        // for (combo of winCombo) {
        //     if(findCommonElements(combo, p2Selected)) {
        //         console.log('Player 2 Wins!')
        //         return;
        //     }
        // }

        // const totalSelected = p1Selected.concat(p2Selected);


        //                  //test with GUI to ensure TIE is shown when all choices exhausted

        // const incAll = (array, data) => data.every(v => array.includes(v));
        // const allTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        // if (incAll(totalSelected, allTiles)){
        //     console.log(`It's a Tie!`);
        // }

    }

    playRound();

})();