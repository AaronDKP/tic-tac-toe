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
        let p1Score = 0;
        let p2Score = 0;

            for(let i = 0; i < 5; i++){

                function findCommonElements(arr1, arr2) {
                    return arr1.every(item => arr2.includes(item));
                }

                const p1input = prompt('PLAYER *1* PICK NUMBER BETWEEN 0-8');
        
                for (cell of cells) {
                    if (p1input == cell) {
                        p1Selected.push(cell);
                    }
                }

                for (combo of winCombo) {
                    if(findCommonElements(combo, p1Selected)) {
                        p1Score++;
                        console.log(`p1 score = ${p1Score}`);
                        return;
                    }
                }

                const p2input = prompt('PLAYER *2* PICK NUMBER BETWEEN 0-8');

                for (cell of cells) {
                    if (p2input == cell) {
                        p2Selected.push(cell);
                    }
                }

                for (combo of winCombo) {
                    if(findCommonElements(combo, p2Selected)) {
                        p2Score++;
                        console.log(`p2 score = ${p2Score}`);
                        return;
                    }
                }
            }

    }

    playRound();

})();