var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.MainMenu = function(){};

TheLegendOfMeta.MainMenu.prototype = {
    create: function(){

        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'logo');

        var text = "Tap to begin";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);

    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        }
    }
};