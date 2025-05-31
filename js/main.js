// Factory func for gameboard
function Gameboard() {
    // Define rows and fill their columns with cells
    let row0 = [Cell(), Cell(), Cell()];
    let row1 = [Cell(), Cell(), Cell()];
    let row2 = [Cell(), Cell(), Cell()];

    // Put rows inside gameboard
    const gameboard = [row0, row1, row2];

    return { gameboard };

}

// Factory func for cell
function Cell() {
    let value = "blank";

    function getValue() {return  value};
    function changeValue(nValue) {value = nValue};

    return { getValue, changeValue };
}

// Factory func for game controller
function GameController() {

    let currentPlayer = 1;
    let board = Gameboard();

    // Change the player
    function changePlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // Draw the board for the game
    function drawBoard() {

        let visualBoard = "";

        // Iterate through rows in the gameboard array
        for (let i = 0; i < board.gameboard.length; i++) {

            let curRow = board.gameboard[i];

            // Iterate through cells in each row and fill cell with value
            for (let j = 0; j < curRow.length; j++) {
                if (curRow[j].getValue() === "X") {
                    visualBoard += "[X] ";
                } else if (curRow[j].getValue() === "O") {
                    visualBoard += "[O] ";
                } else {
                    visualBoard += "[ ] ";
                }
            }

            visualBoard += "\n\n";
        }

        // Display the board
        console.log(visualBoard);
    }

    // Pick let the player pick a cell based on coordinates
    function pickCell(x, y) {
        let row = board.gameboard[y-1];
        let cell = row[x-1];
        
        if (cell.getValue() === "blank") {

            cell.changeValue(currentPlayer === 1 ? "X" : "O");
            changePlayer();
            drawBoard();
            lookForWin();   

        } else {

            console.log("Cell already filled, try another.")

        }
        
    }

    // Look for winning pattern and display winner
    function lookForWin() {
        const validRow = validRowCombo();
        const validCol = validColumnCombo();
        const validDiag = validDiagonalCombo();

        if (validRow || validCol || validDiag) {
            if (validRow === "X") {
                console.log("Player 1 wins!");
            } else if (validRow === "O") {
                console.log("Player 2 wins!");
            }

            if (validCol === "X") {
                console.log("Player 1 wins!");
            } else if (validCol === "O") {
                console.log("Player 2 wins!");
            }

            if (validDiag === "X") {
                console.log("Player 1 wins!");
            } else if (validDiag === "O") {
                console.log("Player 2 wins!");
            }
            
        }
    }

    // Evaluate pattern for each row and determine if there is a winner. If so, return winner
    function validRowCombo() {

        for (let i = 0; i < board.gameboard.length; i++) {
            const row = board.gameboard[i];
            let counterX = 0;
            let counterO = 0;

            for (let j = 0; j < row.length; j++) {
                const col = row[j];
                if (col.getValue() === "X") {
                    ++counterX;
                } else if (col.getValue() === "O") {
                    ++counterO
                }
            }

            if (counterX === 3 || counterO === 3) {
                return row[0].getValue();
            }

        }

        return false;

    }

    // Evaluate pattern for each column and determine if there is a winner. If so, return winner
    function validColumnCombo() {

        for (let i = 0; i < board.gameboard[0].length; i++) {
            const col = board.gameboard[0][i];
            let counterX = 0;
            let counterO = 0;

            for (let j = 0; j < board.gameboard[0].length; j++) {
                const cell = board.gameboard[j][i]
                if (cell.getValue() === "X") {
                    ++counterX;
                } else if (cell.getValue() === "O") {
                    ++counterO
                }
            }

            if (counterX === 3 || counterO === 3) {
                return col.getValue();
            }

        }

        return false;
        
    }

    // Evaluate pattern for diagonals and determine if there is a winner. If so, return winner
    function validDiagonalCombo() {

        const xy = board.gameboard;

        let returnValue = false;

        function diagOne(val) {
            if (xy[0][0].getValue() === val && xy[1][1].getValue() === val && xy[2][2].getValue() === val) {
                return val;
            } else {
                return false;
            }
        }

        function diagTwo(val) {
            if (xy[2][0].getValue() === val && xy[1][1].getValue() === val && xy[0][2].getValue() === val) {
                return val;
            } else {
                return false;
            }
        }

        returnValue = diagOne("X")
        if (returnValue == false) {
            returnValue = diagOne("O")
        }
        if (returnValue == false) {
            returnValue = diagTwo("X")
        }
        if (returnValue == false) {
            returnValue = diagTwo("O")
        }

        return returnValue;
        
    }

    // Draw the board
    drawBoard();

    return { pickCell }

}

const board = GameController();

