var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.MainMenu = function(){};

TheLegendOfMeta.MainMenu.prototype = {
    create: function(){

        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'mainMenuBG');

        var style = { font: "30px Arial", fill: "#000", align: "center" };
        var start = this.game.add.text(this.game.width/6, this.game.height*4/5, "Start", style);
        var selectLevel = this.game.add.text(this.game.width*2/6, this.game.height*4/5, "Select Level", style);
        var settings = this.game.add.text(this.game.width*3/6, this.game.height*4/5, "Settings", style);
        var help = this.game.add.text(this.game.width*4/6, this.game.height*4/5, "Help", style);
        var exit = this.game.add.text(this.game.width*5/6, this.game.height*4/5, "Exit", style);
        start.anchor.set(0.5);
        selectLevel.anchor.set(0.5);
        settings.anchor.set(0.5);
        help.anchor.set(0.5);
        exit.anchor.set(0.5);
        
        this.game.input.mouse.onMouseDown = function(event){
            this.game.state.start('Game');
        }.bind(this);
    }
};