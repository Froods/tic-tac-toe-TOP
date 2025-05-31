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
        console.log(currentPlayer);
    }

    // Pick the value for a cell
    //function fillCell(cell) {
    //   if (cell.value === "blank") {
    //        cell.value = currentPlayer === 1 ? "X" : "O";
    //        changePlayer();
    //        drawBoard();
    //    } else {
    //        console.log("Cell already filled, try another.")
    //   }
    //}

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

    function pickCell(x, y) {
        let row = board.gameboard[y-1];
        let cell = row[x-1];
        
        if (cell.getValue() === "blank") {

            cell.changeValue(currentPlayer === 1 ? "X" : "O");
            changePlayer();
            drawBoard();

        } else {

            console.log("Cell already filled, try another.")

        }
        
    }

    drawBoard();

    return { pickCell }

}

const board = GameController();

