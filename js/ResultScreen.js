'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.ResultScreen = function(){};

TheLegendOfMeta.ResultScreen.prototype = {
    init: function(status,level){
        // 3 status "win", "lose", "final"
        this.status = status;
        this.level = level;
    },

    create: function(){
        let bg = '';
        let title = '';
        let msg = '';

        if(this.status === 'win'){
            bg = 'WinBG';
            title = "You Win! Let's try next level";
            msg = 'Tap To Go To Next Level';
        }
        else if(this.status === 'lose'){
            bg = 'LoseBG';
            title = "You Lose... Let's try again!";
            msg = 'Tap To Retry Current Level';
        }
        else{
            bg = 'FinalBG';
            title = "You've cleared the Final Level!";
            msg = 'Tap To Go Back To Main Menu';
        }

        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,bg);


        let style1 = {font: "60px Arial", fill: "#fff", align: "center" };
        let style2 = { font: "30px Arial", fill: "#fff", align: "center" };
        let header = this.game.add.text(this.game.width/2,this.game.height/5, title, style1);
        let tap = this.game.add.text(this.game.width/2,this.game.height*4/5, msg, style2);
        header.anchor.set(0.5);
        tap.anchor.set(0.5);
    },

    update: function() {
        if (this.game.input.activePointer.justPressed()) {
            if (this.status === 'win' && this.level !== 6) {
                this.state.start("Level" + (this.level + 1));
            } else if (this.status === 'lose') {
                this.state.start("Level" + this.level);
            } else {
                this.state.start("MainMenu");
            }
        }
    }
};