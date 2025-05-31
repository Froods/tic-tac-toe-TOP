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

    function lookForWin() {
        const validRow = validRowCombo();

        if (validRow) {
            if (validRow === "X") {
                console.log("Player 1 wins!");
            } else {
                console.log("Player 2 wins!");
            }
            
        }
    }

    function validRowCombo() {

        for (let i = 0; i < board.gameboard.length; i++) {
            const row = board.gameboard[i];
            let counterX = 0;
            let counterO = 0;

            for (let j = 0; j < row.length; j++) {
                if (row[j].getValue() === "X") {
                    ++counterX;
                } else if (row[j].getValue() === "O") {
                    ++counterO
                }
            }

            if (counterX === 3 || counterO === 3) {
                return row[0].getValue();
            }

        }

        return false;
    }

    function validColumnCombo() {

    }

    function validDiagonalCombo() {

    }

    drawBoard();

    return { pickCell }

}

const board = GameController();

