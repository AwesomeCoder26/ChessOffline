class Piece{

    constructor(isWhite, name, tilePos, imgURL){
        this.isWhite = isWhite;
        this.name = name;

        this.imgURL = imgURL;

        this.tilePos = tilePos;

    }

    drawPiece(){
        // creating the image
        let pieceImage = new Image();
        pieceImage.src = this.imgURL;

        // place the piece in the right tile
        let xPos = tiles[this.tilePos-1].x;
        let yPos = tiles[this.tilePos-1].y;


        // display the image 
        pieceImage.onload = ()=>{
            c.drawImage(pieceImage, xPos, yPos, 80, 80);
        }            

    }

}