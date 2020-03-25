var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Preload() {
            Phaser.Scene.call(this, {key: 'Preload'});
        },
    preload: function () {
        this.load.image('background', '../static/background.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('tp', '../static/roll.png');
        this.load.image('flour', '../static/gold.png');
        this.load.image('corona', '../static/corona.png');
        this.load.image('tube', '../static/tube.png');
        this.load.image('brick', '../static/brick.png');
        this.load.image('brick2', '../static/brick2.png');
        this.load.image('brick3', '../static/brick3.png');
        this.load.spritesheet('dude', '../static/mario.png', {frameWidth: 45, frameHeight: 38});
    },

    create: function () {
        console.log("Preload");
        game.scene.start('');
    },
    update: function () {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);