var gui = {
    labelWidth: 200,
    labelHeight: 32,
    nextPieceMargin: 16,
    fontSize: 25,
    labelBlueColor: "#9ACED2",

    drawLabel: function(ctx, text, x, y) {
        ctx.font = "25px Orbitron"
        ctx.textBaseline = "top";
        ctx.save();
        ctx.fillStyle = this.labelBlueColor;
        ctx.fillRect(x, y, this.labelWidth, this.labelHeight);
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, this.labelWidth, this.labelHeight);
        ctx.fillStyle = "black";
        ctx.fillText(text, x+16, y);
        ctx.restore();
    },

    nextTetromino: function(ctx, blockImages, shape, x, y) {
        ctx.save();
        ctx.fillStyle = this.labelBlueColor;
        ctx.fillRect(x - this.nextPieceMargin, y - this.nextPieceMargin, this.labelWidth, this.labelHeight*5);
        ctx.lineWidth = 4;
        ctx.strokeRect(x - this.nextPieceMargin, y - this.nextPieceMargin, this.labelWidth, this.labelHeight*5);
        ctx.restore();
        for(var row = 0; row < shape.length; row++) {
            for(var col = 0; col < shape[row].length; col++) {
                var block = shape[row][col],
                    imageSize = blockImages[block].width;
                if(block != 0) {
                    ctx.drawImage(blockImages[block], x + (imageSize*col), y + (imageSize*row));
                }
           }
        }
    }

};