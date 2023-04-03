let isWhite = true;
var tiles = [];
var allPieces = [];

var positions = [30, 110, 190, 270, 350, 430, 510, 590];

var flippedBoard = false;

function makeTiles() {

    // columns
    for (var i = 0; i < 8; i++) {

        // rows
        for (var j = 0; j < 8; j++) {

            let tile = new Tile(positions[j], positions[i], isWhite);

            if (isWhite) {
                tile.drawWhiteTile();
            } else {
                tile.drawBlackTile();
            }

            tiles.push(tile);

            isWhite = !isWhite;

        }

        // flipping the pattern of white and black to create diagonal black and white squares (a proper chess board)
        isWhite = !isWhite;

    }

}

function makeLettersAndNums() {

    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let nums = [8, 7, 6, 5, 4, 3, 2, 1];

    const numbersX = 15;
    const lettersY = 685;

    if (!flippedBoard) {
        // displaying the numbers
        for (var i = 0; i < 8; i++) {
            c.fillStyle = "black";
            c.fillText(nums[i], numbersX, positions[i] + 40);
        }

        // displaying the letters
        for (var i = 0; i < 8; i++) {
            c.fillStyle = "black";
            c.fillText(letters[i], positions[i] + 40, lettersY);
        }
    } else {
        // displaying the numbers
        for (var i = 7; i >= 0; i-=1) {
            c.fillStyle = "black";
            c.fillText(i+1, numbersX, positions[i] + 40);
        }

        // displaying the letters
        for (var i = 7; i >= 0; i-=1) {
            c.fillStyle = "black";
            c.fillText(letters[i], positions[7-i] + 40, lettersY);
        }
    }


}

function initPieces() {

    /* White pieces */

    // king
    var whiteKing = new Piece(true, "king", 61, './Assets/chessPieces/whiteKing.png');
    whiteKing.drawPiece();
    tiles[60].pieceOccupied = 0;
    allPieces.push(whiteKing);

    // queen
    var whiteQueen = new Piece(true, "queen", 60, './Assets/chessPieces/whiteQueen.png');
    whiteQueen.drawPiece();
    tiles[59].pieceOccupied = 1;
    allPieces.push(whiteQueen);

    // bishops
    var whiteBishop1 = new Piece(true, "bishop", 59, './Assets/chessPieces/whiteBishop.png');
    whiteBishop1.drawPiece();
    tiles[58].pieceOccupied = 2;
    allPieces.push(whiteBishop1);


    var whiteBishop2 = new Piece(true, "bishop", 62, './Assets/chessPieces/whiteBishop.png');
    whiteBishop2.drawPiece();
    tiles[61].pieceOccupied = 3;
    allPieces.push(whiteBishop2);

    // knights
    var whiteKnight1 = new Piece(true, "knight", 58, './Assets/chessPieces/whiteKnight.png');
    whiteKnight1.drawPiece();
    tiles[57].pieceOccupied = 4;
    allPieces.push(whiteKnight1);

    var whiteKnight2 = new Piece(true, "knight", 63, './Assets/chessPieces/whiteKnight.png');
    whiteKnight2.drawPiece();
    tiles[62].pieceOccupied = 5;
    allPieces.push(whiteKnight2);

    // rooks
    var whiteRook1 = new Piece(true, "rook", 57, './Assets/chessPieces/whiteRook.png');
    whiteRook1.drawPiece();
    tiles[56].pieceOccupied = 6;
    allPieces.push(whiteRook1);

    var whiteRook2 = new Piece(true, "rook", 64, './Assets/chessPieces/whiteRook.png');
    whiteRook2.drawPiece();
    tiles[63].pieceOccupied = 7;
    allPieces.push(whiteRook2);

    var whitePawns = [];

    // pawns
    for (var i = 0; i < 8; i++) {
        let pawn = new Piece(true, "pawn", 49 + i, './Assets/chessPieces/whitePawn.png');
        pawn.drawPiece();
        tiles[i + 48].pieceOccupied = i + 8;
        allPieces.push(pawn);

        whitePawns.push(pawn);
    }



    /* Black pieces */

    // king
    var blackKing = new Piece(false, "king", 5, './Assets/chessPieces/blackKing.png');
    blackKing.drawPiece();
    tiles[4].pieceOccupied = 16;
    allPieces.push(blackKing);

    // queen
    var blackQueen = new Piece(false, "queen", 4, './Assets/chessPieces/blackQueen.png');
    blackQueen.drawPiece();
    tiles[3].pieceOccupied = 17;
    allPieces.push(blackQueen);

    // bishops
    var blackBishop1 = new Piece(false, "bishop", 3, './Assets/chessPieces/blackBishop.png');
    blackBishop1.drawPiece();
    tiles[2].pieceOccupied = 18;
    allPieces.push(blackBishop1);

    var blackBishop2 = new Piece(false, "bishop", 6, './Assets/chessPieces/blackBishop.png');
    blackBishop2.drawPiece();
    tiles[5].pieceOccupied = 19;
    allPieces.push(blackBishop2);

    // knights
    var blackKnight1 = new Piece(false, "knight", 2, './Assets/chessPieces/blackKnight.png');
    blackKnight1.drawPiece();
    tiles[1].pieceOccupied = 20;
    allPieces.push(blackKnight1);

    var blackKnight2 = new Piece(false, "knight", 7, './Assets/chessPieces/blackKnight.png');
    blackKnight2.drawPiece();
    tiles[6].pieceOccupied = 21;
    allPieces.push(blackKnight2);

    // rooks
    var blackRook1 = new Piece(false, "rook", 1, './Assets/chessPieces/blackRook.png');
    blackRook1.drawPiece();
    tiles[0].pieceOccupied = 22;
    allPieces.push(blackRook1);

    var blackRook2 = new Piece(false, "rook", 8, './Assets/chessPieces/blackRook.png');
    blackRook2.drawPiece();
    tiles[7].pieceOccupied = 23;
    allPieces.push(blackRook2);

    var blackPawns = [];

    // pawns
    for (var i = 0; i < 8; i++) {

        let pawn = new Piece(false, "pawn", 9 + i, './Assets/chessPieces/blackPawn.png');
        pawn.drawPiece();
        tiles[8 + i].pieceOccupied = i + 24;
        allPieces.push(pawn);

        blackPawns.push(pawn);
    }

}

