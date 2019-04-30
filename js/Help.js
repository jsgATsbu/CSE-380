var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Help = function(){};

TheLegendOfMeta.Help.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'Black');
        
        var bgImage = this.game.add.image(this.game.width/2,this.game.height*2/5,'helpBG');
        bgImage.scale.setTo(1.7);
        bgImage.anchor.setTo(0.5);

        var style = {font: "25px chocomouse", fill: "#fff", align: "center", wordWrap: true, wordWrapWidth:1200};
        var text = "Since the day demon appeared and intruded into human territory, the war between human and demon has continued for 200 years already. The king, who is tired of this stalemate, is planning on something secret...\n" +
            "Meta, whose parents sacrificed in the war against demon army when he was little, joined the army to seek for revenge. However, the Goddess seems to have no mercy on Meta. He lost his beloved young sister in a battle against the demon troop where demons attacked Meta's village from behind. Witnessing the death of his sister and realizing his weakness, he fell into despair.\n"  +
            "After suffering from another painful loss, the king summoned some of the soldier to conduct human experimentation by injecting demon leftovers into them, hoping to strengthen their power. Meta, who is desperate for power, is willing to be one of them.\n" +
            "In the end, all died immediately except for one. The only survivor, Meta, finally receive his desired power and starts his journey of revenge...\n"+
            "\n" + "Produced by: Sungyeong Jang, Henry Crain, Shenggui Jin";
        var a = this.game.add.text(this.game.width/2,300,text,style);
        a.anchor.setTo(0.5,0.7);
        

        var returnBtn = this.game.add.button(this.game.width/2,this.game.height*5/6,'returnBtn');
        returnBtn.anchor.setTo(0.5);

        returnBtn.onInputDown.add(function () {
            this.state.start('MainMenu');
        },this);
    }
};