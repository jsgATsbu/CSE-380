var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.SelectLevel = function(){};

TheLegendOfMeta.SelectLevel.prototype = {
    create: function (){
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height, 'selectLevelBG');

        var lvl1 = this.game.add.button(this.game.width*2/10,this.game.height*2/10,'Level-1');
        var lvl2 = this.game.add.button(this.game.width*5/10,this.game.height*2/10,'Level-2');
        var lvl3 = this.game.add.button(this.game.width*8/10,this.game.height*2/10,'Level-3');
        var lvl4 = this.game.add.button(this.game.width*2/10,this.game.height*11/20,'Level-4');
        var lvl5 = this.game.add.button(this.game.width*5/10,this.game.height*11/20,'Level-5');
        var lvl6 = this.game.add.button(this.game.width*8/10,this.game.height*11/20,'Level-6');

        lvl1.anchor.setTo(0.5);
        lvl2.anchor.setTo(0.5);
        lvl3.anchor.setTo(0.5);
        lvl4.anchor.setTo(0.5);
        lvl5.anchor.setTo(0.5);
        lvl6.anchor.setTo(0.5);

        lvl1.onInputDown.add(function() {
            this.state.start('Level1')
        }, this);

        var returnBtn = this.game.add.button(this.game.width/2,this.game.height*5/6,'returnBtn');
        returnBtn.anchor.setTo(0.5);

        returnBtn.onInputDown.add(function () {
            this.state.start('MainMenu');
        },this);
    }
};