class Tile{
    constructor(x, y, isWhite){
        this.x = x;
        this.y = y;
        this.isWhite = isWhite;

        this.width = 80;
        this.height = 80;

        this.pieceOccupied;
    }

    drawWhiteTile(){
        c.fillStyle = "rgb(255, 209, 117)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.strokeRect(this.x,this.y,this.width,this.height);
    }

    drawBlackTile(){
        c.fillStyle = "rgb(105, 105, 105)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.strokeRect(this.x,this.y,this.width,this.height);
    }

    highlightTile(){
        c.clearRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "rgb(3, 252, 252)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.strokeRect(this.x,this.y,this.width,this.height);
    }

    unhighlightTile(){
        c.clearRect(this.x, this.y, this.width, this.height);

        if (this.isWhite){
            c.fillStyle = "rgb(255, 209, 117)";
        } else {
            c.fillStyle = "rgb(105, 105, 105)";
        }
        c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "black";
        c.strokeRect(this.x,this.y,this.width,this.height);
    }

} 