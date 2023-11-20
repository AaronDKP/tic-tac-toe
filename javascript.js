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

        return {charSelection}
    })();

    const player2 = (function() {
        const charSelection = 'o';

        return {charSelection}
    })();

    return {player1, player2};
})();

// console.log(players)


const game = (function () {
    const cells = gameboard.gameCells;

    function playRound() {

        const p1Selected = [];
        const p2Selected = [];
        const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

            for(let i = 0; i < 5; i++){

                function findCommonElements(arr1, arr2) {
                    return arr1.every(item => arr2.includes(item));
                }

                let p1input = prompt('PLAYER *1* PICK NUMBER BETWEEN 0-8');
        
                for (cell of cells) {
                    if (p1input == cell && p1Selected.includes(cell)) {
                        p1input = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (p1input == cell && p2Selected.includes(cell)) {
                        p1input = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (p1input == cell && !p1Selected.includes(cell)) {
                        p1Selected.push(cell);
                        console.log(p1Selected);
                    }
                }

                for (combo of winCombo) {
                    if(findCommonElements(combo, p1Selected)) {
                        alert('Player 1 Wins!')
                        return;
                    }
                }

                let p2input = prompt('PLAYER *2* PICK NUMBER BETWEEN 0-8');

                for (cell of cells) {
                    if (p2input == cell && p1Selected.includes(cell)) {
                        p2input = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (p2input == cell && p2Selected.includes(cell)) {
                        p2input = prompt(`${cell} already selected, try again between 0-8`);
                    } else if (p2input == cell && !p2Selected.includes(cell)) {
                        p2Selected.push(cell);
                        console.log(p2Selected);
                    }
                }

                for (combo of winCombo) {
                    if(findCommonElements(combo, p2Selected)) {
                        alert('Player 2 Wins!')
                        return;
                    }
                }

                const totalSelected = p1Selected.concat(p2Selected);

                if (totalSelected.includes(0, 1, 2, 3, 4, 5, 6, 7, 8)) {
                    alert(`It's a Tie!`);
                }

            }

    }

    playRound();

})();