function flipBoard() {
    const yOffset = 30;


    c.clearRect(0, 0, canvas.width, canvas.height);

    flippedBoard = !flippedBoard;

    // iterate through all the tiles
    for (var i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        // get the y pos of tile (unit)
        let tileYPos = (tile.y - yOffset) / 80;
        let tileXPos = (tile.x - yOffset) / 80;

        // a variable that determines whether the tile is in the upper half or the lower half of the board
        let inUpHalf = false;

        if (tileYPos <= 4) { // in upper half
            inUpHalf = true;
        } else if (tileYPos > 4) { // in lower half
            inUpHalf = false
        }

        // determine the new flipped y position for the tile
        let flippedTileYPos;
        flippedTileYPos = 8 - tileYPos;

        let flippedTileXPos = 8 - tileXPos;

        tiles[i].y = flippedTileYPos * 80 - 50;
        tiles[i].x = flippedTileXPos * 80 - 50;

        c.clearRect(tiles[i].x, tiles[i].y, tiles[i].width, tiles[i].height);

        // redraw the flipped tile
        if (tile.isWhite) {
            tiles[i].drawWhiteTile();
        } else {
            tiles[i].drawBlackTile();
        }

        // redraw the pieces
        if (allPieces[tiles[i].pieceOccupied] != undefined) {
            allPieces[tiles[i].pieceOccupied].y = tiles[i].y;
            allPieces[tiles[i].pieceOccupied].drawPiece();
        }


    }

    makeLettersAndNums();
}

function displayNames() {
    document.getElementById("whiteName").innerText = "White: " + localStorage.getItem("WhitePlayer");
    document.getElementById("blackName").innerText = "Black: " + localStorage.getItem("BlackPlayer");
}

makeTiles();
makeLettersAndNums();
initPieces();
displayNames();

// var interval = setInterval(()=>{
//     flipBoard();
//     clearInterval(interval);
// }, 500);
