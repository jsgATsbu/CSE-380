var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Setting = function(){};

TheLegendOfMeta.Setting.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height, 'settingBG');

        var settingBG = this.game.add.image(this.game.width/2,this.game.height*9/24,'Control');
        settingBG.scale.setTo(0.7);
        settingBG.anchor.setTo(0.5);

        var returnBtn = this.game.add.button(this.game.width/2,this.game.height*5/6,'returnBtn');
        returnBtn.anchor.setTo(0.5);

        returnBtn.onInputDown.add(function () {
            this.state.start('MainMenu');
        },this);
    }
};