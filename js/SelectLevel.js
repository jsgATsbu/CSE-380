var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.SelectLevel = function(){};

TheLegendOfMeta.SelectLevel.prototype = {
    create: function (){
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height, 'selectLevelBG');

        var returnBtn = this.game.add.button(this.game.width/2,this.game.height*5/6,'returnBtn');
        returnBtn.anchor.setTo(0.5);

        returnBtn.onInputDown.add(function () {
            this.state.start('MainMenu');
        },this);
    }
};