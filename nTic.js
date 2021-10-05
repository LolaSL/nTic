
//A Tic Tac Toe game in HTML/JavaScript/CSS

const WIN = new Audio();// win game music effect
WIN.src = "win.mp3";
const DRAW_GAME = new Audio();//draw game music effect
DRAW_GAME.src = "draw.mp3";
const OPS_GAME = new Audio();// //if cell is occupied music effect
OPS_GAME.src = "ops.mp3";
const N_GRID_SIZE = 3;//global variable which is equal to grid size of the game board
var emptyCell = "";//global variable is assign empty string array
var spaces = []; //global variable  which is equal to empty arrwy
var player = "X";//which is equal to game symbol "X"
var score = {
    "X": 0, //false
    "O": 0,//false
    "D": 0 //false
};//global variable which  includes object as parameter 
var moves;//global variable moves
var zoom = 1;//global variable zoom 
var zoomStep = 0.2;//global variable zoom step

//Initializes the Tic Tac Toe board and starts the game.

function initializeGame() {
    var board = document.createElement('table');//method creates an Element Node with the specified name.
    board.setAttribute("border", 1);//The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
    board.setAttribute("cellspacing", 0);//Sets the amount of space between the cells in a table
    var identifier = 0;//index of data cells
    for (var i = 0; i < N_GRID_SIZE; i++) {
        var row = document.createElement('tr');//Returns a collection of all rows - <tr> elements in a table
        board.appendChild(row);//method appends a row as the last child of a board
        for (var j = 0; j < N_GRID_SIZE; j++) {
            var cell = document.createElement('td');//Data cells - contains data (created with the <td> element)
            cell.classList.add('column' + j, 'row' + i);//to add to classList property of cell rows and columns
            if (i == j) {
                cell.classList.add('diagonal1');//to add diagonal1 position
            }
            if (j == N_GRID_SIZE - i - 1) {
                cell.classList.add('diagonal2');//to add diagonal2 position
            }
            cell.dataset.identifier = identifier;//provides read/write access to custom data attributes (data-*) on elements
            cell.addEventListener("click", gameResult);////Through cycle to add event "click" to each created cell , after click will be invoked function gameResult
            row.appendChild(cell);//method appends a cell as the last child of a row.
            spaces.push(cell);//method adds new cell to the end of an array "spaces", and returns the new length
            identifier++;
        }
    }
    document.getElementById("myGame").appendChild(board);//to add element
}

// To check game status if status - win or not
function isGameOver(clicked) {
    let memberOf = clicked.className.split(/\s+/);// splits the array at every kind of whitespace character between one and unlimmited times
    for (var i = 0; i < memberOf.length; i++) {
        let testClass = '.' + memberOf[i];//selector is used to access to properties and methods of an object array 
        let items = contains('#myGame ' + testClass, player);
        if (items.length == N_GRID_SIZE) {
            return true;
        }
    }
    return false;
}

//for getting a div with matching element by text content
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    const cellsContainingText = Array.from(elements).filter(
        element => element.textContent === text);
    return cellsContainingText;
}

// Sets clicked square and also updates the turn.
function gameResult() {
    if (this.innerHTML !== emptyCell) {
        OPS_GAME.play();
        alert("Cell is occupied");//if cell occupied by player allert "Cell is occupied" is appreared
        return;
    }
    this.innerHTML = player;
    moves += 1;

    if (isGameOver(this)) {
        score[player] += 1;//win condition for table statistics
        WIN.play();
        alert('Winner: Player ' + player);//alert "Win" if X or O won
        restartGame();
    } else if (moves === N_GRID_SIZE * N_GRID_SIZE) {
        score.D += 1;//draw condition for table statistics
        DRAW_GAME.play();
        alert("Draw Game!");//alert "raw Game" if X or O did not win
        restartGame();
    } else {
        player = player === "X" ? "O" : "X";// to turn Symbol after each move
        document.getElementById('turn').textContent = 'Current Player:  ' + player; //screen notification regarding current Player
    } updateStatus();
}

//Restart game
function restartGame() {
    moves = 0; //false
    player = "X";//symbol X starts the game Tic Tac toe
    spaces.forEach(function (square) {
        square.innerHTML = emptyCell;//empty string " "
    });

}

// to update game status intable "Statistics"
function updateStatus() {
    document.getElementById('sX').innerHTML = score.X;//win status for X player
    document.getElementById('sO').innerHTML = score.O;//win status for O player
    document.getElementById('sD').innerHTML = score.D;//daw dame status for X and O players
}

initializeGame();

//zoomIn 
document.getElementById("zoomIn").addEventListener("click", function zoomIn() {
    zoom += zoomStep;
    document.getElementById("zoomtext").style.transform = "scale(" + zoom + ")";
});
//zoomOut
document.getElementById("zoomOut").addEventListener("click", function zoomOut() {
    if (zoom > zoomStep) {
        zoom -= zoomStep;
        document.getElementById("zoomtext").style.transform = "scale(" + zoom + ")";
    }
});

