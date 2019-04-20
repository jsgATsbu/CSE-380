var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.MainMenu = function(){};

TheLegendOfMeta.MainMenu.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'Black');

        var mainMenuBG = this.game.add.image(this.game.width/2,this.game.height*2/5,'mainMenuBG');
        mainMenuBG.scale.setTo(1.7);
        mainMenuBG.anchor.setTo(0.5);

        var start = this.game.add.button(this.game.width/6, this.game.height*4/5, "startBtn");
        var selectLevel = this.game.add.button(this.game.width*2/6, this.game.height*4/5, "selectLevelBtn");
        var setting = this.game.add.button(this.game.width*3/6, this.game.height*4/5, "settingBtn");
        var help = this.game.add.button(this.game.width*4/6, this.game.height*4/5, "helpBtn");
        var exit = this.game.add.button(this.game.width*5/6, this.game.height*4/5, "exitBtn");
        start.anchor.set(0.5);
        selectLevel.anchor.set(0.5);
        setting.anchor.set(0.5);
        help.anchor.set(0.5);
        exit.anchor.set(0.5);

        start.onInputDown.add(function(){this.state.start("Level1")},this);
        selectLevel.onInputDown.add(function(){this.state.start("SelectLevel")},this);
        setting.onInputDown.add(function(){this.state.start("Setting")},this);
        help.onInputDown.add(function(){this.state.start("Help")},this);
        exit.onInputDown.add(function(){this.game.destroy()},this);
    }
};