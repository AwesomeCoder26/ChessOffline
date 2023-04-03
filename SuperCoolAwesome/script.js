const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

var activeTile = 0; 
var tileIsActive = false;
var justMoved = false;
var movesAfterCaptured = 0;

var whiteCapturedPieces = [pawns = 0, bishops = 0, knights = 0, rooks = 0, queens = 0];
var blackCapturedPieces = whiteCapturedPieces;

var whiteCaptured = [];
var blackCaptured = [];

var pieceValues = [1, 3, 3, 5, 9];
var whiteTotalValueCaptured = 0;
var blackTotalValueCaptured = 0;

var pieceTypes = ["pawns", "bishops", "knights", "rooks", "queens"];

// setting hte canvas' properties
canvas.width = 700;
canvas.height = 700;
canvas.style.backgroundColor = "white";

//report the mouse position on click
canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    // alert(mousePos.x + ',' + mousePos.y);

    /* Determining which specific tile the user has clicked on */
    
    let clickedTilePos;

    let foundTileX = false;
    let tilePosX;
    let foundTileY = false;
    let tilePosY;

    // determining the tile on the x-axis
    for (var i = 0; i < 8 && !foundTileX; i++){

        if (flippedBoard){
            if (i < 7){

                // if found the right tile
                if (tiles[i].x >= mousePos.x && mousePos.x > tiles[i+1].x){
                    foundTileX = true;
                    tilePosX = i+2;
                }
    
            } else {
                // if on the last tile
                foundTileX = true;
                tilePosX = 1;
            }
        } else {
            if (i < 7){

                // if found the right tile
                if (tiles[i].x <= mousePos.x && mousePos.x < tiles[i+1].x){
                    foundTileX = true;
                    tilePosX = i+1;
                }
    
            } else {
                // if on the last tile
                foundTileX = true;
                tilePosX = i+1;
            }
        }
        
    }

   console.log("Tile on x axis: " + tilePosX);

    // determining the tile on the y-axis

    for (var i = 0; i < 8 && !foundTileY; i++){

        // console.log(i);

        if (!flippedBoard){
            if (i < 7){

                // if found the right tile
                if (tiles[i*8].y <= mousePos.y && mousePos.y < tiles[(i*8)+8].y){
                    
                    foundTileY = true;
                    tilePosY = i+1;
                }
    
            } else {
                // if on the last tile
                foundTileY = true;
                tilePosY = ((i*8)+8)/8;
            }
        } else {
            if (i < 7){

                // if found the right tile
                if (tiles[i*8].y >= mousePos.y && mousePos.y > tiles[(i*8)+8].y){
                    
                    foundTileY = true;
                    tilePosY = i+2;
                }
    
            } else {
                // if on the last tile
                foundTileY = true;
                tilePosY = 1;
            }
        }
        
    }


    console.log("Tile on y axis: " + tilePosY);

    clickedTilePos = (8*(tilePosY-1)) + tilePosX;

    console.log("You clicked on tile  " + clickedTilePos);

    // piece clicked on
    let clickedPiece = allPieces[tiles[clickedTilePos-1].pieceOccupied];


    // if there is a tile already active, then unhighlight it
    if (tileIsActive) {
        tiles[activeTile-1].unhighlightTile();

        // if just moved, and clicked on another piece, make sure the piece that just moved wont disappear
        if (allPieces[tiles[activeTile-1].pieceOccupied] != undefined && justMoved){
            let idlePiece = allPieces[tiles[activeTile-1].pieceOccupied];
            idlePiece.drawPiece();
        }


        // code to move piece
        if (allPieces[tiles[activeTile-1].pieceOccupied] != undefined && !justMoved && clickedPiece == undefined){

            // update the tile position of the piece
            let pieceToMove = allPieces[tiles[activeTile-1].pieceOccupied];
            pieceToMove.tilePos = clickedTilePos;

            // set the tile's pieceOccupied the piece has moved to to the piece number
            tiles[clickedTilePos-1].pieceOccupied = tiles[activeTile-1].pieceOccupied;

            // set the pieceOccupied of the previous tile the piece was in to undefined and draw it
            tiles[activeTile-1].pieceOccupied = undefined;
            pieceToMove.drawPiece();
            justMoved = true;

            let interval = setInterval(()=>{
                flipBoard();
                clearInterval(interval);
            }, 100)
            
        }
        

        /* if the user tries to move a piece to a tile where a piece is already occupied */
        if (allPieces[tiles[activeTile-1].pieceOccupied] != undefined && !justMoved && clickedPiece != undefined){

            let pieceToMove = allPieces[tiles[activeTile-1].pieceOccupied];

            // if the user tries to capture his own piece
            if (pieceToMove.isWhite == clickedPiece.isWhite){
                justMoved = false;
                tiles[activeTile-1].unhighlightTile();
                pieceToMove.drawPiece();
                tiles[clickedTilePos-1].highlightTile();
            } else { // if the user is trying to capture an opponent's piece

                let clickedTile = tiles[clickedTilePos-1];

                
                if (clickedTile.isWhite){
                    clickedTile.drawWhiteTile();
                } else {
                    clickedTile.drawBlackTile();
                }

                addPieceToCapturedPieces(clickedPiece);

                // add the piece to clicked tile
                clickedTile.pieceOccupied = tiles[activeTile-1].pieceOccupied;
                pieceToMove.tilePos = clickedTilePos;
                pieceToMove.drawPiece();

                tiles[activeTile-1].pieceOccupied = undefined;

                if (tiles[activeTile-1].isWhite){
                    tiles[activeTile-1].drawWhiteTile();
                } else {
                    tiles[activeTile-1].drawBlackTile();         
                }

                let interval = setInterval(()=>{
                    flipBoard();
                    clearInterval(interval);
                }, 200)

                clickedPiece = allPieces[tiles[clickedTilePos-1].pieceOccupied]

                justMoved = true;
                movesAfterCaptured += 1;

            }

        }

    } 

    // highlight tile
    tileIsActive = true;
    tiles[clickedTilePos-1].highlightTile();

    

    // if there is a piece on the tile, redraw it so it doesn't diappear
    if (clickedPiece != undefined){
        clickedPiece.drawPiece();

        if (movesAfterCaptured == 0){
            justMoved = false;
        }
        
        if (movesAfterCaptured == 1){
            movesAfterCaptured = 0;
            justMoved = true;
        }

    }

    activeTile = clickedTilePos;


}, false);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function addPieceToCapturedPieces(capturedPiece){
    let capturedPieceType = capturedPiece.name;
    let imgURL = capturedPiece.imgURL;

    // get the index of the type of piece in the following array
    let typeOfPieceNum = pieceTypes.indexOf(capturedPieceType + "s");

    let capturedDiv;
    if (capturedPiece.isWhite){
        capturedDiv = document.getElementById("whiteCapturedPieces");
        whiteCaptured.push(capturedPiece);

        displayPieces(whiteCaptured, capturedDiv);
        
        

    } else {
        capturedDiv = document.getElementById("blackCapturedPieces");
        blackCaptured.push(capturedPiece);

        displayPieces(blackCaptured, capturedDiv);
    }

    
}

