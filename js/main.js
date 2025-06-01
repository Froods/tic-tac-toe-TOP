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
    let winner = 0;

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
        let row = board.gameboard[y];
        let cell = row[x];
        
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
        const checkTie = tie();

        if (validRow || validCol || validDiag) {
            if (validRow === "X") {
                console.log("Player 1 wins!");
                winner = 1;
            } else if (validRow === "O") {
                console.log("Player 2 wins!");
                winner = 2;
            }

            if (validCol === "X") {
                console.log("Player 1 wins!");
                winner = 1;
            } else if (validCol === "O") {
                console.log("Player 2 wins!");
                winner = 2;
            }

            if (validDiag === "X") {
                console.log("Player 1 wins!");
                winner = 1;
            } else if (validDiag === "O") {
                console.log("Player 2 wins!");
                winner = 2;
            }
            
        } else {
            if (checkTie) {
                console.log("Tie!")
                winner = 3;
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

    function tie() {
        let counter = 0;
        const arr = board.gameboard;

        for (let i = 0; i < arr.length; i++) {
            
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j].getValue() !== "blank") {
                    ++counter;
                }
            }

        }

        if (counter === 9) {
            return true;
        } else {
            return false;
        }
    }

    function getWinner() {
        return winner;
    }

    function curPlayer() {
        return currentPlayer;
    }

    // Draw the board
    drawBoard();

    return { pickCell, curPlayer, getWinner }

}

function DisplayGame() {

    let p1Name = "Player 1";
    let p2Name = "Player 2";

    const board = Gameboard();
    let controller = GameController();

    let elBoard = document.querySelector(".gameboard");
    const elPage = document.querySelector(".page");
    const elSubmit = document.querySelector(".submit");
    const elAgain = document.querySelector(".again")

    elSubmit.addEventListener("click", () => {
        const elPlayer1Name = document.querySelector("#player-1");
        const elPlayer2Name = document.querySelector("#player-2");

        if (elPlayer1Name.value) {
            p1Name = elPlayer1Name.value;
        }

        if (elPlayer2Name.value) {
            p2Name = elPlayer2Name.value;
        }
    });

    elAgain.addEventListener("click", () => {
        reset();
    });
    
    function display() {
        let counter = 0;

        for (let i = 0; i < board.gameboard.length; i++) {
            const row = board.gameboard[i];

            for (let j = 0; j < row.length; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", `cell-${j.toString()+i.toString()}`);
                cellSelectListen(cell);
                ++counter;
                elBoard.appendChild(cell);
            }
        }
    }

    function cellSelectListen(cell) {
        cell.addEventListener("click", () => {

            if (!cell.classList.contains("picked")) {

            let className = cell.className;
            let xy = className.slice(10);
            let x = xy[0];
            let y = xy[1];

            fillCell(cell);
            controller.pickCell(x,y);
            
            displayWin();
            }

        });
    }

    function fillCell(cell) {

        if (controller.curPlayer() === 1) {
            cell.classList.add("X", "picked");
            const x = document.createElement("img");
            x.setAttribute("src", "images/X.svg");
            x.setAttribute("height", "180");
            cell.appendChild(x);
        }

        if (controller.curPlayer() === 2) {
            cell.classList.add("O", "picked");
            const o = document.createElement("img");
            o.setAttribute("src", "images/O.svg");
            o.setAttribute("height", "135");
            cell.appendChild(o);
        }

    }

    function displayWin() {
            if (controller.getWinner() === 1) {
                const winnerText = document.querySelector(".winner");
                winnerText.textContent = `${p1Name} wins!`;
            }

            if (controller.getWinner() === 2) {
                const winnerText = document.querySelector(".winner");
                winnerText.textContent = `${p2Name} wins!`;
            }

            if (controller.getWinner() === 3) {
                const winnerText = document.querySelector(".winner");
                winnerText.textContent = "Tie!";
            }

        }

        function reset() {
            elPage.removeChild(elBoard);
            elBoard = document.createElement("div")
            elBoard.classList.add("gameboard");
            
            const elWinnerText= document.querySelector(".winner");
            elWinnerText.textContent = "";

            controller = undefined;
            controller = GameController();

            elPage.insertBefore(elBoard, elWinnerText);
            display();
        }

    return { display }
}

const board = GameController();

const visBoard = DisplayGame();
visBoard.display();