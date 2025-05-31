// Factory func for gameboard
function Gameboard() {
    // Define rows and fill their columns with cells
    let row0, row1, row2;
    row0 = row1 = row2 = [Cell(), Cell(), Cell()];

    // Put rows inside gameboard
    const gameboard = [
        row0,
        row1,
        row2
    ];

    return { gameboard };

}

// Factory func for cell
function Cell() {
    let value = "blank"

    function getValue() {return  value;}
    function changeValue(nValue) {value = nValue}

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
    function pickCell(cell) {
        if (cell.value === "blank") {
            cell.value = currentPlayer === 1 ? "X" : "O";
            changePlayer();
        } else {
            console.log("Cell already filled, try another.")
        }
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

    return { drawBoard }

}

const board = GameController();
board.drawBoard();