function displayPieces(capturedPieces, div){

    div.innerHTML = ``;

    let capturedArr = capturedPieces;

    let pawnsArr = [];
    let bishopsArr = [];
    let knightsArr = [];
    let rooksArr = [];
    let queensArr = [];

    let organizedList = [];

    let capturedPieceIsWhite;
    let localTotalValue = 0;

    for (var i = 0; i < capturedArr.length; i++){
        if (capturedArr[i].name == "pawn"){
            pawnsArr.push(capturedArr[i]);
            addValue(capturedArr[i].isWhite, 1);
        } else if (capturedArr[i].name == "bishop"){
            bishopsArr.push(capturedArr[i]);
            addValue(capturedArr[i].isWhite, 3);
        } else if (capturedArr[i].name == "knight"){
            knightsArr.push(capturedArr[i]);
            addValue(capturedArr[i].isWhite, 3);
        } else if (capturedArr[i].name == "rook"){
            rooksArr.push(capturedArr[i]);
            addValue(capturedArr[i].isWhite, 5);
        } else if (capturedArr[i].name == "queen"){
            queensArr.push(capturedArr[i]);
            addValue(capturedArr[i].isWhite, 9);
        }
        capturedPieceIsWhite = capturedArr[i].isWhite;
    }

    organizedList.push(pawnsArr);
    organizedList.push(bishopsArr);
    organizedList.push(knightsArr);
    organizedList.push(rooksArr);
    organizedList.push(queensArr);


    // nested for loop to display all the chess pieces captured in organized form
    for (var i = 0; i < organizedList.length; i++){
        for (var j = 0; j < organizedList[i].length; j++){

            // add code to the html file
            let htmlCode = `
                <img src = "${organizedList[i][j].imgURL}" width = "50px" height = "50px">
            `
            div.innerHTML += htmlCode;
        }
    }

    let htmlCapturedNumber;

    if (capturedPieceIsWhite){
        whiteTotalValueCaptured = localTotalValue; 

        // if black has captured more pieces
        if (blackTotalValueCaptured > whiteTotalValueCaptured){
            htmlCapturedNumber = `
            <h3 id = "whiteCapturedValue">+${whiteTotalValueCaptured-blackTotalValueCaptured}</h3>
            `
            div.innerHTML += htmlCapturedNumber;

        }
        

    } else {
        blackTotalValueCaptured = localTotalValue;

        // if white has captured more pieces
        if (whiteTotalValueCaptured > blackTotalValueCaptured){
            htmlCapturedNumber = `
                <h3 id = "blackCapturedValue>+${blackTotalValueCaptured-whiteTotalValueCaptured}</h3>
            `
            div.innerHTML += htmlCapturedNumber;


        }
        
    }

    

    function addValue(isWhite, value){
        if (isWhite){
            localTotalValue += value;
        } else {
            localTotalValue += value;
        }
    }

}